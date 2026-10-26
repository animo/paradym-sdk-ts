import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/projects/client'
import { WALLET_ID, X_ACCESS_TOKEN } from './constants'

describe('Projects (deprecated)', () => {
  it('should return at least one project', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const projects = await client.projects.getAllProjects({
      query: {
        sort: '-createdAt',
      },
    })

    assert.ok(projects.data.data.length > 0)
  })

  it('should return project profile', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const projectProfile = await client.projectProfile.getProfile({
      path: { projectId: WALLET_ID },
    })

    assert.ok(projectProfile)
  })

  it('should return all issuance sessions', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const issuanceSessions = await client.openId4Vc.issuance.getAllIssuanceSessions({
      path: {
        projectId: WALLET_ID,
      },
    })

    assert.ok(Array.isArray(issuanceSessions.data.data))
  })
})
