import { sha256 } from '@noble/hashes/sha256';
import { hmac } from '@noble/hashes/hmac';
import { bytesToHex as toHex } from '@noble/hashes/utils';

export function isHmacValid(secret: string, receivedHmac: string, rawBody: Buffer | string): boolean {
    const computedHmac = toHex(hmac(sha256, secret, rawBody));

    return computedHmac === receivedHmac;
}