import { Proxy } from '@candywings/pure-mvc';
import { Translation } from '../translations';
import {
  getLifeStylePanelItemAddonState,
  getLifeStylePanelItemPriceKey,
} from '../utils/Utils';
import { ILifeStylePanelConfig } from '../view/components/lifestyle/panel/LifeStylePanel';
import { getFSDataAsync, setFSDataAsync } from '../view/utils/FirebaseUtils';
import { UiVO } from './vo/UiVO';

export default class UiVOProxy extends Proxy<UiVO> {
  public static NAME: string = 'UiVOProxy';
  public static REGISTERED_NOTIFICATION: string = `${UiVOProxy.NAME}RegisteredNotification`;
  public static AVATAR_CONFIGURATION_UPDATED_NOTIFICATION: string = `${UiVOProxy.NAME}AvatarConfigurationUpdatedNotification`;
  public static AVATAR_CONFIGURATION_CLEARED_NOTIFICATION: string = `${UiVOProxy.NAME}AvatarConfigurationClearedNotification`;
  public static AVATAR_CONFIGURATION_SAVED_NOTIFICATION: string = `${UiVOProxy.NAME}AvatarConfigurationSavedNotification`;
  public static LIFE_STYLE_GAME_COMPLETE_NOTIFICATION: string = `${UiVOProxy.NAME}LifeStyleGameCompleteNotification`;
  public static LIFE_STYLE_OPTION_SELECTED_NOTIFICATION: string = `${UiVOProxy.NAME}LifeStyleOptionSelectedNotification`;
  public static LIFE_STYLE_OPTION_CONFIRMED_NOTIFICATION: string = `${UiVOProxy.NAME}LifeStyleOptionConfirmedNotification`;

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

  public setLifeStyleChoice(
    config: ILifeStylePanelConfig,
    index: number,
    value: number,
  ): void {
    if (this.vo.lifeStylePanelUsedIndexes.includes(index)) {
      return;
    }
    const type: string = getLifeStylePanelItemPriceKey(
      config.xIndex,
      config.yIndex,
      index,
    );
    const isAddon: boolean = getLifeStylePanelItemAddonState(
      config.xIndex,
      config.yIndex,
      index,
    );
    if (isAddon) {
      this.vo.lifeStylePanelUsedIndexes.push(index);
      this.vo.lifeStyleSubtotal += value;
    } else {
      this.vo.lifeStylePanelUsedIndexes = [];
      this.vo.lifeStyleSubtotal =
        type === Translation.LIFESTYLE_PRICE_PERCENT
          ? this.vo.lifeStyleTotal / ((100 - value) / 100)
          : value;
    }
    this.vo.lifeStyleChoices[
      `${config.xIndex}-${config.yIndex}`
    ] = this.vo.lifeStyleSubtotal;

    this.sendNotification(
      UiVOProxy.LIFE_STYLE_OPTION_SELECTED_NOTIFICATION,
      true,
    );
  }

  public clearLifeStyleChoice(): void {
    const key: string = Object.keys(this.vo.lifeStyleChoices).getLast();
    delete this.vo.lifeStyleChoices[key];
    this.vo.lifeStyleSubtotal = 0;
    this.vo.lifeStylePanelUsedIndexes = [];
    this.sendNotification(
      UiVOProxy.LIFE_STYLE_OPTION_SELECTED_NOTIFICATION,
      false,
    );
  }

  public confirmLifeStyleChoice(): void {
    this.vo.lifeStyleTotal += this.vo.lifeStyleSubtotal;
    this.vo.lifeStylePanelUsedIndexes = [];
    this.vo.lifeStyleSubtotal = 0;
    this.vo.lifeStyleProgress++;
    Object.keys(this.vo.lifeStyleChoices).length === 12
      ? this.sendNotification(UiVOProxy.LIFE_STYLE_GAME_COMPLETE_NOTIFICATION)
      : this.sendNotification(
          UiVOProxy.LIFE_STYLE_OPTION_CONFIRMED_NOTIFICATION,
        );
  }

  public resetLifeStyle(): void {
    this.vo.lifeStyleChoices = {};
    this.vo.lifeStylePanelUsedIndexes = [];
    this.vo.lifeStyleSubtotal = 0;
    this.vo.lifeStyleTotal = 0;
    this.vo.lifeStyleProgress = 0;
  }
}
