import { type UserConfig } from '@hey-api/openapi-ts'

const config: UserConfig = {
  input: process.env.SERVER ?? 'https://api.paradym.id/openapi-docs.json',
  output: 'generated',
  services: {
    asClass: true,
    methodNameBuilder(service, operationId) {
      const lowerService = service.toLowerCase()
      const lowerOperationId = operationId.toLowerCase()

      let methodName = operationId
      if (lowerOperationId.startsWith(lowerService)) {
        methodName = operationId.slice(service.length)
      }

      return methodName.charAt(0).toLowerCase() + methodName.slice(1)
    },
    operationId: true,
  },
}

export default config
