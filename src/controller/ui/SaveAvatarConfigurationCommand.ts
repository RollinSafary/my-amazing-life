import UiCommand from './UiCommand';

export default class SaveAvatarConfigurationCommand extends UiCommand {
  public execute(): void {
    this.proxy.saveAvatarConfiguration();
  }
}
