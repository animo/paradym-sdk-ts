import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { X_ACCESS_TOKEN } from './constants'

describe('Projects', () => {
  it('should return atleast one project', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const projects = await client.projects.getAllProjects({
      query: {
        sort: '-createdAt',
      },
    })

    assert.ok(projects.data.data.length > 0)
  })
})
