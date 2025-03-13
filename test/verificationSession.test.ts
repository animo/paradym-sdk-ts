import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { PROJECT_ID, X_ACCESS_TOKEN } from './constants'

describe('Verification Session', () => {
  it('should return all issuance sessions', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const verificationSessions = await client.openId4Vc.verification.getAllVerificationSessions({
      path: {
        projectId: PROJECT_ID,
      },
    })

    assert.ok(verificationSessions)
    assert.ok(Array.isArray(verificationSessions.data.data))
  })
})
