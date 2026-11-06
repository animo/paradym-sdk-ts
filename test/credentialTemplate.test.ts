import assert from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { BASE_URL, WALLET_ID, X_ACCESS_TOKEN } from './constants'
import { archiveSdJwtCredentialTemplate, createSdJwtCredentialTemplate } from './fixtures'

describe('Credential Template', () => {
  it('should return all SdJwtVc credential templates', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const sdJwtCredentialTemplates = await client.templates.credentials.sdJwtVc.getAll({
      path: {
        walletId: WALLET_ID,
      },
    })

    assert.ok(Array.isArray(sdJwtCredentialTemplates.data.data))
    assert.ok(sdJwtCredentialTemplates)
  })

  it('should return a SdJwtVc credential template', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const createdCredentialTemplate = await createSdJwtCredentialTemplate(client)

    try {
      const sdJwtCredentialTemplate = await client.templates.credentials.sdJwtVc.get({
        path: {
          walletId: WALLET_ID,
          credentialTemplateId: createdCredentialTemplate.id,
        },
      })

      assert.strictEqual(sdJwtCredentialTemplate.data.id, createdCredentialTemplate.id)
    } finally {
      await archiveSdJwtCredentialTemplate(client, createdCredentialTemplate.id)
    }
  })
})
