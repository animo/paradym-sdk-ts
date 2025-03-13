import assert from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { PRESENTATION_TEMPLATE_ID, PROJECT_ID, X_ACCESS_TOKEN } from './constants'

describe('Presentation Template', () => {
  it('should return all SdJwtVc presentation templates', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const sdJwtPresentationTemplates = await client.templates.presentations.getAllPresentationTemplates({
      path: {
        projectId: PROJECT_ID,
      },
    })

    assert.ok(Array.isArray(sdJwtPresentationTemplates.data.data))
    assert.ok(sdJwtPresentationTemplates)
  })

  it('should return a SdJwtVc presentation template', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const sdJwtPresentationTemplate = await client.templates.presentations.getPresentationTemplate({
      path: {
        projectId: PROJECT_ID,
        presentationTemplateId: PRESENTATION_TEMPLATE_ID,
      },
    })

    assert.ok(sdJwtPresentationTemplate)
  })

  it('should create a SdJwtVc presentation template', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const sdJwtPresentationTemplate = await client.templates.presentations.createPresentationTemplate({
      path: {
        projectId: PROJECT_ID,
      },
      body: {
        credentials: [
          {
            description: 'This is a description',
            name: 'My SD-JWT VC credential',
            format: 'sd-jwt-vc',
            type: 'https://metadata.paradym.id/types/28dc88-UniversityCard',
            trustedIssuers: [],
            attributes: {
              myAttribute1: {
                type: 'string',
                value: 'myValue',
              },
              myAttribute2: {
                type: 'number',
                minimum: 1,
                maximum: 10,
              },
              myAttribute3: {
                type: 'boolean',
                value: true,
              },
            },
          },
        ],
        description: 'This is a description',
        name: 'My SD-JWT VC presentation',
      },
    })

    assert.ok(sdJwtPresentationTemplate)
  })

  it('should archive a SdJwtVc presentation template', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const sdJwtPresentationTemplate = await client.templates.presentations.createPresentationTemplate({
      path: {
        projectId: PROJECT_ID,
      },
      body: {
        credentials: [
          {
            description: 'This is a description',
            name: 'My SD-JWT VC credential',
            format: 'sd-jwt-vc',
            type: 'https://metadata.paradym.id/types/28dc88-UniversityCard',
            trustedIssuers: [],
            attributes: {
              myAttribute1: {
                type: 'string',
                value: 'myValue',
              },
              myAttribute2: {
                type: 'number',
                minimum: 1,
                maximum: 10,
              },
              myAttribute3: {
                type: 'boolean',
                value: true,
              },
            },
          },
        ],
        description: 'This is a description',
        name: 'My SD-JWT VC presentation',
      },
    })

    assert.ok(sdJwtPresentationTemplate)

    await client.templates.presentations.archivePresentationTemplate({
      path: {
        projectId: PROJECT_ID,
        presentationTemplateId: sdJwtPresentationTemplate.data.id,
      },
    })

    const actualFn = async () =>
      client.templates.presentations.getPresentationTemplate({
        path: {
          projectId: PROJECT_ID,
          presentationTemplateId: sdJwtPresentationTemplate.data.id,
        },
      })

    const expected = {
      message: `PresentationTemplate with ID ${sdJwtPresentationTemplate.data.id} not found.`,
      details: [
        {
          message: `PresentationTemplate with ID ${sdJwtPresentationTemplate.data.id} not found.`,
          recordType: 'PresentationTemplate',
          recordId: sdJwtPresentationTemplate.data.id,
        },
      ],
      code: 2005,
    }

    await assert.rejects(actualFn, expected)
  })

  it('should update a SdJwtVc presentation template', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })
    const sdJwtPresentationTemplate = await client.templates.presentations.updatePresentationTemplate({
      path: {
        projectId: PROJECT_ID,
        presentationTemplateId: PRESENTATION_TEMPLATE_ID,
      },
      body: {
        credentials: [
          {
            description: 'This is a description',
            name: 'My SD-JWT VC credential',
            format: 'sd-jwt-vc',
            type: 'https://metadata.paradym.id/types/28dc88-UniversityCard',
            trustedIssuers: [],
            attributes: {
              myAttribute1: {
                type: 'string',
                value: 'myValue',
              },
              myAttribute2: {
                type: 'number',
                minimum: 1,
                maximum: 10,
              },
              myAttribute3: {
                type: 'boolean',
                value: true,
              },
            },
          },
        ],
        description: 'Description updated by the test',
        name: 'Name updated by the test',
      },
    })

    assert.ok(sdJwtPresentationTemplate)
  })
})
