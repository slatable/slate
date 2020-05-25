import { createHash } from 'crypto';

export function globalformat(data: any): string {
  if (Array.isArray(data)) {
    return arrayformat(data);
  } else if (data && typeof data === 'object') {
    return jsonformat(data);
  } else {
    return otherformat(data);
  }
}

export function jsonformat(data: {[key: string]: any}): string {
  const keys = Object.keys(data).sort().map(dat => `${dat}: ${globalformat(data[dat])}`);
  return `{${keys.join(',')}}`;
}

export function arrayformat(data: any[]): string {
  const pool: string[] = data.map(dat => globalformat(dat));
  return `[${pool.join(',')}]`;
}

export function otherformat(data: string | number | boolean): string {
  return data ? String(data) : '';
}

export function md5(str: string) {
  const hash = createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

export function jsonmd5(data: any) {
  const text = globalformat(data);
  return md5(text);
}
