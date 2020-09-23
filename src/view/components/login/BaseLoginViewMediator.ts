import { Mediator } from '@candywings/pure-mvc';
import BaseLoginView from './BaseLoginView';

export default abstract class BaseLoginViewMediator<
  T extends BaseLoginView
> extends Mediator<T> {
  constructor(name: string) {
    super(name, null);
  }

  protected abstract setView(): void;
  protected abstract setViewComponentListeners(): void;
}
