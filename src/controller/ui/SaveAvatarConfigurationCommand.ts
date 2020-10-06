import PlayerVOProxy from '../../model/PlayerVOProxy';
import UiCommand from './UiCommand';

export default class SaveAvatarConfigurationCommand extends UiCommand {
  public execute(): void {
    const playerVOProxy: PlayerVOProxy = this.facade.retrieveProxy(
      PlayerVOProxy.NAME,
    );
    this.proxy.saveAvatarConfiguration(playerVOProxy.vo.email);
  }
}
