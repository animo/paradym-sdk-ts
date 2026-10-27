import { strict as assert } from 'node:assert'
import { randomUUID } from 'node:crypto'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { WALLET_ID, X_ACCESS_TOKEN } from './constants'

describe('Trusted Entities', () => {
  it('can create and resolve trusted entity', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })

    const trustedEntity = await client.trustedEntities.createTrustedEntity({
      path: {
        walletId: WALLET_ID,
      },
      body: {
        name: `Test ${randomUUID()}`,
        dids: [
          {
            did: 'did:web:exapmle.com',
          },
        ],
      },
    })

    assert.ok(trustedEntity)

    const getTrustedEntity = await client.trustedEntities.getTrustedEntity({
      path: {
        walletId: WALLET_ID,
        trustedEntityId: trustedEntity.data.id,
      },
    })

    assert.deepEqual(trustedEntity.data, getTrustedEntity.data)

    await client.trustedEntities.deleteTrustedEntity({
      path: {
        walletId: WALLET_ID,
        trustedEntityId: trustedEntity.data.id,
      },
    })
  })
})
