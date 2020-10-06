import store from 'store';
export const storageNamespace: string = 'my_amazing_life';
const storage: StoreJsAPI = store.namespace(storageNamespace);
export function setDataToStorage(
  key: StorageKey,
  email: string,
  value: any,
): void {
  storage.set(`${key}_${email}`, value);
}

export function getDataFromStorage<T>(
  key: StorageKey,
  email: string,
  defaultValue?: any,
): T {
  return storage.get(`${key}_${email}`, defaultValue);
}

export enum StorageKey {
  AVATAR = 'avatar',
  IS_SIGNED_IN = 'is_signed_in',
  IS_LOG_OUT = 'is_log_out',
}
