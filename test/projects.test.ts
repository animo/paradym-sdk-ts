import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/projects/client'
import { BASE_URL, WALLET_ID, X_ACCESS_TOKEN } from './constants'

describe('Projects (deprecated)', () => {
  it('should return at least one project', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const projects = await client.projects.getAllProjects({
      query: {
        sort: '-createdAt',
      },
    })

    assert.ok(projects.data.data.length > 0)
  })

  it('should return project profile', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const projectProfile = await client.projectProfile.getProfile({
      path: { projectId: WALLET_ID },
    })

    assert.ok(projectProfile)
  })

  it('should return all issuance sessions', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN, baseUrl: BASE_URL })
    const issuanceSessions = await client.openId4Vc.issuance.getAllIssuanceSessions({
      path: {
        projectId: WALLET_ID,
      },
    })

    assert.ok(Array.isArray(issuanceSessions.data.data))
  })
})
