import { Fonts, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import BaseScene from '../../../scenes/BaseScene';
import SkillsScene from '../../../scenes/SkillsScene';
import ISimpleButtonState from '../../../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../../../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../../../utils/simpleButton/SimpleButton';
import SkillsGameEnd from './SkillsGameEnd';
import SlideShow from './SlideShow';

export default class SkillsInterface extends Phaser.GameObjects.Container {
  protected screen: Phaser.GameObjects.Image;
  protected screenShine: Phaser.GameObjects.Image;
  protected speaker: Phaser.GameObjects.Image;
  protected produceButton: SimpleButton;
  protected indicators: Phaser.GameObjects.Image[];
  protected slideShow: SlideShow;
  protected gameEnd: SkillsGameEnd;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.setSize(this.scene.width, this.scene.height);
    this.createComponents();
  }

  public setProduceButtonState(enabled: boolean): void {
    this.produceButton.setEnabled(enabled);
    this.gameEnd.setVisible(false);
  }

  public setIndicatorsFrame(
    frame: string = MultiAtlases.Skills.Atlas.Frames.IndicatorPassive,
  ): void {
    for (const indicator of this.indicators) {
      indicator.setFrame(frame);
    }
  }

  public async showLoadingProcess(
    successful: boolean,
    duration: number = 1000,
  ): Promise<void> {
    return new Promise<void>(resolve => {
      const targets: any = {
        index: 0,
      };
      this.scene.tweens.add({
        targets,
        index: this.indicators.length - 1,
        duration: this.indicators.length * duration,
        onUpdate: () => {
          this.indicators[Math.floor(targets.index)].setFrame(
            MultiAtlases.Skills.Atlas.Frames.IndicatorLoading,
          );
        },
        onComplete: () => {
          this.setIndicatorsFrame(
            successful
              ? MultiAtlases.Skills.Atlas.Frames.IndicatorSuccess
              : MultiAtlases.Skills.Atlas.Frames.IndicatorError,
          );
          resolve();
        },
      });
    });
  }

  public async startSlideShow(
    keyWord: string,
    count: number = 1,
    duration: number = 1000,
  ): Promise<void> {
    this.gameEnd.setVisible(false);
    return this.slideShow.start(keyWord, count, duration);
  }

  public showGameEnd(): void {
    this.slideShow.setVisible(false);
    this.gameEnd.setVisible(true);
  }

  protected createComponents(): void {
    this.createScreen();
    this.createProduceButton();
    this.createProcessingIndicators();
    this.createSpeaker();
    this.createSlideShow();
    this.createGameEndController();
    this.setListeners();
  }

  protected createScreen(): void {
    this.screen = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.InterfaceScreen,
    });
    this.add(this.screen);
    this.screen.x = this.width - this.height * 0.05 - this.screen.width * 0.5;
    this.screen.y = this.height * 0.05 + this.screen.height * 0.5;
    this.screenShine = this.scene.make.image({
      x: this.screen.x - this.screen.width * 0.5,
      y: this.screen.y - this.screen.height * 0.5,
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.InterfaceScreenHighLight,
    });
    this.add(this.screenShine);
    this.screenShine.setOrigin(0);
  }

  protected createProduceButton(): void {
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 13,
      fill: '#ffffff',
      text: Translation.SKILLS_BUTTON_PRODUCE,
      origin: { x: 0.5, y: 0.5 },
    };
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.ButtonProduce,
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.produceButton = new SimpleButton(this.scene, configs);
    this.add(this.produceButton);
    this.produceButton.x =
      this.screen.x - this.screen.width * 0.5 + this.produceButton.width * 0.5;
    this.produceButton.y = this.screen.y + this.screen.height * 0.7;
  }
  protected createProcessingIndicators(): void {
    this.indicators = [];
    const startX: number =
      this.produceButton.x + this.produceButton.width * 0.39;
    const endX: number = startX + this.produceButton.width * 1.1;
    const startY: number =
      this.produceButton.y - this.produceButton.height * 0.55;
    const endY: number = startY + this.produceButton.width * 1.1;
    const line: Phaser.Geom.Line = new Phaser.Geom.Line(
      startX,
      startY,
      endX,
      endY,
    );
    const points: Phaser.Geom.Point[] = line.getPoints(4);
    points.shift();
    for (let i: number = 0; i < 3; i++) {
      for (let ii: number = 0; ii < 3; ii++) {
        const indicator: Phaser.GameObjects.Image = this.scene.make.image({
          x: points[ii].x,
          y: points[i].y,
          key: MultiAtlases.Skills.Atlas.Name,
          frame: MultiAtlases.Skills.Atlas.Frames.IndicatorPassive,
        });
        this.indicators.push(indicator);
        this.add(indicator);
      }
    }
  }
  protected createSpeaker(): void {
    this.speaker = this.scene.make.image({
      x: 0,
      y: this.produceButton.y,
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.InterfaceSpeaker,
    });
    this.speaker.x =
      this.screen.x + this.screen.width * 0.5 - this.speaker.width * 0.5;
    this.add(this.speaker);
  }
  protected createSlideShow(): void {
    this.slideShow = new SlideShow(this.scene);
    this.slideShow.x = this.screen.x;
    this.slideShow.y = this.screen.y;
    this.add(this.slideShow);
    this.bringToTop(this.screenShine);
  }

  protected createGameEndController(): void {
    this.gameEnd = new SkillsGameEnd(this.scene);
    this.gameEnd.x = this.screen.x;
    this.gameEnd.y = this.screen.y;
    this.add(this.gameEnd);
  }

  protected setListeners(): void {
    this.produceButton.on(SimpleButton.CLICK_EVENT, this.onProduceClick, this);
  }

  protected onProduceClick(): void {
    this.setProduceButtonState(false);
    this.scene.events.emit(SkillsScene.PRODUCE_CLICKED_EVENT);
  }
}
