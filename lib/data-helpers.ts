import redis from './redis';

export async function setData(key: string, data: any): Promise<void> {
  await redis.set(key, JSON.stringify(data));
}

export async function getData<T = any>(key: string): Promise<T | null> {
  const raw = await redis.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function listKeys(prefix: string): Promise<string[]> {
  return redis.keys(`${prefix}*`);
}

export async function deleteKey(key: string): Promise<void> {
  await redis.del(key);
}

// Tambahan untuk chat: daftar dan push
export async function lpush(key: string, value: string): Promise<void> {
  await redis.lpush(key, value);
}

export async function lrange(key: string, start: number, stop: number): Promise<string[]> {
  return redis.lrange(key, start, stop);
}