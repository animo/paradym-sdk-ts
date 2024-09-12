import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import dotenv from 'dotenv'
import Paradym from '../src/client'
dotenv.config()

describe('Projects', () => {
  it('should return atleast one project', async () => {
    const client = new Paradym({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const projects = await client.projects.getAllProjects({ 
      sort: '-createdAt'
    })

    assert.ok(projects.data.length > 0)
  })
})
