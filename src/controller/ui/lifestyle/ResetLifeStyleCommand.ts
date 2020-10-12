import UiCommand from '../UiCommand';

export default class ResetLifeStyleCommand extends UiCommand {
  public execute(): void {
    this.proxy.resetLifeStyle();
  }
}
