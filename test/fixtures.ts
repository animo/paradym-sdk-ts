import { randomUUID } from 'node:crypto'
import type Paradym from '../src/client'
import { WALLET_ID } from './constants'

// Tests create the templates they use, so they run against any wallet. Archive them afterwards.

export async function createSdJwtCredentialTemplate(client: Paradym) {
  const { data } = await client.templates.credentials.sdJwtVc.createCredentialTemplate({
    path: {
      walletId: WALLET_ID,
    },
    body: {
      name: `Test ${randomUUID()}`,
      type: 'UniversityCard',
      attributes: {
        myAttribute1: {
          type: 'string',
        },
      },
    },
  })

  return data
}

export async function archiveSdJwtCredentialTemplate(client: Paradym, credentialTemplateId: string) {
  await client.templates.credentials.sdJwtVc.archiveTemplate({
    path: {
      walletId: WALLET_ID,
      credentialTemplateId,
    },
  })
}

export async function createPresentationTemplate(client: Paradym) {
  const { data } = await client.templates.presentations.createPresentationTemplate({
    path: {
      walletId: WALLET_ID,
    },
    body: {
      name: `Test ${randomUUID()}`,
      credentials: [
        {
          name: 'My SD-JWT VC credential',
          format: 'sd-jwt-vc',
          type: 'https://metadata.paradym.id/types/28dc88-UniversityCard',
          trustedIssuers: [],
          attributes: {
            myAttribute1: {
              type: 'string',
            },
          },
        },
      ],
    },
  })

  return data
}

export async function archivePresentationTemplate(client: Paradym, presentationTemplateId: string) {
  await client.templates.presentations.archivePresentationTemplate({
    path: {
      walletId: WALLET_ID,
      presentationTemplateId,
    },
  })
}
