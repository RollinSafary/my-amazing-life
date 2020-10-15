import { Fonts, Images, MultiAtlases } from '../../assets';
import {
  personalityMarkersPositions,
  personalitySectorPaths,
  personalitySectors,
  personalityTimerPositions,
} from '../../constants/Constants';
import { gameConfig } from '../../constants/GameConfig';
import { IAvatarConfig } from '../../model/vo/UiVO';
import { Translation } from '../../translations';
import {
  IPersonalityResultsConfig,
  PersonalityResults,
} from '../components/personality/PersonalityResults';
import PersonalityTimer from '../components/personality/PersonalityTimer';
import PersonalityUser from '../components/personality/PersonalityUser';
import PersonalityMarker from '../components/personality/PersonlaityMarker';
import { enableDragAndDrop } from '../utils/phaser/DeveloperUtils';
import { IPosition } from '../utils/phaser/PhaserUtils';
import ISimpleButtonState from '../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../utils/simpleButton/SimpleButton';
import BaseScene from './BaseScene';

export default class PersonalityScene extends BaseScene {
  public static NAME: string = 'PersonalityScene';
  public static MARKER_CLICKED_NOTIFICATION: string = `${PersonalityScene.NAME}MarkerClickedNotification`;
  public static RESET_CLICKED_NOTIFICATION: string = `${PersonalityScene.NAME}ResetClickedNotification`;
  public static HELP_CLICKED_NOTIFICATION: string = `${PersonalityScene.NAME}HelpClickedNotification`;
  public static PATH_COMPLETE_NOTIFICATION: string = `${PersonalityScene.NAME}PathCompleteNotification`;
  public static TIMER_COMPLETE_NOTIFICATION: string = `${PersonalityScene.NAME}TimerCompleteNotification`;
  public static MENU_CLICKED_NOTIFICATION: string = `${PersonalityScene.NAME}MenuClickedNotification`;
  public static PLAY_CLICKED_NOTIFICATION: string = `${PersonalityScene.NAME}PlayClickedNotification`;

  public static MARKER_CLICKED_EVENT: string = 'markerClicked';
  public static RESET_CLICKED_EVENT: string = 'resetClicked';
  public static HELP_CLICKED_EVENT: string = 'helpClicked';
  public static PATH_COMPLETE_EVENT: string = 'pathComplete';
  public static TIMER_COMPLETE_EVENT: string = 'timerComplete';
  public static MENU_CLICKED_EVENT: string = 'menuCLicked';
  public static PLAY_CLICKED_EVENT: string = 'playCLicked';

  protected backgrounds: Phaser.GameObjects.Image[];
  protected frameLeft: Phaser.GameObjects.Image;
  protected frameRight: Phaser.GameObjects.Image;
  protected markers: PersonalityMarker[];
  protected resetButton: SimpleButton;
  protected helpButton: SimpleButton;
  protected pathGraphics: Phaser.GameObjects.Graphics;
  protected path: Phaser.Curves.Path;
  protected player: PersonalityUser;
  protected follower: Phaser.GameObjects.PathFollower;
  protected results: PersonalityResults;
  protected timer: PersonalityTimer;

  public sectorIndex: number = 0;

  constructor() {
    super(PersonalityScene.NAME);
  }

  public resetSector(): void {
    for (const marker of this.markers) {
      marker.prepare();
      marker.setAlpha(1);
      marker.input.enabled = true;
    }
    this.pathGraphics.clear();
    this.path.destroy();
    this.path = null;
    this.tweens.killTweensOf(this.player);
    this.player.setAlpha(1);
    this.player.setScale(1);
    this.timer.stop();
    this.timer.start();
  }

  public async showSector(
    sectorIndex: number,
    force: boolean = false,
  ): Promise<void> {
    await this.hideMarkers();
    await this.scrollTo(sectorIndex, force);
    await this.showMarkers();
    const points = personalitySectorPaths[this.sectorIndex];
    if (this.player && !!points) {
      this.player.x = this.frameLeft.displayWidth + points.getFirst().x;
      this.player.y = points.getFirst().y;
      this.player.setVisible(true);
    }
    const timerPosition: IPosition =
      personalityTimerPositions[this.sectorIndex];
    if (timerPosition) {
      this.timer.x =
        this.frameLeft.displayWidth + timerPosition.x * gameConfig.designWidth;
      this.timer.y = timerPosition.y * gameConfig.designHeight;
      this.timer.scrollFactorX = 0;
      this.timer.scrollFactorY = 0;
      this.timer.start();
    }
  }

  public showResults(): void {
    this.results.startAnimation();
  }

  public updateMarkerIndex(markerName: string, index: number): void {
    const targetMarker = this.markers.find(
      (marker: PersonalityMarker) => marker.colorName === markerName,
    );
    targetMarker.setIndex(index);
  }

  public create(): void {
    this.sectorIndex = 0;
    this.input.setTopOnly(true);
    this.createBackgrounds();
    this.createFrame();
    this.createPathGraphics();
    this.createMarkers();
    this.createTimer();
    this.camera.scrollX -= this.frameLeft.displayWidth;
    this.showSector(0, true);
    this.createButtons();
    this.setListeners();
  }

  public createPlayer(config: IAvatarConfig): void {
    this.player = new PersonalityUser(this, config);
    this.add.existing(this.player);
    const points = personalitySectorPaths[this.sectorIndex];
    this.player.x = points.getFirst().x;
    this.player.y = points.getFirst().y;
    this.player.setDepth(1);
    this.player.on(
      PersonalityUser.CLICKED_EVENT,
      this.startPathFollowing,
      this,
    );
    this.player.scrollFactorX = 0;
    this.player.scrollFactorY = 0;
  }

  public createResults(config: IPersonalityResultsConfig): void {
    this.results = new PersonalityResults(this, config);
    this.add.existing(this.results);
    this.results.x = gameConfig.designWidth;
    this.results.y = this.height;
  }

  public showPath(): void {
    this.resetButton.setVisible(true);
    this.timer.stop();
    const points: IPosition[] = personalitySectorPaths[this.sectorIndex].map(
      (value: IPosition) => {
        return { x: value.x + this.frameLeft.displayWidth, y: value.y };
      },
    );
    this.path && this.path.destroy();
    this.path = new Phaser.Curves.Path(points[0].x, points[0].y);
    for (let i: number = 0; i < points.length; i++) {
      this.path.lineTo(points[i].x, points[i].y);
    }
    this.pathGraphics.clear();
    this.pathGraphics.lineStyle(10, 0x82dbfa);
    this.pathGraphics.strokePoints(points);
    this.player.input.enabled = true;
    this.tweens.add({
      targets: this.player,
      alpha: 0.5,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });
  }

  protected async hideMarkers(): Promise<void> {
    return new Promise<void>(resolve => {
      this.tweens.killTweensOf(this.markers);
      this.tweens.add({
        targets: this.markers,
        alpha: 0,
        duration: 300,
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  protected async showMarkers(): Promise<void> {
    return new Promise<void>(resolve => {
      const markerPositions = personalityMarkersPositions[this.sectorIndex];
      if (!markerPositions) {
        return resolve();
      }
      for (const marker of this.markers) {
        marker.input.enabled = true;
        marker.x =
          this.frameLeft.displayWidth +
          markerPositions[marker.colorName].x * gameConfig.designWidth;
        marker.y =
          markerPositions[marker.colorName].y * gameConfig.designHeight;
        marker.prepare();
      }

      this.tweens.add({
        targets: this.markers,
        alpha: 1,
        duration: 300,
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  protected async scrollTo(
    sectorIndex: number,
    force: boolean = false,
  ): Promise<void> {
    return new Promise<void>(resolve => {
      this.sectorIndex = sectorIndex;
      this.tweens.killTweensOf(this.camera);
      if (force) {
        this.camera.scrollX =
          personalitySectors[sectorIndex].x * gameConfig.designWidth -
          this.frameLeft.displayWidth;
        this.camera.scrollY =
          (-1 + personalitySectors[sectorIndex].y) * this.height;
        resolve();
      } else {
        this.tweens.add({
          targets: this.camera,
          scrollX:
            personalitySectors[sectorIndex].x * gameConfig.designWidth -
            this.frameLeft.displayWidth,
          scrollY: (-1 + personalitySectors[sectorIndex].y) * this.height,
          duration: 1500,
          ease: Phaser.Math.Easing.Expo.InOut,
          onComplete: () => {
            resolve();
          },
        });
      }
    });
  }

  protected createBackgrounds(): void {
    this.backgrounds = [];
    const background0: Phaser.GameObjects.Image = this.make.image({
      x: 0,
      y: this.height,
      key: MultiAtlases.Personality.Atlas.Name,
      frame: MultiAtlases.Personality.Atlas.Frames.BoardPart0,
    });
    this.backgrounds.push(background0);
    this.add.existing(background0);
    const background1: Phaser.GameObjects.Image = this.make.image({
      x: background0.displayWidth,
      y: this.height,
      key: MultiAtlases.Personality.Atlas.Name,
      frame: MultiAtlases.Personality.Atlas.Frames.BoardPart1,
    });
    this.backgrounds.push(background1);
    this.add.existing(background1);
    background0.setOrigin(0, 1);
    background1.setOrigin(0, 1);
  }

  protected createFrame(): void {
    const frameWidth: number = (this.width - gameConfig.designWidth) / 2;
    this.frameLeft = this.make.image({
      x: 0,
      y: 0,
      key: Images.WhitePixel.Name,
    });
    this.add.existing(this.frameLeft);
    this.frameLeft.setScale(frameWidth, this.height);
    this.frameLeft.setOrigin(0);
    this.frameRight = this.make.image({
      x: this.width,
      y: 0,
      key: Images.WhitePixel.Name,
    });
    this.add.existing(this.frameRight);
    this.frameRight.setScale(frameWidth, this.height);
    this.frameRight.setOrigin(1, 0);
    this.frameLeft.setTint(0x000000);
    this.frameRight.setTint(0x000000);
    this.frameLeft.scrollFactorX = 0;
    this.frameLeft.scrollFactorY = 0;
    this.frameRight.scrollFactorX = 0;
    this.frameRight.scrollFactorY = 0;
    this.frameLeft.setDepth(100);
    this.frameRight.setDepth(100);
  }

  protected createMarkers(): void {
    this.markers = [];
    const colorsNames: string[] = [
      'purple',
      'orange',
      'cyan',
      'green',
      'blue',
      'red',
    ];
    for (const colorName of colorsNames) {
      const marker: PersonalityMarker = new PersonalityMarker(this, colorName);
      this.add.existing(marker);
      this.markers.push(marker);
    }
  }

  protected createTimer(): void {
    this.timer = new PersonalityTimer(this);
    this.add.existing(this.timer);
    enableDragAndDrop(this, this.timer);
    this.timer.scrollFactorX = 0;
    this.timer.scrollFactorY = 0;
  }

  protected createPathGraphics(): void {
    this.pathGraphics = this.add.graphics({});
    this.path = new Phaser.Curves.Path();
    this.pathGraphics.scrollFactorX = 0;
    this.pathGraphics.scrollFactorY = 0;
  }

  protected startPathFollowing(): void {
    this.resetButton.setVisible(false);
    this.tweens.killTweensOf(this.player);
    this.player.setAlpha(1);
    this.player.setScale(1);
    this.player.input.enabled = false;
    this.follower && this.follower.destroy();
    this.follower = this.add.follower(
      this.path,
      this.player.x,
      this.player.y,
      Images.WhitePixel.Name,
    );
    this.follower.startFollow({
      duration: 2000,
      onUpdate: () => {
        this.player.x = this.follower.x;
        this.player.y = this.follower.y;
      },
      onComplete: () => {
        this.pathGraphics.clear();
        this.player.setVisible(false);
        this.events.emit(PersonalityScene.PATH_COMPLETE_EVENT);
      },
    });
  }

  protected createButtons(): void {
    this.createResetButton();
    this.createHelpButton();
  }

  protected createResetButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Personality.Atlas.Name,
      frame: MultiAtlases.Personality.Atlas.Frames.ButtonMenu,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: '#ffffff',
      text: Translation.PERSONALITY_BUTTON_RESET,
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.resetButton = new SimpleButton(this, configs);
    this.add.existing(this.resetButton);
    this.resetButton.x =
      this.frameLeft.displayWidth + this.resetButton.width * 0.6;
    this.resetButton.y =
      this.height -
      this.resetButton.height * 0.5 -
      this.resetButton.width * 0.1;
    this.resetButton.setVisible(false);
    this.resetButton.setScrollFactor(0);
  }
  protected createHelpButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Personality.Atlas.Name,
      frame: MultiAtlases.Personality.Atlas.Frames.ButtonMenu,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: '#ffffff',
      text: Translation.PERSONALITY_BUTTON_HELP,
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.helpButton = new SimpleButton(this, configs);
    this.add.existing(this.helpButton);
    this.helpButton.x = this.width - this.resetButton.x;
    this.helpButton.y = this.resetButton.y;
    this.helpButton.setScrollFactor(0);
  }

  protected setListeners(): void {
    this.resetButton.on(
      SimpleButton.CLICK_EVENT,
      this.events.emit.bind(this.events, PersonalityScene.RESET_CLICKED_EVENT),
    );
    this.helpButton.on(
      SimpleButton.CLICK_EVENT,
      this.events.emit.bind(this.events, PersonalityScene.HELP_CLICKED_EVENT),
    );
  }

  get camera(): Phaser.Cameras.Scene2D.Camera {
    return this.cameras.main;
  }
}
