import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import dotenv from 'dotenv'
import Paradym from '../src/client'
dotenv.config()

describe('Issuance Session', () => {
  it('should return all issuance sessions', async () => {
    const client = new Paradym({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const issuanceSessions = await client.openId4Vc.issuance.getAllOpenId4VcIssuanceSessions({
      projectId: 'clwt6e610000101s69ubga6lk',
    })

    client.templates.credentials.createSdJwtVcTemplate({
      projectId: 'clwt6e610000101s69ubga6lk',
      requestBody: { 
        name: "My SD-JWT VC template", 
        description: "This is a description", 
        issuer: "did:web", 
        background: { 
          color: "#FFFFFF", 
          url: "https://example.com/image.png" 
        }, 
        text: { 
          color: "#000000" 
        }, 
        validFrom: "2024-04-11", 
        validUntil: { 
          start: "validFrom", 
          future: { years: 5 } 
        }, 
        type: "UniversityCard", 
        revocable: false, 
        attributes: { 
          myAttribute: { 
            type: "string", 
            name: "My attribute", 
            description: "This is a attribute", 
            required: true, 
            alwaysDisclosed: false 
          } 
        } 
      }
    })
    assert.ok(issuanceSessions)
    assert.ok(Array.isArray(issuanceSessions.data))
  })
})
