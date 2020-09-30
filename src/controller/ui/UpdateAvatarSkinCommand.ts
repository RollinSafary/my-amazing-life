import UiCommand from './UiCommand';

export default class UpdateAvatarSkinCommand extends UiCommand {
  public execute(
    notificationName: string,
    key: string,
    value: number | string,
  ): void {
    this.proxy.updateAvatarConfiguration(key, value);
  }
}
