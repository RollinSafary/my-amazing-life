import { Proxy } from '@candywings/pure-mvc';
import PlayerVO from './vo/PlayerVO';

export default class PlayerVOProxy extends Proxy<PlayerVO> {
  public static NAME: string = 'PlayerVOProxy';

  constructor(data: PlayerVO) {
    super(PlayerVOProxy.NAME, data);
  }
}
