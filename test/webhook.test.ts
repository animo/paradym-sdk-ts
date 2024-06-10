import assert from 'node:assert'
import { describe, it } from 'node:test'
import dotenv from 'dotenv'
import Paradym from '../src/client'
dotenv.config()

describe('Webhooks', () => {
  it('should return all webhooks', async () => {
    const client = new Paradym({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const webhooks = await client.webhooks.getWebhooks({
      projectId: 'clwt6e610000101s69ubga6lk',
    })

    assert.ok(Array.isArray(webhooks.data))
    assert.ok(webhooks)
  })

  it('should create and delete a webhook', async () => {
    const client = new Paradym({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const createdWebhook = await client.webhooks.createWebhook({
      projectId: 'clwt6e610000101s69ubga6lk',
      requestBody: {
        name: 'Test Webhook',
        url: 'https://example.com/webhook',
      },
    })

    assert.ok(createdWebhook)

    await client.webhooks.deleteWebhook({
      projectId: 'clwt6e610000101s69ubga6lk',
      webhookId: createdWebhook.id as string,
    })

    const { data } = await client.webhooks.getWebhooks({
      projectId: 'clwt6e610000101s69ubga6lk',
    })

    assert.strictEqual(data.filter((webhook) => webhook.id === createdWebhook.id).length, 0)
  })
})
