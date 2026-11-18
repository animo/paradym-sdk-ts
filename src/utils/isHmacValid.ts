import { hmac } from '@noble/hashes/hmac.js'
import { sha256 } from '@noble/hashes/sha2.js'
import { bytesToHex as toHex } from '@noble/hashes/utils.js'

export function isHmacValid(secret: string, receivedHmac: string, rawBody: Buffer | string): boolean {
  const textEncoder = new TextEncoder()
  const computedHmac = toHex(
    hmac(sha256, textEncoder.encode(secret), typeof rawBody === 'string' ? textEncoder.encode(rawBody) : rawBody)
  )

  // Compare in constant time, so timing does not reveal the expected HMAC. The length is public.
  // A loop instead of node:crypto's timingSafeEqual keeps the SDK working outside Node.js.
  if (computedHmac.length !== receivedHmac.length) return false
  let diff = 0
  for (let i = 0; i < computedHmac.length; i++) diff |= computedHmac.charCodeAt(i) ^ receivedHmac.charCodeAt(i)
  return diff === 0
}
