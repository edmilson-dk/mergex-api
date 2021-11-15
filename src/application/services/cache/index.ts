export type SetCacheDataParams<T> = {
  key: string;
  data: T;
  time?: number;
};

export interface ICacheServices {
  getCacheData<T>(key: string): Promise<T | null>;
  setCacheData<T>(data: SetCacheDataParams<T>): Promise<void>;
  removeCacheData(key: string): Promise<void>;
}
