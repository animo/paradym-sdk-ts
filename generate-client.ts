import { createClient } from '@hey-api/openapi-ts'

function tagForOperation(
  openapi: {
    paths: {
      [path: string]: {
        [method: string]: {
          operationId: string
          tags: [string]
        }
      }
    }
  },
  operationId: string
) {
  for (const path of Object.values(openapi.paths)) {
    for (const method of Object.values(path)) {
      if (method.operationId.toLowerCase() === operationId.toLowerCase()) {
        return method.tags[0]
      }
    }
  }
  throw new Error(`Did not find operation ${operationId}`)
}

async function run() {
  const openapi = await (await fetch(process.env.SERVER ?? 'https://api.paradym.id/openapi.json')).json()

  createClient({
    input: openapi,
    output: {
      format: 'biome',
      path: 'generated',
    },
    plugins: [
      {
        name: '@hey-api/sdk',
        asClass: true,

        methodNameBuilder(operation) {
          if (!operation.id) throw new Error('Missing operation id')
          const tag = tagForOperation(openapi, operation.id)

          const sanitizedTag = tag.replace(/[ -]/g, '').toLowerCase()

          if (!operation.id.toLowerCase().startsWith(sanitizedTag)) {
            throw new Error('Operation id should start with tag')
          }

          const updatedOperationId = operation.id.slice(sanitizedTag.length)

          return updatedOperationId.charAt(0).toLowerCase() + updatedOperationId.slice(1)
        },
        operationId: true,
      },
      '@hey-api/typescript',
      { name: '@hey-api/client-fetch', throwOnError: true },
    ],
  })
}

run()
