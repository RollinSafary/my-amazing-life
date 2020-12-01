import { Guard } from '@candywings/pure-mvc';
import PlayerVOProxy from '../../model/PlayerVOProxy';

export default class IsPlayerRegisteredGuard extends Guard {
  public approve(): boolean {
    const proxy: PlayerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME);
    return !!proxy.vo.user;
  }
}
