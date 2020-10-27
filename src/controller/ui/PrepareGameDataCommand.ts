import { LobbyAction } from '../../view/scenes/LobbyScene';
import UiCommand from './UiCommand';

export default class PrepareGameDataCommand extends UiCommand {
  public execute(notificationName: string, game: LobbyAction): void {
    switch (game) {
      case LobbyAction.LIFESTYLE:
        this.proxy.resetLifeStyle();
        break;
      case LobbyAction.PERSONALITY:
        this.proxy.resetPersonality();
        break;
      case LobbyAction.HOBBIES:
        this.proxy.resetHobbies();
        break;
      case LobbyAction.SKILLS:
        this.proxy.resetSkills();
        break;
      default:
        break;
    }
  }
}
