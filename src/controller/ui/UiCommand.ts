import { SimpleCommand } from '@candywings/pure-mvc';
import UiVOProxy from '../../model/UiVOProxy';

export default abstract class UiCommand extends SimpleCommand {
  get proxy(): UiVOProxy {
    return this.facade.retrieveProxy(UiVOProxy.NAME);
  }
}
