import assert from 'node:assert'
import { describe, it } from 'node:test'
import { hmac } from '@noble/hashes/hmac.js'
import { sha256 } from '@noble/hashes/sha2.js'
import { isHmacValid } from '../src/utils/isHmacValid'

describe('HMAC validation', () => {
  it('should return true for valid HMAC', () => {
    const secret = 'supersecret'
    const rawBody = 'Hello, world!'
    const receivedHmac = Buffer.from(hmac(sha256, Buffer.from(secret), Buffer.from(rawBody))).toString('hex')

    const result = isHmacValid(secret, receivedHmac, rawBody)
    assert.strictEqual(result, true, 'The HMAC should be valid')
  })

  it('should return false for invalid HMAC', () => {
    const secret = 'supersecret'
    const rawBody = 'Hello, world!'
    const receivedHmac = 'invalidhmac'

    const result = isHmacValid(secret, receivedHmac, rawBody)
    assert.strictEqual(result, false, 'The HMAC should be invalid')
  })

  it('should handle Buffer input', () => {
    const secret = 'supersecret'
    const rawBody = Buffer.from('Hello, world!')
    const receivedHmac = Buffer.from(hmac(sha256, Buffer.from(secret), rawBody)).toString('hex')

    const result = isHmacValid(secret, receivedHmac, rawBody)
    assert.strictEqual(result, true, 'The HMAC should be valid for Buffer input')
  })
})
