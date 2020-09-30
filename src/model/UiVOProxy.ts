import { Proxy } from '@candywings/pure-mvc';
import {
  getDataFromStorage,
  setDataToStorage,
  StorageKey,
} from '../utils/wrappers/StorageWrapper';
import { UiVO } from './vo/UiVo';

export default class UiVOProxy extends Proxy<UiVO> {
  public static NAME: string = 'UiVOProxy';
  public static REGISTERED_NOTIFICATION: string = `${UiVOProxy.NAME}RegisteredNotification`;
  public static AVATAR_CONFIGURATION_UPDATED_NOTIFICATION: string = `${UiVOProxy.NAME}AvatarConfigurationUpdatedNotification`;
  public static AVATAR_CONFIGURATION_CLEARED_NOTIFICATION: string = `${UiVOProxy.NAME}AvatarConfigurationClearedNotification`;

  constructor() {
    super(UiVOProxy.NAME, new UiVO());
  }

  public onRegister(): void {
    this.setValuesFromStorage();
    this.sendNotification(UiVOProxy.REGISTERED_NOTIFICATION);
  }

  public updateAvatarConfiguration(key: string, value: number | string): void {
    this.vo.avatar[key] = value;
    this.sendNotification(UiVOProxy.AVATAR_CONFIGURATION_UPDATED_NOTIFICATION);
  }

  public clearAvatarConfiguration(): void {
    this.vo.avatar.color = 0;
    this.vo.avatar.hair = -1;
    this.vo.avatar.face = -1;
    this.vo.avatar.shirt = -1;
    this.vo.avatar.breeches = -1;
    this.sendNotification(UiVOProxy.AVATAR_CONFIGURATION_CLEARED_NOTIFICATION);
  }

  public saveAvatarConfiguration(): void {
    setDataToStorage(StorageKey.AVATAR, this.vo.avatar);
  }

  protected setValuesFromStorage(): void {
    this.vo.avatar = getDataFromStorage(StorageKey.AVATAR, {
      color: 0,
      hair: -1,
      face: -1,
      shirt: -1,
      breeches: -1,
      gender: 'male',
    });
    this.sendNotification(UiVOProxy.AVATAR_CONFIGURATION_UPDATED_NOTIFICATION);
  }
}
