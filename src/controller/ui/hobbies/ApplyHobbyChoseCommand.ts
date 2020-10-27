import UiCommand from '../UiCommand';

export default class ApplyHobbyChoseCommand extends UiCommand {
  public execute(notificationName: string, frameName: string): void {
    this.proxy.applyHobbyChoice(frameName);
  }
}
