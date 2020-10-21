import UiCommand from '../UiCommand';

export default class ResetSkillsOptionsValuesCommand extends UiCommand {
  public execute(notificationName: string): void {
    this.proxy.resetSkills();
  }
}
