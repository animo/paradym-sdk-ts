import { createHmac } from 'crypto';

export function isHmacValid(secret: string, receivedHmac: string, rawBody: Buffer | string): boolean {
    const computedHmac = createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');
    
    return computedHmac === receivedHmac;
}