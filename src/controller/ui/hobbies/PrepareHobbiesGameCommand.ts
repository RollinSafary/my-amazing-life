import UiCommand from '../UiCommand';

export default class PrepareHobbiesGameCommand extends UiCommand {
  public execute(): void {
    this.proxy.prepareHobbiesGameData();
  }
}
