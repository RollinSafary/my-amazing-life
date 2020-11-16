import { MultiAtlases } from '../../../assets';
import { ILifeStyleSectionConfig } from '../../../constants/Constants';
import BaseScene from '../../scenes/BaseScene';
import LifeStyleScene from '../../scenes/LifeStyleScene';
import { LifeStylePanel } from './panel/LifeStylePanel';

export default class LifeStyleSection extends Phaser.GameObjects.Container {
  protected icon: Phaser.GameObjects.Image;
  protected panel: LifeStylePanel;
  constructor(
    protected scene: BaseScene,
    public config: ILifeStyleSectionConfig,
  ) {
    super(scene);
    this.createComponents();
  }

  public makeSelected(): void {
    this.input.enabled = true;
  }

  public showPanel(): void {
    this.panel.show();
  }

  public async hidePanel(): Promise<void> {
    return this.panel.hide();
  }

  public makeUnselected(): void {
    this.input.enabled = false;
  }

  protected createComponents(): void {
    this.createIcon();
    this.setSize(this.icon.width, this.icon.height);
    this.createPanel();
    this.setListeners();
  }

  protected createIcon(): void {
    this.icon = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: (MultiAtlases.Lifestyle.Atlas.Frames as any)[
        `SectionsSection${this.config.y}${this.config.x}`
      ],
    });
    this.add(this.icon);
  }

  protected createPanel(): void {
    this.panel = new LifeStylePanel(this.scene, {
      xIndex: this.config.x,
      yIndex: this.config.y,
      color: this.config.color,
    });
    this.scene.add.existing(this.panel);
  }

  protected setListeners(): void {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.on(Phaser.Input.Events.POINTER_OUT, this.onPointerOut, this);
    this.input.dropZone = true;
    this.input.enabled = false;
  }

  protected onPointerDown(): void {
    this.once(Phaser.Input.Events.POINTER_UP, this.onClick, this);
  }
  protected onPointerOut(): void {
    this.off(Phaser.Input.Events.POINTER_UP, this.onClick, this);
  }

  protected onClick(): void {
    this.input.enabled = false;
    this.scene.events.emit(LifeStyleScene.MOVE_TO_SECTION_EVENT);
  }
}
