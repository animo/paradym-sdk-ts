import assert from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { BASE_URL, WALLET_ID, X_ACCESS_TOKEN } from './constants'

describe('Webhooks', () => {
  it('should return all webhooks', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const webhooks = await client.webhooks.subscriptions.getAll({
      path: {
        walletId: WALLET_ID,
      },
    })

    assert.ok(Array.isArray(webhooks.data.data))
    assert.ok(webhooks)
  })

  it('should create and delete a webhook', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const createdWebhook = await client.webhooks.subscriptions.create({
      path: {
        walletId: WALLET_ID,
      },
      body: {
        name: 'Test Webhook',
        url: 'https://example.com/webhook',
      },
    })

    assert.ok(createdWebhook)

    await client.webhooks.subscriptions.delete({
      path: {
        walletId: WALLET_ID,
        webhookSubscriptionId: createdWebhook.data.id,
      },
    })

    const { data } = await client.webhooks.subscriptions.getAll({
      path: {
        walletId: WALLET_ID,
      },
    })

    assert.strictEqual(data.data.filter((webhook) => webhook.id === createdWebhook.data.id).length, 0)
  })

  it('should return no deliveries for a new webhook', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const webhook = await client.webhooks.subscriptions.create({
      path: {
        walletId: WALLET_ID,
      },
      body: {
        name: 'Test Webhook',
        url: 'https://example.com/webhook',
      },
    })

    try {
      const deliveries = await client.webhooks.deliveries.getAll({
        path: {
          walletId: WALLET_ID,
        },
        query: {
          'filter[webhookSubscriptionId]': webhook.data.id,
        },
      })

      assert.deepStrictEqual(deliveries.data.data, [])

      const summary = await client.webhooks.deliveries.getSummary({
        path: {
          walletId: WALLET_ID,
        },
        query: {
          'filter[webhookSubscriptionId]': webhook.data.id,
        },
      })

      assert.strictEqual(summary.data.pending, 0)
      assert.strictEqual(summary.data.delivered, 0)
      assert.strictEqual(summary.data.failed, 0)

      const redeliverResult = await client.webhooks.deliveries.redeliverAll({
        path: {
          walletId: WALLET_ID,
        },
        body: {
          webhookSubscriptionId: webhook.data.id,
        },
      })

      assert.strictEqual(redeliverResult.data.scheduledCount, 0)
    } finally {
      await client.webhooks.subscriptions.delete({
        path: {
          walletId: WALLET_ID,
          webhookSubscriptionId: webhook.data.id,
        },
      })
    }
  })
})
