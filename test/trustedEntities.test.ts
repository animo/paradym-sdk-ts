import { strict as assert } from 'node:assert'
import { randomUUID } from 'node:crypto'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { BASE_URL, WALLET_ID, X_ACCESS_TOKEN } from './constants'

describe('Trusted Entities', () => {
  it('can create and resolve trusted entity', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })

    const trustedEntity = await client.trustedEntities.create({
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

    const getTrustedEntity = await client.trustedEntities.get({
      path: {
        walletId: WALLET_ID,
        trustedEntityId: trustedEntity.data.id,
      },
    })

    assert.deepEqual(trustedEntity.data, getTrustedEntity.data)

    await client.trustedEntities.delete({
      path: {
        walletId: WALLET_ID,
        trustedEntityId: trustedEntity.data.id,
      },
    })
  })

  it('can get a common trusted entity', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })

    const commonTrustedEntities = await client.trustedEntities.getAllCommon({
      path: {
        walletId: WALLET_ID,
      },
    })

    // Common trusted entities are maintained by Paradym, so every wallet has them
    assert.ok(commonTrustedEntities.data.data.length > 0)
    const [commonTrustedEntity] = commonTrustedEntities.data.data

    const getCommonTrustedEntity = await client.trustedEntities.getCommon({
      path: {
        walletId: WALLET_ID,
        commonTrustedEntityId: commonTrustedEntity.id,
      },
    })

    assert.deepEqual(getCommonTrustedEntity.data, commonTrustedEntity)
  })
})
