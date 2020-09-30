import { NinePatch } from '@koreez/phaser3-ninepatch';
import { Atlases } from '../../../assets';
import AvatarScene from '../../scenes/AvatarScene';
import BaseScene from '../../scenes/BaseScene';
import { getScene } from '../../utils/phaser/PhaserUtils';
import AvatarSkinButton from './skins/AvatarSkinButton';

export default class AvatarSkins extends Phaser.GameObjects.Container {
  public static NAME: string = 'AvatarSkins';
  public static SKIN_CLICKED_EVENT: string = 'skinClicked';
  public static SKIN_CLICKED_NOTIFICATION: string = `${AvatarSkins.NAME}SkinClickedNotification`;

  protected scene: BaseScene;
  protected background: NinePatch;
  protected skins: AvatarSkinButton[][];
  constructor() {
    super(getScene(AvatarScene.NAME));
    this.scene.add.existing(this);
    this.skins = [];
    this.createComponents();
  }

  public updateGender(gender: string): void {
    for (const line of this.skins) {
      for (const button of line) {
        button.skinName !== 'color' && button.updateGender(gender);
      }
    }
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.applyPositioning();
    this.createSkinsLine('color', null);
    this.createSkinsLine('hair', 'male');
    this.createSkinsLine('face', 'male');
    this.createSkinsLine('shirt', 'male');
    this.createSkinsLine('breeches', 'male');
    this.setAvatarSkinButtonsPositions();
  }

  protected createBackground(): void {
    this.background = this.scene.make.ninePatch({
      x: 0,
      y: 0,
      key: Atlases.Avatar.Atlas.Name,
      frame: Atlases.Avatar.Atlas.Frames.Frame,
      height: this.scene.height * 0.92,
      width: this.scene.width * 0.39,
    });
    this.add(this.background);
  }

  protected createSkinsLine(skinName: string, gender: string): void {
    const line: AvatarSkinButton[] = [];
    for (let i: number = 0; i < 4; i++) {
      const button: AvatarSkinButton = new AvatarSkinButton(
        this.scene,
        skinName,
        i,
        gender,
      );
      this.add(button);
      line.push(button);
    }
    this.skins.push(line);
  }

  protected setAvatarSkinButtonsPositions(): void {
    const verticalLine: Phaser.Geom.Line = new Phaser.Geom.Line(
      0,
      -this.height * 0.55,
      0,
      this.height * 0.55,
    );
    const verticalPoints: Phaser.Geom.Point[] = verticalLine.getPoints(
      this.skins.length + 1,
    );
    verticalPoints.shift();
    const horizontalLine: Phaser.Geom.Line = new Phaser.Geom.Line(
      -this.width * 0.6,
      0,
      this.width * 0.6,
      0,
    );
    const horizontalPoints: Phaser.Geom.Point[] = horizontalLine.getPoints(
      this.skins[0].length + 1,
    );
    horizontalPoints.shift();
    for (let i: number = 0; i < this.skins.length; i++) {
      const line: AvatarSkinButton[] = this.skins[i];
      for (let ii: number = 0; ii < line.length; ii++) {
        const button: AvatarSkinButton = line[ii];
        button.x = horizontalPoints[ii].x;
        button.y = verticalPoints[i].y;
      }
    }
  }

  protected applyPositioning(): void {
    const difY: number = (this.scene.height - this.height) / 2;
    this.x = this.scene.width * 0.34 + this.width / 2 + 2 * difY;
    this.y = this.height / 2 + difY;
  }
}
