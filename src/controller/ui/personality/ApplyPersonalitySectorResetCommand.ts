import UiCommand from '../UiCommand';

export default class ApplyPersonalitySectorResetCommand extends UiCommand {
  public execute(): void {
    this.proxy.applyPersonalitySectorReset();
  }
}
