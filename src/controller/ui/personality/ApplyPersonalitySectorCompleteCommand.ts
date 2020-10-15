import UiCommand from '../UiCommand';

export default class ApplyPersonalitySectorCompleteCommand extends UiCommand {
  public execute(): void {
    this.proxy.applyPersonalitySectorComplete();
  }
}
