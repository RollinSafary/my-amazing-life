import PlayerVOProxy from '../../model/PlayerVOProxy';
import UiCommand from './UiCommand';

export default class RetrieveAvatarConfigFromFirebaseCommand extends UiCommand {
  public execute(): void {
    const playerVOProxy: PlayerVOProxy = this.facade.retrieveProxy(
      PlayerVOProxy.NAME,
    );
    this.proxy.retrieveAvatarConfiguration(playerVOProxy.vo.email);
  }
}
