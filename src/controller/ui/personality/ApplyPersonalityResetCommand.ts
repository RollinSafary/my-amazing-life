import UiCommand from '../UiCommand';

export default class ApplyPersonalityResetCommand extends UiCommand {
  public execute(): void {
    this.proxy.applyPersonalityReset();
  }
}
