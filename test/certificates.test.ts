import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import Paradym from '../src/client'
import { PROJECT_ID, X_ACCESS_TOKEN } from './constants'

describe('Certificates', () => {
  it('can create and resolve certificate', async () => {
    const client = new Paradym({ apiKey: X_ACCESS_TOKEN })

    const existingCertificates = await client.certificates.getAllCertificates({
      path: {
        projectId: PROJECT_ID,
      },
      query: {
        'filter[keyType]': 'P-256',
        'filter[status]': 'active',
        'filter[type]': 'verifierRoot',
      },
    })

    if (existingCertificates.data.data.length) {
      await client.certificates.revokeCertificate({
        path: {
          projectId: PROJECT_ID,
          certificateId: existingCertificates.data.data[0].id,
        },
      })
    }

    const certificate = await client.certificates.createCertificate({
      path: {
        projectId: PROJECT_ID,
      },
      body: {
        countryName: 'NL',
        issuerAlternativeNameUrl: 'https://animo.id',
        keyType: 'P-256',
        type: 'verifierRoot',
      },
    })

    assert.ok(certificate)

    const getCertificate = await client.certificates.getAllCertificates({
      path: {
        projectId: PROJECT_ID,
      },
      query: {
        'filter[keyType]': 'P-256',
        'filter[status]': 'active',
        'filter[type]': 'verifierRoot',
      },
    })

    assert.deepEqual(certificate.data, getCertificate.data.data[0])

    await client.certificates.revokeCertificate({
      path: {
        projectId: PROJECT_ID,
        certificateId: certificate.data.id,
      },
    })
  })
})
