import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { PROJECT_ID, X_ACCESS_TOKEN } from './constants'

describe('Issuance Session', () => {
  it('should return all issuance sessions', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const issuanceSessions = await client.openId4Vc.issuance.getAllIssuanceSessions({
      path: {
        projectId: PROJECT_ID,
      },
    })

    assert.ok(issuanceSessions)
    assert.ok(Array.isArray(issuanceSessions.data.data))
  })
})
