import IsPlayerRegisteredGuard from '../../guards/player/IsPlayerRegisteredGuard';
import PlayerVOProxy from '../../model/PlayerVOProxy';
import UiVOProxy from '../../model/UiVOProxy';
import UiCommand from './UiCommand';

export default class SaveAvatarConfigurationCommand extends UiCommand {
  public prepare(): void {
    this.addGuards(IsPlayerRegisteredGuard);
  }

  public execute(): void {
    const playerVOProxy: PlayerVOProxy = this.facade.retrieveProxy(
      PlayerVOProxy.NAME,
    );
    this.proxy.saveAvatarConfiguration(playerVOProxy.vo.user.email);
  }

  public onAllGuardsDenied(): void {
    this.sendNotification(UiVOProxy.AVATAR_CONFIGURATION_SAVED_NOTIFICATION);
  }
}
