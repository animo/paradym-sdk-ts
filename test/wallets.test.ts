import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { BASE_URL, X_ACCESS_TOKEN } from './constants'

describe('Wallets', () => {
  it('should return at least one wallet', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const wallets = await client.wallets.getAllWallets({
      query: {
        sort: '-createdAt',
      },
    })

    assert.ok(wallets.data.data.length > 0)
  })
})
