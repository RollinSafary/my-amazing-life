import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, MultiAtlases } from '../../assets';
import { ILifeStyleChoices } from '../../model/vo/UiVO';
import { Translation } from '../../translations';
import LifeStyleResultPopupOption from '../components/lifestyle/popup/LifeStyleResultPopupOption';
import { IPosition, ITextStyle } from '../utils/phaser/PhaserUtils';
import TypeWriter from '../utils/phaser/TypeWriter';
import ISimpleButtonState from '../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../utils/simpleButton/SimpleButton';
import StandardPopup from './StandardPopup';

export enum LifeStyleResultPopupAction {
  MENU,
  PLAY_AGAIN,
}

export default class LifeStyleResultPopup extends StandardPopup {
  public static NAME: string = 'LifeStyleResultPopup';

  public static PLAY_AGAIN_NOTIFICATION: string = `${LifeStyleResultPopup.NAME}PlayAgainNotification`;
  public static MENU_CLICKED_NOTIFICATION: string = `${LifeStyleResultPopup.NAME}MenuClickedNotification`;

  protected title: ExtendedText;
  protected menuButton: SimpleButton;
  protected playButton: SimpleButton;
  protected leftOptions: LifeStyleResultPopupOption[];
  protected rightOptions: LifeStyleResultPopupOption[];
  protected description: TypeWriter;

  public prepareToShow(x: number, y: number, choices: ILifeStyleChoices): void {
    this.createOptions(choices);
    this.createDescription();
    this.createButtons();
    super.prepareToShow(x, y);
  }

  protected async onShowComplete(): Promise<void> {
    for (const option of this.leftOptions) {
      await option.show();
    }
    for (const option of this.rightOptions) {
      await option.show();
    }
    await this.description.play(5000, 500);
    this.showButtons();
  }

  protected createBody(): void {
    this.createColoredBlocker(0.7);
    this.createBgImage(
      MultiAtlases.Lifestyle.Atlas.Name,
      MultiAtlases.Lifestyle.Atlas.Frames.PopupBackground,
    );
    this.createTitle();
  }

  protected createTitle(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 56,
      fill: '#90d7ff',
    };
    this.title = this.scene.make.extText({
      x: 0,
      y: -this.height * 0.4,
      text: Translation.LIFESTYLE_RESULT_POPUP_TITLE,
      style,
    });
    this.title.setOrigin(0.5);
    this.add(this.title);
  }

  protected createButtons(): void {
    this.createPlayButton();
    this.createMenuButton();
    this.playButton.setScale(0);
    this.menuButton.setScale(0);
    this.setListeners();
  }

  protected createOptions(choices: ILifeStyleChoices): void {
    const keys: string[] = Object.keys(choices);
    const positions: IPosition[] = [];
    const choicesValues: number[] = [];
    let monthlyExpenses: number = 0;
    for (const key of keys) {
      choicesValues.push(choices[key]);
      monthlyExpenses += choices[key];
      const values: string[] = key.split('-');
      const x: number = +values[0];
      const y: number = +values[1];
      positions.push({ x, y });
    }
    const line: Phaser.Geom.Line = new Phaser.Geom.Line(
      0,
      this.title.y + this.title.height * 0.5,
      0,
      this.height * 0.45,
    );
    const points: Phaser.Geom.Point[] = line.getPoints(13);
    points.shift();
    this.createLeftColumn(choicesValues, positions, points);
    const annualExpanses: number = 12 * monthlyExpenses;
    const annualSalary: number = annualExpanses / 0.75;
    const annualTaxes: number = annualSalary * 0.25;
    const rightColumnValues: number[] = [
      monthlyExpenses,
      annualExpanses,
      annualTaxes,
      annualSalary,
    ];
    this.createRightColumn(rightColumnValues, points);
  }

  protected createLeftColumn(
    choicesValues: number[],
    positions: IPosition[],
    points: Phaser.Geom.Point[],
  ): void {
    const lineFrame: Phaser.Textures.Frame = this.scene.textures.getFrame(
      MultiAtlases.Lifestyle.Atlas.Name,
      MultiAtlases.Lifestyle.Atlas.Frames.PopupLine,
    );
    const x: number = -this.width * 0.4 + lineFrame.width * 0.5;
    const optionNames: string[] = [];
    for (const position of positions) {
      optionNames.push(`lifestyle-section-name-${position.x}-${position.y}`);
    }
    this.leftOptions = [];

    for (let i: number = 0; i < optionNames.length; i++) {
      const name: string = optionNames[i];
      const option = new LifeStyleResultPopupOption(
        this.scene,
        name,
        choicesValues[i],
      );
      this.add(option);
      this.leftOptions.push(option);
      option.x = x;
      option.y = points[i].y;
    }
  }

  protected createRightColumn(
    values: number[],
    points: Phaser.Geom.Point[],
  ): void {
    const lineFrame: Phaser.Textures.Frame = this.scene.textures.getFrame(
      MultiAtlases.Lifestyle.Atlas.Name,
      MultiAtlases.Lifestyle.Atlas.Frames.PopupLine,
    );
    const x: number = this.width * 0.425 - lineFrame.width * 0.5;
    const optionNames: string[] = [
      Translation.LIFESTYLE_OPTION_NAME_MONTHLY,
      Translation.LIFESTYLE_OPTION_NAME_ANNUAL,
      Translation.LIFESTYLE_OPTION_NAME_TAXES,
      Translation.LIFESTYLE_OPTION_NAME_SALARY,
    ];
    this.rightOptions = [];

    for (let i: number = 0; i < optionNames.length; i++) {
      const name: string = optionNames[i];
      const option = new LifeStyleResultPopupOption(
        this.scene,
        name,
        values[i],
      );
      this.add(option);
      this.rightOptions.push(option);
      option.x = x;
      option.y = points[i].y;
    }
  }
  protected createDescription(): void {
    const style: ITextStyle = {
      fontFamily: 'Arial',
      fontSize: 28,
      fill: '#e8bc7e',
    };
    const lastOption = this.rightOptions.getLast();
    const description: ExtendedText = this.scene.make.extText({
      x: 0,
      y: 0,
      text: Translation.LIFESTYLE_RESULT_POPUP_TEXT,
      style,
      i18nOptions: {
        salary: this.rightOptions.getLast().value,
      },
    });
    description.setWordWrapWidth(this.leftOptions[0].width);
    this.description = new TypeWriter(this.scene, description);
    this.add(this.description);
    this.description.x = lastOption.x - lastOption.width * 0.5;
    this.description.y = lastOption.y + lastOption.height;
  }

  protected createPlayButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.ButtonsHelp,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 32,
      fill: '#ffffff',
      origin: { x: 0.5, y: 0.5 },
      text: Translation.LIFESTYLE_BUTTON_PLAY,
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.playButton = new SimpleButton(this.scene, configs);
    this.playButton.x =
      this.rightOptions.getLast().x - this.playButton.width * 0.6;
    this.playButton.y = this.leftOptions.getLast().y;
    this.add(this.playButton);
  }

  protected createMenuButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.ButtonsHelp,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 32,
      fill: '#ffffff',
      origin: { x: 0.5, y: 0.5 },
      text: Translation.LIFESTYLE_BUTTON_MENU,
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.menuButton = new SimpleButton(this.scene, configs);
    this.menuButton.x =
      this.rightOptions.getLast().x + this.menuButton.width * 0.6;
    this.menuButton.y = this.playButton.y;
    this.add(this.menuButton);
  }

  protected showButtons(): void {
    this.scene.tweens.add({
      targets: [this.playButton, this.menuButton],
      scaleX: 1,
      scaleY: 1,
      ease: Phaser.Math.Easing.Back.Out,
      duration: 300,
    });
  }

  protected setListeners(): void {
    this.playButton.once(
      SimpleButton.CLICK_EVENT,
      this.onAction.bind(this, LifeStyleResultPopupAction.PLAY_AGAIN),
    );
    this.menuButton.once(
      SimpleButton.CLICK_EVENT,
      this.onAction.bind(this, LifeStyleResultPopupAction.MENU),
    );
  }
}
