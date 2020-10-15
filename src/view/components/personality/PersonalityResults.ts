import { MultiAtlases } from '../../../assets';
import { gameConfig } from '../../../constants/GameConfig';
import { IPersonalityChoice, PersonalityChoice } from '../../../model/vo/UiVO';
import { upperCaseFirstLetter } from '../../../utils/Utils';
import BaseScene from '../../scenes/BaseScene';
import { PersonalityResult } from './PersonalityResult';
import PersonalityResultMessage from './PersonalityResultMessage';

export class PersonalityResults extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected results: PersonalityResult[];
  protected message: PersonalityResultMessage;

  constructor(
    protected scene: BaseScene,
    protected config: IPersonalityResultsConfig,
  ) {
    super(scene);
    this.createComponents();
  }

  public async startAnimation(): Promise<void> {
    for (const result of this.results) {
      await result.animateProgress();
    }
    await this.message.show();
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createResults();
    this.createResultMessage();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: gameConfig.designWidth / 2,
      y: gameConfig.designHeight / 2,
      key: MultiAtlases.Personality.Atlas.Name,
      frame: (MultiAtlases.Personality.Atlas.Frames as any)[
        `ResultsBackground${upperCaseFirstLetter(this.config.option)}`
      ],
    });
    this.add(this.background);
  }
  protected createResults(): void {
    this.results = [];
    const colorNames: string[] = [
      'purple',
      'orange',
      'cyan',
      'green',
      'blue',
      'red',
    ];
    const colors: number[] = [
      0x585674,
      0x976332,
      0x585674,
      0x597263,
      0x4a657f,
      0x90384a,
    ];
    for (let i: number = 0; i < colors.length; i++) {
      const result: PersonalityResult = new PersonalityResult(this.scene, {
        colorName: colorNames[i],
        color: colors[i],
        value: (this.config.results as IPersonalityChoice)[colorNames[i]],
      });
      result.x = result.width / 2;
      result.y = i * result.height + result.height * 0.25;
      this.add(result);
      this.results.push(result);
    }
  }
  protected createResultMessage(): void {
    this.message = new PersonalityResultMessage(this.scene, this.config.option);
    this.add(this.message);
    const result = this.results.getFirst();
    this.message.x = result.x + result.width * 0.6 + this.message.width * 0.5;
    this.message.y = this.height - this.message.height * 0.7;
  }
}

export interface IPersonalityResultsConfig {
  option: string;
  results: PersonalityChoice;
}
