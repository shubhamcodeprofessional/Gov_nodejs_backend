import { randomUUID } from 'crypto';

export  function generateCustomUUID(): string {
    const uuid = randomUUID();
    const timestamp = Math.floor(Date.now() / 1000);
    return `${uuid}-${timestamp}`;
}

export  function getTraceId(request:any): string {
    return `${(request as any)?.traceId}`;
}