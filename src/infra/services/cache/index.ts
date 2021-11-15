import redis from 'redis';
import { promisify } from 'util';
import { ICacheServices, SetCacheDataParams } from '@application/services/cache/index';

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  connect_timeout: 10000,
  max_attempts: 5,
});

export class RedisCacheServices implements ICacheServices {
  // cache data remove in 30 seconds
  private readonly cacheTime = 30;

  async getCacheData<T>(key: string): Promise<T | null> {
    const getAsync = promisify(client.get).bind(client);
    const data = await getAsync(key);

    if (!data) return null;
    return JSON.parse(data) as T;
  }

  async setCacheData<T>({ data, key, time = this.cacheTime }: SetCacheDataParams<T>): Promise<void> {
    const setexAsync = promisify(client.setex).bind(client);
    await setexAsync(key, time, JSON.stringify(data));
  }

  async removeCacheData(key: string): Promise<void> {
    client.del(key);
  }
}
