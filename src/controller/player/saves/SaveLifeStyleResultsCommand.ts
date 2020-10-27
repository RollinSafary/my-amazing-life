import PlayerCommand from '../PlayerCommand';

export default class SaveLifeStyleResultsCommand extends PlayerCommand {
  public execute(): void {
    this.proxy.saveLifeStyleResults(
      this.uiVOProxy.vo.lifeStyleChoices,
      this.uiVOProxy.vo.lifeStyleTotal,
    );
  }
}
