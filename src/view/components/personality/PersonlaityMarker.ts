import { Fonts, MultiAtlases } from '../../../assets';
import { personalityNumberColors } from '../../../constants/Constants';
import { upperCaseFirstLetter } from '../../../utils/Utils';
import BaseScene from '../../scenes/BaseScene';
import PersonalityScene from '../../scenes/PersonalityScene';
import { ITextStyle } from '../../utils/phaser/PhaserUtils';
import { ExtendedText } from '@candywings/phaser3-i18n-plugin';

export default class PersonalityMarker extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected indexText: Phaser.GameObjects.Text;
  protected label: ExtendedText;

  constructor(protected scene: BaseScene, public colorName: string) {
    super(scene);
    this.createComponents();
    this.scrollFactorX = 0;
    this.scrollFactorY = 0;
    this.prepare();
  }

  public setIndex(index: number): void {
    this.indexText.setText(`${index}`);
    this.indexText.setVisible(true);
  }

  public prepare(): void {
    this.indexText.setText('0');
    this.setAlpha(0);
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createIndexText();
    this.setListeners();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Personality.Atlas.Name,
      frame: (MultiAtlases.Personality.Atlas.Frames as any)[
        `MarkersMarker${upperCaseFirstLetter(this.colorName)}`
      ],
    });
    this.add(this.background);
  }

  protected createIndexText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 46,
      fill: personalityNumberColors[this.colorName],
    };
    this.indexText = this.scene.make.text({
      x: 0,
      y: -this.height * 0.2,
      text: '0',
      style,
    });
    this.indexText.setOrigin(0.5);
    this.add(this.indexText);
  }

  protected setListeners(): void {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_OVER, this.onHover, this);
    this.on(Phaser.Input.Events.POINTER_OUT, this.onOut, this);
    this.on(Phaser.Input.Events.POINTER_DOWN, this.onDown, this);
  }

  protected onHover(): void {
    this.setScale(1.1);
  }

  protected onOut(): void {
    this.setScale(1);
    this.off(Phaser.Input.Events.POINTER_UP, this.onCLick, this);
  }

  protected onDown(): void {
    this.once(Phaser.Input.Events.POINTER_UP, this.onCLick, this);
  }

  protected onCLick(): void {
    this.input.enabled = false;
    this.scene.events.emit(
      PersonalityScene.MARKER_CLICKED_EVENT,
      this.colorName,
    );
  }
}
