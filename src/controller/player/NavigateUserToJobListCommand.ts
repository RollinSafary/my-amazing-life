import PlayerCommand from './PlayerCommand';

export default class NavigateUserToJobListCommand extends PlayerCommand {
  public execute(): void {
    const email: string = this.proxy.vo.user.email;
    console.warn(email);
  }
}
