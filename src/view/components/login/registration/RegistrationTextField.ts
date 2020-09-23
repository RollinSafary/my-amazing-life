import { Atlases, Fonts } from '../../../../assets';
import BaseScene from '../../../scenes/BaseScene';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';
import BaseTextField from '../../../utils/textField/BaseTextField';

export default class RegisterTextField extends BaseTextField {
  constructor(
    scene: BaseScene,
    protected inputType: string,
    protected placeHolder: string,
  ) {
    super(scene);
  }

  protected createInputText(): void {
    super.createInputText();
    this.inputDOM.type = this.inputType;
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.Field,
    });
    this.add(this.background);
  }
  protected createText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 20,
      fill: '#757575',
    };
    this.text = this.scene.make.text({
      x: 0,
      y: 0,
      text: this.scene.i18n.translate(this.placeHolder, {}),
      style,
    });
    this.text.setOrigin(0, 0.5);
    this.add(this.text);
  }
}
