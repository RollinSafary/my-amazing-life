import { lifeStyleSections } from '../../constants/Constants';
import { IAvatarConfig } from '../../model/vo/UiVo';
import LifeStyleBackground from '../components/lifestyle/LifeStyleBackground';
import LifeStyleCenter from '../components/lifestyle/LifeStyleCenter';
import LifeStyleSection from '../components/lifestyle/LifeStyleSection';
import LifeStyleUser from '../components/lifestyle/LifeStyleUser';
import LifeStyleWheel from '../components/lifestyle/LifeStyleWheel';
import { IPosition } from '../utils/phaser/PhaserUtils';
import BaseScene from './BaseScene';

export default class LifeStyleScene extends BaseScene {
  public static NAME: string = 'LifeStyleScene';

  protected background: LifeStyleBackground;
  protected center: LifeStyleCenter;
  protected sections: LifeStyleSection[];
  protected player: LifeStyleUser;

  constructor() {
    super(LifeStyleScene.NAME);
  }

  public create(): void {
    this.createBackground();
    this.createCenter();
    this.createSections();
    this.setListeners();
  }

  public createPlayer(config: IAvatarConfig): void {
    this.player = new LifeStyleUser(this, config);
    this.add.existing(this.player);
    const position: IPosition = this.background.getCeilPosition(0, 0);
    this.player.setPosition(position.x, position.y);
  }

  protected createBackground(): void {
    this.background = new LifeStyleBackground(this);
    this.add.existing(this.background);
  }

  protected createCenter(): void {
    const start = this.background.getCeilPosition(1, 1);
    const end = this.background.getCeilPosition(6, 3);
    const width: number = end.x - start.x;
    const dif: number = width * 0.05;
    const height: number = end.y - start.y;
    this.center = new LifeStyleCenter(this, width - dif, height - dif);
    this.center.x = this.width / 2;
    this.center.y = this.height / 2;
    this.add.existing(this.center);
  }

  protected createSections(): void {
    this.sections = [];
    for (const positionIndex of lifeStyleSections) {
      const section: LifeStyleSection = new LifeStyleSection(
        this,
        positionIndex.x,
        positionIndex.y,
      );
      this.add.existing(section);
      this.sections.push(section);
      const position: IPosition = this.background.getCeilPosition(
        positionIndex.x,
        positionIndex.y,
      );
      section.x = position.x;
      section.y = position.y;
    }
  }

  protected setListeners(): void {
    this.center.on(LifeStyleWheel.ROLLED_EVENT, this.onWheelRoll, this);
  }

  protected onWheelRoll(index: number): void {
    const position: IPosition = lifeStyleSections[index];
    const targetSection = this.sections.find(
      (section: LifeStyleSection) =>
        section.xIndex === position.x && section.yIndex === position.y,
    );
    this.tweens.killTweensOf(this.sections);
    this.tweens.add({
      targets: targetSection,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 200,
      yoyo: true,
      repeat: -1,
      repeatDelay: 1000,
    });
  }
}
