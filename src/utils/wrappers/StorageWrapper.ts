import store from 'store';
export const storageNamespace: string = 'my_amazing_life';
const storage: StoreJsAPI = store.namespace(storageNamespace);
export function setDataToStorage(key: StorageKey, value: any): void {
  storage.set(key, value);
}

export function getDataFromStorage<T>(key: StorageKey, defaultValue?: any): T {
  return storage.get(key, defaultValue);
}

export enum StorageKey {
  AVATAR = 'avatar',
  IS_SIGNED_IN = 'is_signed_in',
  IS_LOG_OUT = 'is_log_out',
}
