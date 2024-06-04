import type { UserConfig } from '@hey-api/openapi-ts'

// Issues with the configuring through the defineConfig helper function
// Error(TS4082) |
// Default export of the module has or is using private name ClientConfig .
// export default defineConfig({
//   input: 'https://api.paradym.id/openapi.json',
//   output: 'src/generated',
//   services: {
//     asClass: true,
//   },
// })

const config: UserConfig = {
  input: process.env.SERVER ?? 'https://api.paradym.id/openapi.json',
  output: 'generated',
  services: {
    asClass: true,
  },
}

export default config
