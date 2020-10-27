import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import BaseScene from '../../../scenes/BaseScene';
import HobbiesScene from '../../../scenes/HobbiesScene';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';

export default class HobbiesFuel extends Phaser.GameObjects.Container {
  protected bar: Phaser.GameObjects.TileSprite;
  protected label: ExtendedText;
  protected progress: number = 1;
  protected tween: Phaser.Tweens.Tween;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
  }

  public pause(): void {
    this.tween && this.tween.pause();
  }
  public resume(): void {
    this.tween && this.tween.resume();
  }

  public start(): void {
    this.stop();
    this.tween = this.scene.tweens.add({
      targets: this,
      progress: 0,
      duration: 20000,
      onUpdate: () => {
        this.bar.width = this.frame.width * this.progress;
      },
      onComplete: () => {
        this.scene.events.emit(HobbiesScene.FUEL_OVER_EVENT);
      },
    });
  }

  public stop(): void {
    this.scene.tweens.killTweensOf(this);
  }

  public restart(): void {
    this.stop();
    this.progress = 1;
    this.bar.width = this.frame.width * this.progress;
    this.start();
  }

  protected createComponents(): void {
    this.createBar();
    this.setSize(this.bar.width, this.bar.height);
    this.createLabel();
  }

  protected createBar(): void {
    this.bar = this.scene.make.tileSprite({
      x: 0,
      y: 0,
      key: MultiAtlases.Hobbies.Atlas.Name,
      frame: MultiAtlases.Hobbies.Atlas.Frames.InterfaceFuel,
      width: this.frame.width,
      height: this.frame.height,
    });
    this.add(this.bar);
    this.bar.x = -this.bar.width * 0.5;
    this.bar.setOrigin(0, 0.5);
  }

  protected createLabel(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
    };
    this.label = this.scene.make.extText({
      x: -this.width * 0.6,
      y: 0,
      text: Translation.HOBBIES_UI_FUEL,
      style,
    });
    this.add(this.label);
    this.label.setOrigin(1, 0.5);
  }

  get frame(): Phaser.Textures.Frame {
    return this.scene.textures.getFrame(
      MultiAtlases.Hobbies.Atlas.Name,
      MultiAtlases.Hobbies.Atlas.Frames.InterfaceFuel,
    );
  }
}
