import PlayerCommand from '../PlayerCommand';

export default class SavePlayerAvatarCommand extends PlayerCommand {
  public execute(): void {
    this.proxy.setAvatar(this.uiVOProxy.vo.avatar);
  }
}
