import { AsyncMacroCommand, SimpleCommand } from '@candywings/pure-mvc';

export default class PlayAsGuestCommand extends AsyncMacroCommand<
  SimpleCommand
> {
  public async execute(): Promise<void> {
    console.warn('PlayAsGuestCommand');
  }
}
