import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import BaseScene from '../../../scenes/BaseScene';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';

export default class HobbiesLives extends Phaser.GameObjects.Container {
  protected lives: Phaser.GameObjects.Image[];
  protected label: ExtendedText;
  constructor(protected scene: BaseScene, public livesCount: number) {
    super(scene);
    this.createComponents();
  }

  public decreaseLife(): void {
    const life = this.visibleLives.getLast();
    life && life.setVisible(false);
    this.livesCount--;
  }

  protected createComponents(): void {
    this.createLabel();
    this.setSize(this.label.width, this.label.height);
    this.createLives();
  }

  protected createLabel(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
    };
    this.label = this.scene.make.extText({
      x: 0,
      y: 0,
      text: Translation.HOBBIES_UI_LIFE,
      style,
    });
    this.add(this.label);
    this.label.setOrigin(0, 0.5);
  }

  protected createLives(): void {
    this.lives = [];
    for (let i: number = 0; i < this.livesCount; i++) {
      const previousLife: Phaser.GameObjects.Image = this.lives[i - 1];
      const x: number = !!previousLife
        ? previousLife.x + previousLife.width * 0.5
        : this.label.x + this.label.width * 1;
      const life: Phaser.GameObjects.Image = this.scene.make.image({
        x,
        y: 0,
        key: MultiAtlases.Hobbies.Atlas.Name,
        frame: MultiAtlases.Hobbies.Atlas.Frames.InterfaceLife,
      });
      life.x += life.width * 0.6;
      this.add(life);
      this.lives.push(life);
    }
  }

  get visibleLives(): Phaser.GameObjects.Image[] {
    return this.lives.filter((live: Phaser.GameObjects.Image) => live.visible);
  }

  get availableLivesCount(): number {
    return this.visibleLives.length;
  }
}
