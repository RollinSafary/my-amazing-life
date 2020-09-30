import { SimpleCommand } from '@candywings/pure-mvc';
import UiVOProxy from '../../model/UiVOProxy';

export default class RegisterUiVOProxyCommand extends SimpleCommand {
  public execute(): void {
    this.facade.registerProxy(new UiVOProxy());
  }
}
