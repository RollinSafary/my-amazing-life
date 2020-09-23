import { Atlases, Fonts, Images, Locales } from '../../assets';
import { addNinePatchConfigs } from '../../constants/NinePatchConfigs';
import {
  loadAtlases,
  loadFonts,
  loadImages,
  loadJSONs,
} from '../utils/assetLoader';
import BaseScene from './BaseScene';

export default class BootScene extends BaseScene {
  public static NAME: string = 'BootScene';
  public static LOAD_COMPLETE_NOTIFICATION: string = `${BootScene.NAME}LoadCompleteNotification`;
  public static LOAD_COMPLETE_EVENT: string = `${BootScene.NAME}LoadCompleteEvent`;

  constructor() {
    super(BootScene.NAME);
  }

  public init(): void {
    super.init();
  }

  public preload(): void {
    addNinePatchConfigs(this.game);
    loadAtlases(this, Atlases.Loading);
    loadImages(this, Images);
    loadJSONs(this, Locales);
    loadFonts(Fonts);
  }

  public create(): void {
    this.i18n.init('en');
    this.events.emit(BootScene.LOAD_COMPLETE_EVENT);
  }
}
