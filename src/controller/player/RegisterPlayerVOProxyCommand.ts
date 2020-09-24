import { SimpleCommand } from '@candywings/pure-mvc';
import PlayerVOProxy from '../../model/PlayerVOProxy';
import { PlayerVO } from '../../model/vo/PlayerVO';

export default class RegisterPlayerVOProxyCommand extends SimpleCommand {
  public execute(notificationName: string, vo: PlayerVO): void {
    this.facade.registerProxy(new PlayerVOProxy(vo));
  }
}
