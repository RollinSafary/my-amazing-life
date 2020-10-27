import PlayerCommand from '../PlayerCommand';

export default class SavePersonalityResultsCommand extends PlayerCommand {
  public execute(): void {
    this.proxy.savePersonalityResults(
      this.uiVOProxy.vo.personalityBestOption,
      this.uiVOProxy.vo.personalityChoices,
      this.uiVOProxy.vo.personalityResult,
    );
  }
}
