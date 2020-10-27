import { SimpleCommand } from '@candywings/pure-mvc';
import PlayerVOProxy from '../../model/PlayerVOProxy';
import UiVOProxy from '../../model/UiVOProxy';

export default abstract class PlayerCommand extends SimpleCommand {
  get proxy(): PlayerVOProxy {
    return this.facade.retrieveProxy(PlayerVOProxy.NAME);
  }

  get uiVOProxy(): UiVOProxy {
    return this.facade.retrieveProxy(UiVOProxy.NAME);
  }
}
