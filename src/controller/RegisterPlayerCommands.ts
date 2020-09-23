import { SimpleCommand, SyncMacroCommand } from '@candywings/pure-mvc';
import SignInView from '../view/components/login/signIn/SignInView';
import CheckAndRegisterPlayerVOProxyCommand from './player/CheckAndRegisterPlayerVOProxyCommand';

export default class RegisterPlayerCommands extends SyncMacroCommand<
  SimpleCommand
> {
  public execute(): void {
    console.warn('RegisterPlayerCommands');
    this.facade.registerCommand(
      SignInView.EMAIL_ENTERED_NOTIFICATION,
      CheckAndRegisterPlayerVOProxyCommand,
    );
  }
}
