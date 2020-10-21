import { Fonts, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import BaseScene from '../../../scenes/BaseScene';
import SkillsScene from '../../../scenes/SkillsScene';
import ISimpleButtonState from '../../../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../../../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../../../utils/simpleButton/SimpleButton';

export default class SkillsGameEnd extends Phaser.GameObjects.Container {
  protected replayButton: SimpleButton;
  protected playAgainButton: SimpleButton;
  protected resultsButton: SimpleButton;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
    this.setVisible(false);
  }

  protected createComponents(): void {
    this.defineSize();
    this.createSlideButton();
    this.createPlayAgainButton();
    this.createResultsButton();
    this.setButtonsPositions();
    this.setListeners();
  }

  protected defineSize(): void {
    const frame: Phaser.Textures.Frame = this.scene.textures.getFrame(
      MultiAtlases.Skills.Atlas.Name,
      MultiAtlases.Skills.Atlas.Frames.SlideShowAnalyzing0,
    );
    this.setSize(frame.width, frame.height);
  }

  protected createSlideButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.ButtonReplay,
    };
    const textConfig: ISimpleButtonText = {
      text: Translation.SKILLS_BUTTON_REPLAY,
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.replayButton = new SimpleButton(this.scene, configs);
    this.add(this.replayButton);
  }

  protected createPlayAgainButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.ButtonPlayAgain,
    };
    const textConfig: ISimpleButtonText = {
      text: Translation.SKILLS_BUTTON_PLAY_AGAIN,
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.playAgainButton = new SimpleButton(this.scene, configs);
    this.add(this.playAgainButton);
  }

  protected createResultsButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.ButtonResults,
    };
    const textConfig: ISimpleButtonText = {
      text: Translation.SKILLS_BUTTON_RESULTS,
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.resultsButton = new SimpleButton(this.scene, configs);
    this.add(this.resultsButton);
  }

  protected setButtonsPositions(): void {
    const line = new Phaser.Geom.Line(
      0,
      -this.height * 0.5,
      0,
      this.height * 0.5,
    );
    const points = line.getPoints(4);
    points.shift();
    const buttons: SimpleButton[] = [
      this.replayButton,
      this.playAgainButton,
      this.resultsButton,
    ];
    for (let i: number = 0; i < buttons.length; i++) {
      buttons[i].x = points[i].x;
      buttons[i].y = points[i].y;
    }
  }

  protected setListeners(): void {
    this.replayButton.on(SimpleButton.CLICK_EVENT, this.onReplay, this);
    this.playAgainButton.on(SimpleButton.CLICK_EVENT, this.onPlayAgain, this);
    this.resultsButton.on(SimpleButton.CLICK_EVENT, this.onResults, this);
  }

  protected onReplay(): void {
    this.scene.events.emit(SkillsScene.REPLAY_CLICKED_EVENT);
  }

  protected onPlayAgain(): void {
    this.scene.events.emit(SkillsScene.PLAY_AGAIN_CLICKED_EVENT);
  }

  protected onResults(): void {
    this.scene.events.emit(SkillsScene.RESULTS_CLICKED_EVENT);
  }
}
