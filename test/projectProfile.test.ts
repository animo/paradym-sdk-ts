import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { PROJECT_ID, X_ACCESS_TOKEN } from './constants'

describe('Project Profile', () => {
  it('should return project profile', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const projectProfile = await client.projectProfile.getProfile({
      path: { projectId: PROJECT_ID },
    })

    assert.ok(projectProfile)
  })

  it('should update project profile', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const updatedProjectProfile = await client.projectProfile.updateProfile({
      path: { projectId: PROJECT_ID },
      body: {
        displayName: 'Animo',
        logo: {
          altText: 'Logo of Animo Solutions',
          url: 'https://example.com/logo.png',
        },
      },
    })

    assert.ok(updatedProjectProfile)
  })
})
