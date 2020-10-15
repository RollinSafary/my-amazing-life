import UiCommand from '../UiCommand';

export default class ApplyPersonalityMarkerChoiceCommand extends UiCommand {
  public execute(
    notificationName: string,
    sectorIndex: number,
    colorName: string,
  ): void {
    this.proxy.applyPersonalityMarkerChoice(sectorIndex, colorName);
  }
}
