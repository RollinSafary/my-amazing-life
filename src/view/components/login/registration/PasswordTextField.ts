import BaseScene from '../../../scenes/BaseScene';
import RegisterTextField from './RegistrationTextField';

export default class PasswordTextField extends RegisterTextField {
  constructor(scene: BaseScene, placeHolder: string) {
    super(scene, 'password', placeHolder);
  }
  protected onInput(): void {
    let asterisks: string = '';
    for (let i: number = 0; i < this.getTextValue().length; i++) {
      asterisks += '*';
    }
    this.text.setText(asterisks);
  }
}
