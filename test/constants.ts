if (!process.env.X_ACCESS_TOKEN || !process.env.WALLET_ID) throw new Error('Missing env variables')

// The API base URL, for example https://api.dev.paradym.id. Defaults to production.
export const BASE_URL = process.env.SERVER
export const X_ACCESS_TOKEN = process.env.X_ACCESS_TOKEN
export const WALLET_ID = process.env.WALLET_ID
