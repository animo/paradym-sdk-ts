import assert from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { PROJECT_ID, SD_JWT_CREDENTIAL_TEMPLATE_ID, X_ACCESS_TOKEN } from './constants'

describe('Credential Template', () => {
  it('should return all SdJwtVc credential templates', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const sdJwtCredentialTemplates = await client.templates.credentials.sdJwtVc.getAllCredentialTemplates({
      path: {
        projectId: PROJECT_ID,
      },
    })

    assert.ok(Array.isArray(sdJwtCredentialTemplates.data.data))
    assert.ok(sdJwtCredentialTemplates)
  })

  it('should return a SdJwtVc credential template', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const sdJwtCredentialTemplate = await client.templates.credentials.sdJwtVc.getCredentialTemplate({
      path: {
        projectId: PROJECT_ID,
        credentialTemplateId: SD_JWT_CREDENTIAL_TEMPLATE_ID,
      },
    })

    assert.ok(sdJwtCredentialTemplate)
  })
})
