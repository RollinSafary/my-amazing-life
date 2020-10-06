import { Atlases, Fonts, Images } from '../../assets';
import { IGameAvailableState } from '../../model/vo/PlayerVO';
import { IAvatarConfig } from '../../model/vo/UiVo';
import { Translation } from '../../translations';
import Avatar from '../components/avatar/Avatar';
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

export enum LobbyAction {
  LIFESTYLE,
  PERSONALITY,
  HOBBIES,
  SKILLS,
  BACK,
  HELP,
  RESULTS,
}

export default class LobbyScene extends BaseScene {
  public static NAME: string = 'LobbyScene';
  public static ACTION_DONE_EVENT: string = 'actionDone';
  public static BACK_NOTIFICATION: string = `${LobbyScene.NAME}BackNotification`;
  public static HELP_NOTIFICATION: string = `${LobbyScene.NAME}HelpNotification`;
  public static RESULTS_NOTIFICATION: string = `${LobbyScene.NAME}ShowResultsNotification`;
  public static GAME_CHOSE_NOTIFICATION: string = `${LobbyScene.NAME}GameChoseNotification`;

  protected leftBackground: Phaser.GameObjects.Image;
  protected rightBackground: Phaser.GameObjects.Image;
  protected logo: Phaser.GameObjects.Image;
  protected lifeStyle: SpriteButton;
  protected personality: SpriteButton;
  protected skills: SpriteButton;
  protected hobbies: SpriteButton;
  protected avatar: Avatar;
  protected avatarConfig: IAvatarConfig;
  protected backButton: SimpleButton;
  protected helpButton: SimpleButton;
  protected resultsButton: SimpleButton;

  constructor() {
    super(LobbyScene.NAME);
  }

  public create(): void {
    this.createBackgrounds();
    this.createLogo();
    this.createSections();
    this.createAvatar();
    this.createButtons();
    this.setListeners();
  }

  public showResultsButton(): void {
    this.resultsButton.setVisible(true);
  }

  public updateSections(availableStates: IGameAvailableState): void {
    this.changeSectionState(this.personality, availableStates.personality);
    this.changeSectionState(this.hobbies, availableStates.hobbies);
    this.changeSectionState(this.skills, availableStates.skills);
  }

  public setAvatarConfig(config: IAvatarConfig): void {
    this.avatarConfig = config;
  }

  protected createBackgrounds(): void {
    this.createLeftBackground();
    this.createRightBackground();
  }

  protected createLeftBackground(): void {
    this.leftBackground = this.make.image({
      x: 0,
      y: this.height * 0.5,
      key: Images.WhitePixel.Name,
    });
    this.add.existing(this.leftBackground);
    this.leftBackground.setOrigin(0, 0.5);
    this.leftBackground.setScale(this.width * 0.61, this.height);
    this.leftBackground.setTint(0xa93816);
  }
  protected createRightBackground(): void {
    this.rightBackground = this.make.image({
      x: this.width,
      y: this.height * 0.5,
      key: Images.WhitePixel.Name,
    });
    this.add.existing(this.rightBackground);
    this.rightBackground.setOrigin(1, 0.5);
    this.rightBackground.setScale(this.width * 0.39, this.height);
    this.rightBackground.setTint(0xf2c11f);
  }

  protected createLogo(): void {
    this.logo = this.make.image({
      x: 0,
      y: 0,
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.Logo,
    });
    this.logo.x =
      this.rightBackground.x - this.rightBackground.displayWidth * 0.5;
    this.logo.y = this.height * 0.05 + this.logo.height * 0.5;
    this.add.existing(this.logo);
  }

  protected createSections(): void {
    this.createLifeStyle();
    this.createPersonality();
    this.createSkills();
    this.createHobbies();
  }

  protected createLifeStyle(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.LifestyleOn,
    };
    const hoverStateConfig: ISpriteButtonState = {
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.LifestyleOff,
    };
    const configs: ISpriteButtonConfig = {
      normalStateConfig,
      hoverStateConfig,
    };
    this.lifeStyle = new SpriteButton(this, configs);
    this.add.existing(this.lifeStyle);
    this.lifeStyle.x = this.difY + this.lifeStyle.width * 0.5;
    this.lifeStyle.y = this.difY + this.lifeStyle.height * 0.5;
  }
  protected createPersonality(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.PersonalityOn,
    };
    const hoverStateConfig: ISpriteButtonState = {
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.PersonalityOff,
    };
    const configs: ISpriteButtonConfig = {
      normalStateConfig,
      hoverStateConfig,
    };
    this.personality = new SpriteButton(this, configs);
    this.add.existing(this.personality);
    this.personality.x =
      this.leftBackground.displayWidth - this.difY - this.lifeStyle.width * 0.5;
    this.personality.y = this.difY + this.lifeStyle.height * 0.5;
  }
  protected createSkills(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.SkillsOn,
    };
    const hoverStateConfig: ISpriteButtonState = {
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.SkillsOff,
    };
    const configs: ISpriteButtonConfig = {
      normalStateConfig,
      hoverStateConfig,
    };
    this.skills = new SpriteButton(this, configs);
    this.add.existing(this.skills);
    this.skills.x = this.difY + this.lifeStyle.width * 0.5;
    this.skills.y = this.height - this.difY - this.lifeStyle.height * 0.5;
  }
  protected createHobbies(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.HobbiesOn,
    };
    const hoverStateConfig: ISpriteButtonState = {
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.HobbiesOff,
    };
    const configs: ISpriteButtonConfig = {
      normalStateConfig,
      hoverStateConfig,
    };
    this.hobbies = new SpriteButton(this, configs);
    this.add.existing(this.hobbies);
    this.hobbies.x =
      this.leftBackground.displayWidth - this.difY - this.lifeStyle.width * 0.5;
    this.hobbies.y = this.height - this.difY - this.lifeStyle.height * 0.5;
  }

  protected createAvatar(): void {
    this.avatar = new Avatar(this, this.avatarConfig);
    this.add.existing(this.avatar);
    this.avatar.x = this.leftBackground.displayWidth * 0.5;
    this.avatar.y = this.height * 0.55;
    this.avatar.setScale(-1, 1);
    this.avatar.showShadow();
  }

  protected createButtons(): void {
    this.createBackButton();
    this.createHelpButton();
    this.createResultsButton();
  }

  protected createBackButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.Button,
    };

    const textConfig: ISimpleButtonText = {
      text: Translation.LOBBY_BUTTON_BACK,
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.backButton = new SimpleButton(this, configs);
    this.add.existing(this.backButton);
    this.backButton.x =
      this.rightBackground.x - this.rightBackground.displayWidth / 2;
    this.backButton.y = this.height * 0.95 - this.backButton.height / 2;
  }

  protected createHelpButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.Button,
    };

    const textConfig: ISimpleButtonText = {
      text: Translation.LOBBY_BUTTON_HELP,
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.helpButton = new SimpleButton(this, configs);
    this.add.existing(this.helpButton);
    this.helpButton.x = this.backButton.x;
    this.helpButton.y = this.backButton.y - this.helpButton.height * 1.1;
  }

  protected createResultsButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.Button,
    };

    const textConfig: ISimpleButtonText = {
      text: Translation.LOBBY_BUTTON_RESULTS,
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.resultsButton = new SimpleButton(this, configs);
    this.add.existing(this.resultsButton);
    this.resultsButton.x = this.helpButton.x;
    this.resultsButton.y = this.helpButton.y - this.resultsButton.height * 1.1;
    this.resultsButton.setVisible(false);
  }

  protected changeSectionState(target: SpriteButton, enabled: boolean): void {
    target.setEnabled(enabled);
    target.setAlpha(enabled ? 1 : 0.3);
  }

  protected setListeners(): void {
    this.lifeStyle.on(
      SpriteButton.CLICK_EVENT,
      this.onAction.bind(this, LobbyAction.LIFESTYLE),
    );
    this.personality.on(
      SpriteButton.CLICK_EVENT,
      this.onAction.bind(this, LobbyAction.PERSONALITY),
    );
    this.hobbies.on(
      SpriteButton.CLICK_EVENT,
      this.onAction.bind(this, LobbyAction.HOBBIES),
    );
    this.skills.on(
      SpriteButton.CLICK_EVENT,
      this.onAction.bind(this, LobbyAction.SKILLS),
    );

    this.backButton.on(
      SpriteButton.CLICK_EVENT,
      this.onAction.bind(this, LobbyAction.BACK),
    );
    this.helpButton.on(
      SpriteButton.CLICK_EVENT,
      this.onAction.bind(this, LobbyAction.HELP),
    );
    this.resultsButton.on(
      SpriteButton.CLICK_EVENT,
      this.onAction.bind(this, LobbyAction.RESULTS),
    );
  }

  protected onAction(action: LobbyAction): void {
    this.events.emit(LobbyScene.ACTION_DONE_EVENT, action);
  }

  get difY(): number {
    return this.height * 0.05;
  }
}
