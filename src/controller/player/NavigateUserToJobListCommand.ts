import PlayerCommand from './PlayerCommand';

export default class NavigateUserToJobListCommand extends PlayerCommand {
  public execute(): void {
    const email: string = this.proxy.vo.user.email;
    const url: string = `https://myamazinglifestaging.org/#/user/results?email=${email}`;
    window.location.href = url;
  }
}
