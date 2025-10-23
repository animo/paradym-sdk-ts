import { hmac } from '@noble/hashes/hmac.js'
import { sha256 } from '@noble/hashes/sha2.js'
import { bytesToHex as toHex } from '@noble/hashes/utils.js'

export function isHmacValid(secret: string, receivedHmac: string, rawBody: Buffer | string): boolean {
  const computedHmac = toHex(
    hmac(sha256, Buffer.from(secret), typeof rawBody === 'string' ? Buffer.from(rawBody) : rawBody)
  )

  return computedHmac === receivedHmac
}
