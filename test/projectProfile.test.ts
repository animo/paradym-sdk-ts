import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import dotenv from 'dotenv'
import Paradym from '../src/client'
dotenv.config()

describe('Project Profile', () => {
  it('should return project profile', async () => {
    const client = new Paradym({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const projectProfile = await client.projectProfile.getProfile({
      projectId: 'clwt6e610000101s69ubga6lk',
    })

    assert.ok(projectProfile)
  })

  it('should update project profile', async () => {
    const client = new Paradym({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const updatedProjectProfile = await client.projectProfile.updateProfile({
      projectId: 'clwt6e610000101s69ubga6lk',
      requestBody: {
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
