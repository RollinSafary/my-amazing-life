import { Proxy } from '@candywings/pure-mvc';
import { getFSDataAsync, setFSDataAsync } from '../view/utils/FirebaseUtils';
import { UiVO } from './vo/UiVo';

export default class UiVOProxy extends Proxy<UiVO> {
  public static NAME: string = 'UiVOProxy';
  public static REGISTERED_NOTIFICATION: string = `${UiVOProxy.NAME}RegisteredNotification`;
  public static AVATAR_CONFIGURATION_UPDATED_NOTIFICATION: string = `${UiVOProxy.NAME}AvatarConfigurationUpdatedNotification`;
  public static AVATAR_CONFIGURATION_CLEARED_NOTIFICATION: string = `${UiVOProxy.NAME}AvatarConfigurationClearedNotification`;
  public static AVATAR_CONFIGURATION_SAVED_NOTIFICATION: string = `${UiVOProxy.NAME}AvatarConfigurationSavedNotification`;

  constructor() {
    super(UiVOProxy.NAME, new UiVO());
  }

  public onRegister(): void {
    this.sendNotification(UiVOProxy.REGISTERED_NOTIFICATION);
  }

  public updateAvatarConfiguration(key: string, value: number | string): void {
    this.vo.avatar[key] = value;
    key === 'gender' && this.clearAvatarConfiguration();
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

  public async retrieveAvatarConfiguration(email: string): Promise<void> {
    this.vo.avatar = await getFSDataAsync(email);
    this.sendNotification(UiVOProxy.AVATAR_CONFIGURATION_UPDATED_NOTIFICATION);
  }

  public saveAvatarConfiguration(email: string): void {
    setFSDataAsync(email, this.vo.avatar);
    this.sendNotification(UiVOProxy.AVATAR_CONFIGURATION_SAVED_NOTIFICATION);
  }
}
