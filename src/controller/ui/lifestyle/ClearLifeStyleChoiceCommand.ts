import UiCommand from '../UiCommand';

export default class ClearLifeStyleChoiceCommand extends UiCommand {
  public execute(): void {
    this.proxy.clearLifeStyleChoice();
  }
}
