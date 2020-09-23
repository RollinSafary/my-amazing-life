import { SimpleCommand, SyncMacroCommand } from '@candywings/pure-mvc';
import RegisterPlayerCommands from './RegisterPlayerCommands';

export default class StartupCommand extends SyncMacroCommand<SimpleCommand> {
  public initializeMacroCommand(): void {
    this.addSubCommand(RegisterPlayerCommands);
  }
}
