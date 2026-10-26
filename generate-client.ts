import { createClient } from '@hey-api/openapi-ts'

type OpenApi = {
  paths: {
    [path: string]: {
      [method: string]: {
        operationId: string
        tags: [string]
      }
    }
  }
}

function tagForOperation(openapi: OpenApi, operationId: string) {
  for (const path of Object.values(openapi.paths)) {
    for (const method of Object.values(path)) {
      if (method.operationId.toLowerCase() === operationId.toLowerCase()) {
        return method.tags[0]
      }
    }
  }
  throw new Error(`Did not find operation ${operationId}`)
}

async function generate(url: string, path: string) {
  const openapi: OpenApi = await (await fetch(url)).json()

  await createClient({
    input: openapi,
    output: {
      format: 'biome',
      path,
      // Need to wait for next release to support ESM
      // importFileExtension: '.js',
    },
    plugins: [
      {
        name: '@hey-api/sdk',
        asClass: true,
        classNameBuilder: (name) => `${name}Service`,
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

async function run() {
  // The wallets API (/v1/wallets)
  await generate(process.env.SERVER ?? 'https://api.paradym.id/openapi.json', 'generated/wallets')

  // The deprecated projects API (/v1/projects), a frozen snapshot from before the project to wallet rename
  await generate(process.env.SERVER_PROJECTS ?? 'https://api.paradym.id/openapi-deprecated.json', 'generated/projects')
}

run()
