import assert from 'node:assert'
import { describe, it } from 'node:test'
import dotenv from 'dotenv'
import Paradym from '../src/client'
dotenv.config()

describe('Presentation Template', () => {
  it('should return all SdJwtVc presentation templates', async () => {
    const client = new Paradym({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const sdJwtPresentationTemplates = await client.templates.presentations.getAllPresentationTemplatesPaginated({
      projectId: 'clwt6e610000101s69ubga6lk',
    })

    assert.ok(Array.isArray(sdJwtPresentationTemplates.data))
    assert.ok(sdJwtPresentationTemplates)
  })

  it('should return a SdJwtVc presentation template', async () => {
    const client = new Paradym({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const sdJwtPresentationTemplate = await client.templates.presentations.getPresentationTemplate({
      projectId: 'clwt6e610000101s69ubga6lk',
      presentationTemplateId: 'clwyt7ed60022yylmit88dkom',
    })

    assert.ok(sdJwtPresentationTemplate)
  })

  it('should create a SdJwtVc presentation template', async () => {
    const client = new Paradym({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const sdJwtPresentationTemplate = await client.templates.presentations.createPresentationTemplate({
      projectId: 'clwt6e610000101s69ubga6lk',
      requestBody: {
        credentials: [
          {
            description: 'This is a description',
            name: 'My SD-JWT VC credential',
            format: 'sd-jwt-vc',
            type: 'https://metadata.paradym.id/types/28dc88-UniversityCard',
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
    const client = new Paradym({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const sdJwtPresentationTemplate = await client.templates.presentations.createPresentationTemplate({
      projectId: 'clwt6e610000101s69ubga6lk',
      requestBody: {
        credentials: [
          {
            description: 'This is a description',
            name: 'My SD-JWT VC credential',
            format: 'sd-jwt-vc',
            type: 'https://metadata.paradym.id/types/28dc88-UniversityCard',
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
      projectId: 'clwt6e610000101s69ubga6lk',
      presentationTemplateId: sdJwtPresentationTemplate.id,
    })

    const actualFn = async () =>
      client.templates.presentations.getPresentationTemplate({
        projectId: 'clwt6e610000101s69ubga6lk',
        presentationTemplateId: sdJwtPresentationTemplate.id,
      })

    const expected = {
      name: 'ApiError',
      url: `https://api.paradym.id/v1/projects/clwt6e610000101s69ubga6lk/templates/presentations/${sdJwtPresentationTemplate.id}`,
      status: 404,
      statusText: 'Not Found',
    }

    assert.rejects(actualFn, expected)
  })

  it('should update a SdJwtVc presentation template', async () => {
    const client = new Paradym({ apiKey: process.env.X_ACCESS_TOKEN as string })
    const sdJwtPresentationTemplate = await client.templates.presentations.updatePresentationTemplate({
      projectId: 'clwt6e610000101s69ubga6lk',
      presentationTemplateId: 'clwyt7ed60022yylmit88dkom',
      requestBody: {
        credentials: [
          {
            description: 'This is a description',
            name: 'My SD-JWT VC credential',
            format: 'sd-jwt-vc',
            type: 'https://metadata.paradym.id/types/28dc88-UniversityCard',
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
