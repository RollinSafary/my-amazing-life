import { IPlayerRegistrationData } from '../../model/vo/PlayerVO';
import { setUserDataAsync } from '../../view/utils/FirebaseUtils';
import PlayerCommand from './PlayerCommand';

export default class RegisterGuestPlayerCommand extends PlayerCommand {
  public execute(
    notificationName: string,
    data: IPlayerRegistrationData,
  ): void {
    this.proxy.applyGuestPlayerRegistration(data);
    this.proxy.saveResults();
    setUserDataAsync(this.proxy.vo);
  }
}
