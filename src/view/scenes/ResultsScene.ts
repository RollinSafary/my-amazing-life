import { Atlases, Fonts, MultiAtlases } from '../../assets';
import { UiVO } from '../../model/vo/UiVO';
import { Translation } from '../../translations';
import { upperCaseFirstLetter } from '../../utils/Utils';
import {
  IResultContainerConfig,
  ResultContainer,
} from '../components/results/ResultContainer';
import ISimpleButtonState from '../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../utils/simpleButton/SimpleButton';
import {
  ISpriteButtonConfig,
  ISpriteButtonState,
} from '../utils/simpleButton/SimpleButtonInterfaces';
import { SpriteButton } from '../utils/simpleButton/SpriteButton';
import BaseScene from './BaseScene';

export enum ResultSceneAction {
  JOB,
  SAVE,
  MENU,
}

export class ResultsScene extends BaseScene {
  public static NAME: string = `ResultsScene`;
  public static ACTION_DONE_EVENT: string = 'actionDone';

  public static JOB_CLICKED_NOTIFICATION: string = `${ResultsScene.NAME}JobClickedNotification`;
  public static SAVE_CLICKED_NOTIFICATION: string = `${ResultsScene.NAME}SaveClickedNotification`;
  public static MENU_CLICKED_NOTIFICATION: string = `${ResultsScene.NAME}MenuClickedNotification`;

  protected gameResults: UiVO;
  protected backupAvailable: boolean;

  protected backgroundColor: Phaser.GameObjects.Image;
  protected background: Phaser.GameObjects.Image;
  protected personalityResult: ResultContainer;
  protected skillsResult: ResultContainer;
  protected jobButton: SpriteButton;
  protected saveButton: SpriteButton;
  protected menuButton: SimpleButton;

  constructor() {
    super(ResultsScene.NAME);
  }

  public init(args: any[]): void {
    super.init();
    const data: any[] = args[0];
    this.gameResults = data[0];
    this.backupAvailable = data[1];
  }

  public showJobButton(): void {
    this.tweens.add({
      targets: this.jobButton,
      scaleX: 1,
      scaleY: 1,
      ease: Phaser.Math.Easing.Back.Out,
      duration: 300,
    });
  }

  public create(): void {
    this.createBackgroundColor();
    this.createBackground();
    this.createDecorativeImages();
    this.createResults();
    this.createButtons();
  }

  protected createBackgroundColor(): void {
    this.backgroundColor = this.make.image({
      x: this.width / 2,
      y: this.height / 2,
      key: Atlases.Results.Atlas.Name,
      frame: Atlases.Results.Atlas.Frames.BackgroundsColor,
    });
    this.add.existing(this.backgroundColor);
    this.backgroundColor.setScale(
      this.width / this.backgroundColor.width,
      this.height / this.backgroundColor.height,
    );
  }

  protected createDecorativeImages(): void {
    const topRight = this.make.image({
      x: this.background.x + this.background.width * 0.242,
      y: this.background.y - this.background.height * 0.2737,
      key: Atlases.Results.Atlas.Name,
      frame: Atlases.Results.Atlas.Frames.BackgroundsTopRight,
    });
    this.add.existing(topRight);
    topRight.setScale(0.96, 0.91);
  }

  protected createBackground(): void {
    this.background = this.make.image({
      x: this.width / 2,
      y: this.height / 2,
      key: Atlases.Results.Atlas.Name,
      frame: Atlases.Results.Atlas.Frames.BackgroundsMain,
    });
    this.add.existing(this.background);
  }

  protected createResults(): void {
    this.createPersonalityResult();
    this.creatSkillsResult();
  }

  protected createPersonalityResult(): void {
    console.warn(this.gameResults);

    const config: IResultContainerConfig = {
      position: {
        x: this.background.x - this.background.width * 0.2425,
        y: this.background.y - this.background.height * 0.1925,
      },
      image: {
        key: MultiAtlases.Personality.Atlas.Name,
        frame: (MultiAtlases.Personality.Atlas.Frames as any)[
          `ResultsBackground${upperCaseFirstLetter(
            this.gameResults.personalityBestOption,
          )}`
        ],
      },
      imageScale: 0.5,
      avatar: this.gameResults.avatar,
      avatarTransform: {
        x: -0.31,
        y: 0.45,
        flip: false,
        scale: 1,
      },
      size: {
        width: this.background.width * 0.45,
        height: this.background.height * 0.435,
      },
    };
    this.personalityResult = new ResultContainer(this, config);
    this.add.existing(this.personalityResult);
  }
  protected creatSkillsResult(): void {
    const config: IResultContainerConfig = {
      position: {
        x: this.background.x + this.background.width * 0.3255,
        y: this.background.y + this.background.height * 0.2,
      },
      image: {
        key: MultiAtlases.Skills.Atlas.Name,
        frame: (MultiAtlases.Skills.Atlas.Frames as any)[
          `SlideShow${upperCaseFirstLetter(this.gameResults.skillsBestOption)}0`
        ],
      },
      imageScale: 1,
      avatar: this.gameResults.avatar,
      avatarTransform: {
        x: 0.3,
        y: 0.2,
        flip: true,
        scale: 0.5,
      },
      size: {
        width: this.background.width * 0.295,
        height: this.background.height * 0.473,
      },
    };
    this.skillsResult = new ResultContainer(this, config);
    this.add.existing(this.skillsResult);
  }

  protected createButtons(): void {
    this.createJobButton();
    this.createSaveButton();
    this.createMenuButton();
    this.setListeners();
  }

  protected createJobButton(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Results.Atlas.Name,
      frame: Atlases.Results.Atlas.Frames.ButtonsButtonJob,
    };
    const configs: ISpriteButtonConfig = {
      normalStateConfig,
    };
    this.jobButton = new SpriteButton(this, configs);
    this.add.existing(this.jobButton);
    this.jobButton.x = this.background.x - this.background.width * 0.41;
    this.jobButton.y = this.background.y - this.background.height * -0.42;
    !this.backupAvailable && this.jobButton.setScale(0);
  }

  protected createSaveButton(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Results.Atlas.Name,
      frame: Atlases.Results.Atlas.Frames.ButtonsButtonSave,
    };
    const configs: ISpriteButtonConfig = {
      normalStateConfig,
    };
    this.saveButton = new SpriteButton(this, configs);
    this.add.existing(this.saveButton);
    this.saveButton.x = this.background.x - this.background.width * 0.246;
    this.saveButton.y = this.background.y - this.background.height * -0.13;
    this.saveButton.setScale(0.7);
  }

  protected createMenuButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: Atlases.Popups.Atlas.Name,
      frame: Atlases.Popups.Atlas.Frames.ButtonBlue,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 32,
      fill: '#ffffff',
      text: Translation.RESULTS_BUTTON_MENU,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.menuButton = new SimpleButton(this, configs);
    this.add.existing(this.menuButton);
    this.menuButton.x = this.background.x - this.background.width * 0.085;
    this.menuButton.y = this.background.y - this.background.height * -0.404;
    this.menuButton.setScale(0.8);
  }

  protected setListeners(): void {
    this.jobButton.on(
      SpriteButton.CLICK_EVENT,
      this.onAction.bind(this, ResultSceneAction.JOB),
    );
    this.saveButton.on(
      SpriteButton.CLICK_EVENT,
      this.onAction.bind(this, ResultSceneAction.SAVE),
    );
    this.menuButton.on(
      SpriteButton.CLICK_EVENT,
      this.onAction.bind(this, ResultSceneAction.MENU),
    );
  }

  protected onAction(action: ResultSceneAction): void {
    this.events.emit(ResultsScene.ACTION_DONE_EVENT, action);
  }
}
