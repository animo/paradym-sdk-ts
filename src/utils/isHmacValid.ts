import { hmac } from '@noble/hashes/hmac.js'
import { sha256 } from '@noble/hashes/sha2.js'
import { bytesToHex as toHex } from '@noble/hashes/utils.js'

export function isHmacValid(secret: string, receivedHmac: string, rawBody: Buffer | string): boolean {
  const textEncoder = new TextEncoder()
  const computedHmac = toHex(
    hmac(sha256, textEncoder.encode(secret), typeof rawBody === 'string' ? textEncoder.encode(rawBody) : rawBody)
  )

  return computedHmac === receivedHmac
}
