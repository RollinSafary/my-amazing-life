import { Fonts, Images } from '../../../assets';
import BaseScene from '../../scenes/BaseScene';
import PersonalityScene from '../../scenes/PersonalityScene';
import {
  ITextStyle,
  loopRunnable,
  removeRunnable,
} from '../../utils/phaser/PhaserUtils';

export default class PersonalityTimer extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected timerText: Phaser.GameObjects.Text;
  protected runnable: Phaser.Time.TimerEvent;
  protected duration: number = 30;
  protected currentDuration: number;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
  }

  public start(duration: number = this.duration): void {
    this.timerText.setVisible(true);
    this.currentDuration = duration;
    this.updateTimer();
    this.runnable = loopRunnable(this.scene, 1000, this.onTick, this);
  }

  public stop(): void {
    this.x = this.scene.cameras.main.scrollX + this.x;
    this.y = this.scene.cameras.main.scrollY + this.y;
    this.scrollFactorX = 1;
    this.scrollFactorY = 1;
    removeRunnable(this.runnable);
  }

  protected updateTimer(value: number = this.currentDuration): void {
    this.timerText.setText(`0:${value}`);
  }

  protected onTick(): void {
    if (!this.currentDuration) {
      removeRunnable(this.runnable);
      this.scene.events.emit(PersonalityScene.TIMER_COMPLETE_EVENT);
      return;
    }
    this.currentDuration--;
    this.updateTimer();
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.displayWidth, this.background.displayHeight);
    this.createTimerText();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: Images.WhitePixel.Name,
    });
    this.add(this.background);
    this.background.setTint(0x000000);
    this.background.setScale(175, 65);
  }

  protected createTimerText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 32,
      fill: '#ffffff',
    };
    this.timerText = this.scene.make.text({
      x: 0,
      y: 0,
      text: `0:${this.duration}`,
      style,
    });
    this.timerText.setOrigin(0.5);
    this.add(this.timerText);
    this.timerText.setVisible(false);
  }
}
