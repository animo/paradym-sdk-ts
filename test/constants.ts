if (
  !process.env.X_ACCESS_TOKEN ||
  !process.env.PROJECT_ID ||
  !process.env.SD_JWT_CREDENTIAL_TEMPLATE_ID ||
  !process.env.PRESENTATION_TEMPLATE_ID
)
  throw new Error('Missing env variables')

export const X_ACCESS_TOKEN = process.env.X_ACCESS_TOKEN
export const PROJECT_ID = process.env.PROJECT_ID
export const SD_JWT_CREDENTIAL_TEMPLATE_ID = process.env.SD_JWT_CREDENTIAL_TEMPLATE_ID
export const PRESENTATION_TEMPLATE_ID = process.env.PRESENTATION_TEMPLATE_ID
