import UiCommand from '../UiCommand';

export default class ApplySkillsOptionValueCommand extends UiCommand {
  public execute(notificationName: string, name: string, value: number): void {
    this.proxy.setSkillsOptionValue(name, value);
  }
}
