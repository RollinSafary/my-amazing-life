import { Atlases } from '../../assets';
import BasePerson from '../components/welcome/BasePerson';
import FemalePerson from '../components/welcome/FemalePerson';
import MalePerson from '../components/welcome/MalePerson';
import WelcomeStartButton from '../components/welcome/WelcomeStartButton';
import { SpriteButton } from '../utils/simpleButton/SpriteButton';
import BaseScene from './BaseScene';

export default class WelcomeScene extends BaseScene {
  public static NAME: string = 'WelcomeScene';
  public static START_THE_GAME_EVENT: string = 'startTheGameEvent';
  public static START_BUTTON_CLICKED_NOTIFICATION: string = `${WelcomeScene.NAME}StartButtonClickedNotification`;

  private malePerson: BasePerson;
  private femalePerson: BasePerson;
  private background: Phaser.GameObjects.Image;
  private logo: Phaser.GameObjects.Image;
  private light: Phaser.GameObjects.Image;
  private city: Phaser.GameObjects.Image;
  private globous: Phaser.GameObjects.Image;
  private startButton: WelcomeStartButton;

  constructor() {
    super(WelcomeScene.NAME);
  }

  public create(): void {
    this.createBackground();
    this.createLogo();
    this.createLight();
    this.createCity();
    this.createGlobous();
    this.createPersons();
    this.createStartButton();
    this.prepare();
    this.setListeners();
  }

  private createBackground(): void {
    this.background = this.make.image({
      x: this.width * 0.5,
      y: this.height * 0.5,
      key: Atlases.Welcome.Atlas.Name,
      frame: Atlases.Welcome.Atlas.Frames.Background,
    });
    this.add.existing(this.background);
    this.background.setScale(
      this.width / this.background.width,
      this.height / this.background.height,
    );
  }

  private createLogo(): void {
    this.logo = this.make.image({
      x: this.width * 0.215625,
      y: this.height * 0.3497,
      key: Atlases.Welcome.Atlas.Name,
      frame: Atlases.Welcome.Atlas.Frames.Logo,
    });
    this.add.existing(this.logo);
  }

  private createCity(): void {
    this.city = this.make.image({
      x: this.width * 0.5,
      y: this.height,
      key: Atlases.Welcome.Atlas.Name,
      frame: Atlases.Welcome.Atlas.Frames.City,
    });
    this.city.setOrigin(0.5, 1);
    this.add.existing(this.city);
  }

  private createPersons(): void {
    this.createMalePerson();
    this.createFemalePerson();
  }

  private createMalePerson(): void {
    this.malePerson = new MalePerson(this);
    this.add.existing(this.malePerson);
    this.malePerson.x = this.city.x - this.city.width * -0.423;
    this.malePerson.y = this.city.y - this.city.height * 0.6098;
  }
  private createFemalePerson(): void {
    this.femalePerson = new FemalePerson(this);
    this.add.existing(this.femalePerson);
    this.femalePerson.x = this.city.x - this.city.width * -0.043;
    this.femalePerson.y = this.city.y - this.city.height * 0.61;
  }

  private createLight(): void {
    this.light = this.make.image({
      x: this.width,
      y: this.height,
      key: Atlases.Welcome.Atlas.Name,
      frame: Atlases.Welcome.Atlas.Frames.Light,
    });
    this.add.existing(this.light);
    this.light.setScale(1, this.height / this.light.height);
    this.light.setOrigin(1);
  }

  private createGlobous(): void {
    this.globous = this.make.image({
      x: this.light.x - this.light.width * 0.5552,
      y: this.light.y - this.light.height * 0.7215,
      key: Atlases.Welcome.Atlas.Name,
      frame: Atlases.Welcome.Atlas.Frames.Globous,
    });
    this.add.existing(this.globous);
  }

  private createStartButton(): void {
    this.startButton = new WelcomeStartButton(this);
    this.startButton.x = this.width - this.startButton.width * 0.65;
    this.startButton.y =
      this.startButton.height * 0.5 + this.startButton.width * 0.125;
  }

  private setListeners(): void {
    this.startButton.on(SpriteButton.CLICK_EVENT, this.onStartClick, this);
  }

  private prepare(): void {
    this.light.setAlpha(0);
    this.globous.setAlpha(0);
    this.logo.y = -this.logo.height;
    this.city.y = this.height + this.city.height;
    this.femalePerson.x = -this.femalePerson.displayWidth * 1.2;
    this.malePerson.x = this.width + this.malePerson.displayWidth * 1.2;
    this.startButton.setScale(0);
  }

  public async startShowingAnimation(): Promise<void> {
    await this.showLogo();
    await this.showCity();
    await this.showPersons();
    await this.showLightAndGlobous();
    await this.startButton.show();
    this.startButton.startHighlightAnimation();
  }

  private async showLogo(): Promise<void> {
    return new Promise<void>(resolve => {
      this.tweens.add({
        targets: this.logo,
        y: this.height * 0.3497,
        delay: 200,
        duration: 600,
        ease: Phaser.Math.Easing.Bounce.Out,
        onComplete: () => {
          resolve();
        },
      });
    });
  }
  private async showCity(): Promise<void> {
    return new Promise<void>(resolve => {
      this.tweens.add({
        targets: this.city,
        y: this.height,
        duration: 600,
        ease: Phaser.Math.Easing.Bounce.Out,
        onComplete: () => {
          resolve();
        },
      });
    });
  }
  private async showLightAndGlobous(): Promise<void> {
    return new Promise<void>(resolve => {
      this.tweens.add({
        targets: [this.light, this.globous],
        alpha: 1,
        duration: 400,
        ease: Phaser.Math.Easing.Expo.InOut,
        onComplete: () => {
          this.tweens.add({
            targets: this.light,
            alpha: 0.4,
            duration: 1500,
            yoyo: true,
            repeat: -1,
          });
          resolve();
        },
      });
    });
  }

  private async showPersons(): Promise<void> {
    return new Promise<void>(resolve => {
      this.tweens.add({
        targets: this.femalePerson,
        x: this.city.x - this.city.width * -0.043,
        duration: 700,
        ease: Phaser.Math.Easing.Back.Out,
      });
      this.tweens.add({
        targets: this.malePerson,
        x: this.city.x - this.city.width * -0.423,
        duration: 700,
        ease: Phaser.Math.Easing.Back.Out,
        onComplete: () => {
          this.femalePerson.startHandsRandomAnimation();
          this.malePerson.startHandsRandomAnimation();
          resolve();
        },
      });
    });
  }

  private async onStartClick(): Promise<void> {
    this.malePerson.startHandShake();
    await this.femalePerson.startHandShake();
    this.events.emit(WelcomeScene.START_THE_GAME_EVENT);
  }
}
