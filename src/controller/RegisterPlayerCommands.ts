import { SimpleCommand, SyncMacroCommand } from '@candywings/pure-mvc';
import UiVOProxy from '../model/UiVOProxy';
import RegistrationView from '../view/components/login/registration/RegistrationView';
import SignInView from '../view/components/login/signIn/SignInView';
import PlayAsGuestCommand from './player/PlayAsGuestCommand';
import RegisterNewPlayerCommand from './player/RegisterNewPlayerCommand';
import SaveHobbiesResultsCommand from './player/saves/SaveHobbiesResultsCommand';
import SaveLifeStyleResultsCommand from './player/saves/SaveLifeStyleResultsCommand';
import SavePersonalityResultsCommand from './player/saves/SavePersonalityResultsCommand';
import SavePlayerAvatarCommand from './player/saves/SavePlayerAvatarCommand';
import SignInCommand from './player/SignInCommand';

export default class RegisterPlayerCommands extends SyncMacroCommand<
  SimpleCommand
> {
  public execute(): void {
    this.facade.registerCommand(SignInView.SIGN_IN_NOTIFICATION, SignInCommand);
    this.facade.registerCommand(
      RegistrationView.FORM_COMPLETE_NOTIFICATION,
      RegisterNewPlayerCommand,
    );
    this.facade.registerCommand(
      RegistrationView.PLAY_AS_GUEST_NOTIFICATION,
      PlayAsGuestCommand,
    );
    this.facade.registerCommand(
      UiVOProxy.AVATAR_CONFIGURATION_SAVED_NOTIFICATION,
      SavePlayerAvatarCommand,
    );
    this.facade.registerCommand(
      UiVOProxy.LIFE_STYLE_GAME_COMPLETE_NOTIFICATION,
      SaveLifeStyleResultsCommand,
    );
    this.facade.registerCommand(
      UiVOProxy.PERSONALITY_GAME_COMPLETE_NOTIFICATION,
      SavePersonalityResultsCommand,
    );
    this.facade.registerCommand(
      UiVOProxy.HOBBIES_GAME_COMPLETE_NOTIFICATION,
      SaveHobbiesResultsCommand,
    );
    this.facade.registerCommand(
      UiVOProxy.SKILLS_GAME_COMPLETE_NOTIFICATION,
      SaveHobbiesResultsCommand,
    );
  }
}
