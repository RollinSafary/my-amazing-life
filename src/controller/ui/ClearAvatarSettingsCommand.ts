import UiCommand from './UiCommand';

export default class ClearAvatarSettingsCommand extends UiCommand {
  public execute(): void {
    this.proxy.clearAvatarConfiguration();
  }
}
