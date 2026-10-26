import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { WALLET_ID, X_ACCESS_TOKEN } from './constants'

describe('Wallet Profile', () => {
  it('should return wallet profile', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const walletProfile = await client.walletProfile.getProfile({
      path: { walletId: WALLET_ID },
    })

    assert.ok(walletProfile)
  })

  it('should update wallet profile', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const updatedWalletProfile = await client.walletProfile.updateProfile({
      path: { walletId: WALLET_ID },
      body: {
        displayName: 'Animo',
        logo: {
          altText: 'Logo of Animo Solutions',
          url: 'https://github.com/animo.png',
        },
      },
    })

    assert.ok(updatedWalletProfile)
  })
})
