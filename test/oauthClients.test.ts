import { strict as assert } from 'node:assert'
import { randomUUID } from 'node:crypto'
import { after, before, describe, it } from 'node:test'
import type { CreateOAuthClient, OAuthClientWithSecret } from '../index'
import Paradym from '../src/client'
import { BASE_URL, WALLET_ID, X_ACCESS_TOKEN } from './constants'
import { archivePresentationTemplate, createPresentationTemplate } from './fixtures'

let presentationTemplateId: string

before(async () => {
  const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
  presentationTemplateId = (await createPresentationTemplate(client)).id
})

after(async () => {
  const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
  await archivePresentationTemplate(client, presentationTemplateId)
})

// A wallet can have up to 5 OAuth clients, so every test deletes the client it creates
async function withOAuthClient(
  client: Paradym,
  body: Partial<CreateOAuthClient>,
  run: (oauthClient: OAuthClientWithSecret) => Promise<void>
) {
  const { data: oauthClient } = await client.oauthClients.create({
    path: {
      walletId: WALLET_ID,
    },
    body: {
      name: `Test ${randomUUID()}`,
      redirectUris: ['https://example.com/callback'],
      ...body,
    },
  })

  try {
    await run(oauthClient)
  } finally {
    await client.oauthClients.delete({
      path: {
        walletId: WALLET_ID,
        oauthClientId: oauthClient.id,
      },
    })
  }
}

describe('OAuth Clients', () => {
  it('can create and get an OAuth client', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })

    await withOAuthClient(client, {}, async (oauthClient) => {
      assert.ok(oauthClient.clientSecret)
      assert.strictEqual(oauthClient.secrets.length, 1)
      assert.strictEqual(oauthClient.clientSecret.slice(-4), oauthClient.secrets[0].lastFour)

      const getOAuthClient = await client.oauthClients.get({
        path: {
          walletId: WALLET_ID,
          oauthClientId: oauthClient.id,
        },
      })

      const { clientSecret, ...oauthClientWithoutSecret } = oauthClient
      assert.deepEqual(getOAuthClient.data, oauthClientWithoutSecret)
    })
  })

  it('can find an OAuth client by client id', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })

    await withOAuthClient(client, {}, async (oauthClient) => {
      const oauthClients = await client.oauthClients.getAll({
        path: {
          walletId: WALLET_ID,
        },
        query: {
          'filter[clientId]': oauthClient.clientId,
        },
      })

      assert.deepEqual(
        oauthClients.data.data.map((c) => c.id),
        [oauthClient.id]
      )
    })
  })

  it('can update an OAuth client', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })

    await withOAuthClient(client, { profile: 'secure' }, async (oauthClient) => {
      const name = `Updated ${randomUUID()}`
      const updatedOAuthClient = await client.oauthClients.update({
        path: {
          walletId: WALLET_ID,
          oauthClientId: oauthClient.id,
        },
        body: {
          name,
          profile: 'basic',
          redirectUris: ['https://example.com/callback', 'https://example.com/other-callback'],
        },
      })

      assert.strictEqual(updatedOAuthClient.data.name, name)
      assert.strictEqual(updatedOAuthClient.data.profile, 'basic')
      assert.deepEqual(updatedOAuthClient.data.redirectUris, [
        'https://example.com/callback',
        'https://example.com/other-callback',
      ])
      assert.strictEqual(updatedOAuthClient.data.clientId, oauthClient.clientId)
    })
  })

  it('can create an OAuth client with role assignments', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const oauthScope = `test-${randomUUID()}`

    await withOAuthClient(
      client,
      {
        roleAssignments: [
          {
            role: 'oauthVerifier',
            resource: { type: 'presentationTemplate', id: presentationTemplateId },
            oauthScope,
          },
        ],
      },
      async (oauthClient) => {
        const roleAssignments = await client.oauthClientRoleAssignments.getAll({
          path: {
            walletId: WALLET_ID,
            oauthClientId: oauthClient.id,
          },
        })

        assert.strictEqual(roleAssignments.data.data.length, 1)
        assert.strictEqual(roleAssignments.data.data[0].oauthScope, oauthScope)
      }
    )
  })

  it('can delete an OAuth client', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const oauthClient = await client.oauthClients.create({
      path: {
        walletId: WALLET_ID,
      },
      body: {
        name: `Test ${randomUUID()}`,
        redirectUris: ['https://example.com/callback'],
      },
    })

    await client.oauthClients.delete({
      path: {
        walletId: WALLET_ID,
        oauthClientId: oauthClient.data.id,
      },
    })

    const { data } = await client.oauthClients.getAll({
      path: {
        walletId: WALLET_ID,
      },
      query: {
        'filter[id]': oauthClient.data.id,
      },
    })

    assert.strictEqual(data.data.length, 0)
  })
})

describe('OAuth Client Secrets', () => {
  it('can rotate the secret of an OAuth client', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })

    await withOAuthClient(client, {}, async (oauthClient) => {
      const [oldSecret] = oauthClient.secrets

      const newSecret = await client.oauthClientSecrets.create({
        path: {
          walletId: WALLET_ID,
          oauthClientId: oauthClient.id,
        },
        body: {},
      })

      assert.ok(newSecret.data.clientSecret)
      assert.notStrictEqual(newSecret.data.clientSecret, oauthClient.clientSecret)
      assert.strictEqual(newSecret.data.clientSecret.slice(-4), newSecret.data.lastFour)
      assert.strictEqual(newSecret.data.expiresAt, undefined)

      const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString()
      const expiringSecret = await client.oauthClientSecrets.update({
        path: {
          walletId: WALLET_ID,
          oauthClientId: oauthClient.id,
          secretId: oldSecret.id,
        },
        body: {
          expiresAt,
        },
      })

      assert.strictEqual(new Date(expiringSecret.data.expiresAt ?? 0).getTime(), new Date(expiresAt).getTime())

      const nonExpiringSecret = await client.oauthClientSecrets.update({
        path: {
          walletId: WALLET_ID,
          oauthClientId: oauthClient.id,
          secretId: oldSecret.id,
        },
        body: {
          expiresAt: null,
        },
      })

      assert.strictEqual(nonExpiringSecret.data.expiresAt, undefined)

      await client.oauthClientSecrets.delete({
        path: {
          walletId: WALLET_ID,
          oauthClientId: oauthClient.id,
          secretId: oldSecret.id,
        },
      })

      const getOAuthClient = await client.oauthClients.get({
        path: {
          walletId: WALLET_ID,
          oauthClientId: oauthClient.id,
        },
      })

      assert.deepEqual(
        getOAuthClient.data.secrets.map((secret) => secret.id),
        [newSecret.data.id]
      )
    })
  })
})

describe('OAuth Client Role Assignments', () => {
  it('can create, update and delete a role assignment', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })

    const otherPresentationTemplate = await createPresentationTemplate(client)

    try {
      await withOAuthClient(client, {}, async (oauthClient) => {
        const oauthScope = `test-${randomUUID()}`
        const roleAssignment = await client.oauthClientRoleAssignments.create({
          path: {
            walletId: WALLET_ID,
            oauthClientId: oauthClient.id,
          },
          body: {
            role: 'oauthVerifier',
            resource: { type: 'presentationTemplate', id: presentationTemplateId },
            oauthScope,
          },
        })

        assert.strictEqual(roleAssignment.data.role, 'oauthVerifier')
        assert.strictEqual(roleAssignment.data.oauthScope, oauthScope)
        assert.deepEqual(roleAssignment.data.resource, { type: 'presentationTemplate', id: presentationTemplateId })

        const updatedRoleAssignment = await client.oauthClientRoleAssignments.update({
          path: {
            walletId: WALLET_ID,
            oauthClientId: oauthClient.id,
            roleAssignmentId: roleAssignment.data.id,
          },
          body: {
            resource: { type: 'presentationTemplate', id: otherPresentationTemplate.id },
          },
        })

        assert.strictEqual(updatedRoleAssignment.data.oauthScope, oauthScope)
        assert.deepEqual(updatedRoleAssignment.data.resource, {
          type: 'presentationTemplate',
          id: otherPresentationTemplate.id,
        })

        const roleAssignments = await client.oauthClientRoleAssignments.getAll({
          path: {
            walletId: WALLET_ID,
            oauthClientId: oauthClient.id,
          },
        })

        assert.deepEqual(roleAssignments.data.data, [updatedRoleAssignment.data])

        await client.oauthClientRoleAssignments.delete({
          path: {
            walletId: WALLET_ID,
            oauthClientId: oauthClient.id,
            roleAssignmentId: roleAssignment.data.id,
          },
        })

        const { data } = await client.oauthClientRoleAssignments.getAll({
          path: {
            walletId: WALLET_ID,
            oauthClientId: oauthClient.id,
          },
        })

        assert.strictEqual(data.data.length, 0)
      })
    } finally {
      await archivePresentationTemplate(client, otherPresentationTemplate.id)
    }
  })
})
