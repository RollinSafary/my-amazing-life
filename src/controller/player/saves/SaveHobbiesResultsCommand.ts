import PlayerCommand from '../PlayerCommand';

export default class SaveHobbiesResultsCommand extends PlayerCommand {
  public execute(): void {
    this.proxy.saveHobbiesResults(
      this.uiVOProxy.vo.personalityBestOption,
      this.uiVOProxy.vo.hobbiesClusters,
      this.uiVOProxy.vo.hobbiesResults,
      this.uiVOProxy.vo.hobbiesClusterChoices,
    );
  }
}
