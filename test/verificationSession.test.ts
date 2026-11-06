import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { BASE_URL, WALLET_ID, X_ACCESS_TOKEN } from './constants'
import { archivePresentationTemplate, createPresentationTemplate } from './fixtures'

describe('Verification Session', () => {
  it('should return all issuance sessions', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const verificationSessions = await client.openId4Vc.verification.getAll({
      path: {
        walletId: WALLET_ID,
      },
    })

    assert.ok(verificationSessions)
    assert.ok(Array.isArray(verificationSessions.data.data))
  })

  it('should not complete a verification session that was not created for the redirect flow', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const presentationTemplate = await createPresentationTemplate(client)

    try {
      const verificationSession = await client.openId4Vc.verification.createRequest({
        path: {
          walletId: WALLET_ID,
        },
        body: {
          presentationTemplateId: presentationTemplate.id,
        },
      })

      await assert.rejects(
        client.openId4Vc.verification.complete({
          path: {
            walletId: WALLET_ID,
            openId4VcVerificationId: verificationSession.data.id,
          },
          body: {
            challenge: 'challenge',
            responseCode: 'response-code',
          },
        }),
        (error: { code?: unknown; message?: unknown }) =>
          typeof error.code === 'number' && typeof error.message === 'string'
      )
    } finally {
      await archivePresentationTemplate(client, presentationTemplate.id)
    }
  })
})
