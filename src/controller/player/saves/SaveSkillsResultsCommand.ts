import PlayerCommand from '../PlayerCommand';

export default class SaveSkillsResultsCommand extends PlayerCommand {
  public execute(): void {
    this.proxy.saveSkillsResults(this.uiVOProxy.vo.skillsValues);
  }
}
