import { ILifeStylePanelConfig } from '../../../view/components/lifestyle/panel/LifeStylePanel';
import UiCommand from '../UiCommand';

export default class SetLifeStyleChoseCommand extends UiCommand {
  public execute(
    notificationName: string,
    config: ILifeStylePanelConfig,
    index: number,
    value: number,
  ): void {
    this.proxy.setLifeStyleChoice(config, index, value);
  }
}
