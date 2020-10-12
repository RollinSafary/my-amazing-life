import UiCommand from '../UiCommand';

export default class SaveLifeStyleChoiceCommand extends UiCommand {
  public execute(): void {
    this.proxy.confirmLifeStyleChoice();
  }
}
