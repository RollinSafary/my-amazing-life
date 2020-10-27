import PlayerVOProxy from '../../model/PlayerVOProxy';
import UiCommand from './UiCommand';

export default class SetAvatarConfigCommand extends UiCommand {
  public execute(): void {
    const playerVOProxy: PlayerVOProxy = this.facade.retrieveProxy(
      PlayerVOProxy.NAME,
    );
    this.proxy.setAvatarConfig(playerVOProxy.vo.avatar);
  }
}
