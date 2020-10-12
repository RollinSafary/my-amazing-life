import { MultiAtlases } from '../../../../assets';
import BaseScene from '../../../scenes/BaseScene';
import { LifeStylePanelItem } from './LifeStylePanelItem';

export class LifeStylePanel extends Phaser.GameObjects.Container {
  public static CHOSE_EVENT: string = 'chose';
  protected items: LifeStylePanelItem[];

  constructor(
    protected scene: BaseScene,
    protected config: ILifeStylePanelConfig,
  ) {
    super(scene);
    this.createComponents();
  }

  public async show(): Promise<void> {
    return new Promise<void>(resolve => {
      for (let i: number = 0; i < this.items.length; i++) {
        const item = this.items[i];
        this.scene.children.bringToTop(this);
        this.scene.tweens.add({
          targets: item,
          y: this.scene.height - this.items.getFirst().height / 2,
          duration: 500,
          delay: i * 50,
          ease: Phaser.Math.Easing.Back.Out,
          onComplete: () => {
            item.input.enabled = true;
            item === this.items.getLast() && resolve();
          },
        });
      }
    });
  }

  public async hide(): Promise<void> {
    return new Promise<void>(resolve => {
      for (let i: number = 0; i < this.items.length; i++) {
        const item = this.items[i];
        item.input.enabled = false;
        this.scene.tweens.killTweensOf(this.items);
        this.scene.tweens.add({
          targets: item,
          y: this.scene.height + this.items.getFirst().height,
          duration: 500,
          delay: i * 50,
          ease: Phaser.Math.Easing.Back.In,
          onComplete: () => {
            item === this.items.getLast() && resolve();
          },
        });
      }
    });
  }

  protected createComponents(): void {
    this.createItems();
  }

  protected createItems(): void {
    this.items = [];
    const frame: Phaser.Textures.Frame = this.scene.textures.getFrame(
      MultiAtlases.Lifestyle.Atlas.Name,
      MultiAtlases.Lifestyle.Atlas.Frames.PanelBorder,
    );
    const totalWidth: number = frame.width * 4;
    const scale: number =
      totalWidth > this.scene.width ? this.scene.width / totalWidth : 1;
    const totalDisplayWidth: number = totalWidth * scale;
    const gap: number = 8;
    const difX: number = (this.scene.width - totalDisplayWidth) / 2 - 2 * gap;
    for (let i: number = 0; i < 4; i++) {
      const item: LifeStylePanelItem = new LifeStylePanelItem(
        this.scene,
        this.config,
        i,
      );
      this.items.push(item);
      this.add(item);
      item.setScale(scale);
      item.x = difX + item.displayWidth / 2 + i * (item.displayWidth + gap);
      item.y = this.scene.height + item.height;
      item.input.enabled = false;
    }
  }
}

export interface ILifeStylePanelConfig {
  color: number;
  xIndex: number;
  yIndex: number;
}
