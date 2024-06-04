import assert from 'node:assert'
import { describe, it } from 'node:test'
import dotenv from 'dotenv'
import { Client } from '../src/client'
dotenv.config()

describe('Credential Template', () => {
  it('should return all SdJwtVc credential templates', async () => {
    const client = new Client({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const sdJwtCredentialTemplates = await client.templates.credentials.getAllSdJwtVcTemplates({
      projectId: 'clwt6e610000101s69ubga6lk',
    })

    assert.ok(Array.isArray(sdJwtCredentialTemplates.data))
    assert.ok(sdJwtCredentialTemplates)
  })

  it('should return a SdJwtVc credential template', async () => {
    const client = new Client({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const sdJwtCredentialTemplate = await client.templates.credentials.getSdJwtVcTemplate({
      projectId: 'clwt6e610000101s69ubga6lk',
      credentialTemplateId: 'clwyt70o50021yylmethefm27',
    })

    assert.ok(sdJwtCredentialTemplate)
  })
})
