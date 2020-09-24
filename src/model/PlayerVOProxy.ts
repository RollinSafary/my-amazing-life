import { Proxy } from '@candywings/pure-mvc';
import { PlayerVO } from './vo/PlayerVO';

export default class PlayerVOProxy extends Proxy<PlayerVO> {
  public static NAME: string = 'PlayerVOProxy';
  public static INITIALIZE_COMPLETE_NOTIFICATION: string = `${PlayerVOProxy.NAME}InitializeCompleteNotification`;

  constructor(data: PlayerVO) {
    super(PlayerVOProxy.NAME, data);
  }

  public onRegister(): void {
    this.sendNotification(PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION);
  }
}
