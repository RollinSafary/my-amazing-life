import { SimpleCommand, SyncMacroCommand } from '@candywings/pure-mvc';
import RegistrationView from '../view/components/login/registration/RegistrationView';
import SignInView from '../view/components/login/signIn/SignInView';
import PlayAsGuestCommand from './player/PlayAsGuestCommand';
import RegisterNewPlayerCommand from './player/RegisterNewPlayerCommand';
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
  }
}
