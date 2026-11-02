import { strict as assert } from 'node:assert'
import { afterEach, beforeEach, describe, it } from 'node:test'
import Paradym from '../src/client'
import ProjectsParadym from '../src/projects/client'

describe('Client', () => {
  const originalFetch = globalThis.fetch
  let requests: Request[] = []

  beforeEach(() => {
    requests = []
    globalThis.fetch = async (request) => {
      requests.push(request as Request)
      return Response.json({ data: [] })
    }
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('should use the api key and base url of each instance', async () => {
    const first = new Paradym({ apiKey: 'first-key', baseUrl: 'https://first.example' })
    const second = new Paradym({ apiKey: 'second-key', baseUrl: 'https://second.example' })

    await first.wallets.getAll()
    await second.wallets.getAll()
    await first.webhooks.subscriptions.getAll({ path: { walletId: 'wallet' } })

    assert.deepEqual(
      requests.map((request) => [new URL(request.url).origin, request.headers.get('x-access-token')]),
      [
        ['https://first.example', 'first-key'],
        ['https://second.example', 'second-key'],
        ['https://first.example', 'first-key'],
      ]
    )
  })

  it('should use the api key and base url of each deprecated projects instance', async () => {
    const first = new ProjectsParadym({ apiKey: 'first-key', baseUrl: 'https://first.example' })
    const second = new ProjectsParadym({ apiKey: 'second-key', baseUrl: 'https://second.example' })

    await first.projects.getAllProjects()
    await second.projects.getAllProjects()

    assert.deepEqual(
      requests.map((request) => [new URL(request.url).origin, request.headers.get('x-access-token')]),
      [
        ['https://first.example', 'first-key'],
        ['https://second.example', 'second-key'],
      ]
    )
  })
})
