import assert from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { PROJECT_ID, X_ACCESS_TOKEN } from './constants'

describe('Webhooks', () => {
  it('should return all webhooks', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const webhooks = await client.webhooks.getWebhooks({
      path: {
        projectId: PROJECT_ID,
      },
    })

    assert.ok(Array.isArray(webhooks.data.data))
    assert.ok(webhooks)
  })

  it('should create and delete a webhook', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const createdWebhook = await client.webhooks.createWebhook({
      path: {
        projectId: PROJECT_ID,
      },
      body: {
        name: 'Test Webhook',
        url: 'https://example.com/webhook',
      },
    })

    assert.ok(createdWebhook)

    await client.webhooks.deleteWebhook({
      path: {
        projectId: PROJECT_ID,
        webhookId: createdWebhook.data.id,
      },
    })

    const { data } = await client.webhooks.getWebhooks({
      path: {
        projectId: PROJECT_ID,
      },
    })

    assert.strictEqual(data.data.filter((webhook) => webhook.id === createdWebhook.data.id).length, 0)
  })
})
