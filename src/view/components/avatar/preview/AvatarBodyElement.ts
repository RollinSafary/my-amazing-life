import { Atlases } from '../../../../assets';
import BaseScene from '../../../scenes/BaseScene';

export class AvatarBodyElement extends Phaser.GameObjects.Container {
  protected bodyPart: Phaser.GameObjects.Image;
  protected attachments: IAttachmentConfig[];
  public gender: string = 'male';

  constructor(protected scene: BaseScene, protected frameName: string) {
    super(scene);
    this.attachments = [];
    this.createComponents();
  }

  public updateBodySkin(index: number): void {
    this.bodyPart.setTexture(
      Atlases.Avatar.Atlas.Name,
      `${this.frameName}-${index}`,
    );
  }

  public updateGender(gender: string = this.gender): void {
    this.gender = gender;
    this.updateAttachmentsFramesArray();
  }

  public updateAttachment(key: string, index: number = -1): void {
    const targetAttachmentConfig: IAttachmentConfig = this.attachments.find(
      (config: IAttachmentConfig) => config.key === key,
    );
    targetAttachmentConfig.index = index;
    const frameByDefault: string = `${targetAttachmentConfig.unIndexedName}-default`;
    const frameByIndex: string = `${targetAttachmentConfig.unIndexedName}-${targetAttachmentConfig.index}`;
    const targetFrame: string =
      !!index && index === -1 ? frameByDefault : frameByIndex;
    const hasFrame: boolean = targetAttachmentConfig.frameNames.includes(
      targetFrame,
    );
    hasFrame && targetAttachmentConfig.image.setFrame(targetFrame);
    targetAttachmentConfig.image.setVisible(hasFrame);
  }

  public addAttachment(key: string): void {
    let attachmentConfig: IAttachmentConfig = {
      key,
      unIndexedName: `${this.gender}/${key}`,
      image: null,
      index: -1,
      frameNames: [],
    };
    const texture: Phaser.Textures.Texture = this.scene.textures.get(
      Atlases.Avatar.Atlas.Name,
    );
    const frameNames: string[] = texture.getFrameNames();
    attachmentConfig.frameNames = frameNames.filter((frameName: string) =>
      frameName.includes(attachmentConfig.unIndexedName),
    );
    const defaultFrame: string = `${attachmentConfig.unIndexedName}-default`;
    const defaultFrameExists: boolean = frameNames.includes(defaultFrame);

    const attachment: Phaser.GameObjects.Image = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Avatar.Atlas.Name,
      frame: defaultFrameExists ? defaultFrame : attachmentConfig.frameNames[0],
    });

    attachment.setVisible(defaultFrameExists);
    attachmentConfig.image = attachment;
    this.add(attachment);
    this.attachments.push(attachmentConfig);
  }

  protected createComponents(): void {
    this.createBodyPart();
    this.setSize(this.bodyPart.width, this.bodyPart.height);
  }

  protected createBodyPart(): void {
    this.bodyPart = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Avatar.Atlas.Name,
      frame: `${this.frameName}-0`,
    });
    this.add(this.bodyPart);
  }

  protected updateAttachmentsFramesArray(): void {
    const texture: Phaser.Textures.Texture = this.scene.textures.get(
      Atlases.Avatar.Atlas.Name,
    );
    for (const attachmentConfig of this.attachments) {
      attachmentConfig.unIndexedName = `${this.gender}/${attachmentConfig.key}`;
      const frameNames: string[] = texture.getFrameNames();
      attachmentConfig.frameNames = frameNames.filter((frameName: string) =>
        frameName.includes(attachmentConfig.unIndexedName),
      );
      // this.updateAttachment(attachmentConfig.key, attachmentConfig.index);
    }
  }
}

export interface IAvatarBodyElementConfig {
  frameName: string;
}

interface IAttachmentConfig {
  image: Phaser.GameObjects.Image;
  key: string;
  index: number;
  unIndexedName: string;
  frameNames: string[];
}
