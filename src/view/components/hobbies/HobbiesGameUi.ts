import { Fonts, MultiAtlases } from '../../../assets';
import { Translation } from '../../../translations';
import BaseScene from '../../scenes/BaseScene';
import HobbiesScene from '../../scenes/HobbiesScene';
import ISimpleButtonState from '../../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../../utils/simpleButton/SimpleButton';
import HobbiesFuel from './ui/HobbiesFuel';
import HobbiesLives from './ui/HobbiesLives';
import HobbiesRemaining from './ui/HobbiesRemaining';

export default class HobbiesGameUi extends Phaser.GameObjects.Container {
  public fuel: HobbiesFuel;
  public lives: HobbiesLives;
  public remaining: HobbiesRemaining;
  protected helpButton: SimpleButton;

  constructor(
    protected scene: BaseScene,
    protected road: Phaser.GameObjects.TileSprite,
  ) {
    super(scene);
    this.setScrollFactor(0);
    this.createComponents();
    this.setDepth(100);
  }

  protected createComponents(): void {
    this.createFuel();
    this.createRemaining();
    this.createLives();
    this.createHelpButton();
    this.setListeners();
  }

  protected createFuel(): void {
    this.fuel = new HobbiesFuel(this.scene);
    this.add(this.fuel);
    this.fuel.x = this.road.x - this.road.width * 0.55 - this.fuel.width * 0.5;
    this.fuel.y = this.fuel.height * 1.5;
  }

  protected createLives(): void {
    this.lives = new HobbiesLives(this.scene, 5);
    this.add(this.lives);
    this.lives.x = this.road.x + this.road.width * 0.51;
    this.lives.y = this.fuel.y;
  }

  protected createRemaining(): void {
    this.remaining = new HobbiesRemaining(this.scene);
    this.add(this.remaining);
    this.remaining.x = this.scene.width * 0.5;
    this.remaining.y = this.fuel.y;
  }

  protected createHelpButton(): void {
    const textConfig: ISimpleButtonText = {
      text: Translation.HOBBIES_BUTTON_HELP,
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: '#1f4226',
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Hobbies.Atlas.Name,
      frame: MultiAtlases.Hobbies.Atlas.Frames.InterfaceButtonPlay,
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.helpButton = new SimpleButton(this.scene, configs);
    this.add(this.helpButton);
    this.helpButton.setEnabled(true);
    this.helpButton.x = this.lives.x + this.helpButton.width;
    this.helpButton.y = this.lives.y + this.helpButton.height * 1.2;
  }

  protected setListeners(): void {
    this.helpButton.on(Phaser.Input.Events.POINTER_UP, this.onHelpClick, this);
  }

  protected onHelpClick(): void {
    this.scene.events.emit(HobbiesScene.HELP_CLICKED_EVENT);
  }
}
