import { Images } from '../../assets';
import BaseController from '../components/skills/controllers/BaseController';
import HorizontalController from '../components/skills/controllers/HorizontalController';
import SphereController from '../components/skills/controllers/SphereController';
import VerticalController from '../components/skills/controllers/VerticalController';
import SkillsInterface from '../components/skills/interface/SkillsInterface';
import BaseScene from './BaseScene';

export default class SkillsScene extends BaseScene {
  public static NAME: string = 'SkillsScene';

  public static PRODUCE_CLICKED_NOTIFICATION = `${SkillsScene.NAME}ProduceClickedNotification`;
  public static CONTROLLER_VALUE_CHANGED_NOTIFICATION = `${SkillsScene.NAME}ControllerValueChangedNotification`;
  public static REPLAY_CLICKED_NOTIFICATION = `${SkillsScene.NAME}ReplayClickedNotification`;
  public static PLAY_AGAIN_CLICKED_NOTIFICATION = `${SkillsScene.NAME}PlayAgainNotification`;
  public static RESULTS_CLICKED_NOTIFICATION = `${SkillsScene.NAME}ResultsClickedNotification`;
  public static HELP_CLICKED_NOTIFICATION = `${SkillsScene.NAME}HelpClickedNotification`;
  public static ERROR_NOTIFICATION = `${SkillsScene.NAME}ErrorNotification`;

  public static PRODUCE_CLICKED_EVENT: string = 'produceClicked';
  public static REPLAY_CLICKED_EVENT: string = 'replayClicked';
  public static PLAY_AGAIN_CLICKED_EVENT: string = 'playAgainClicked';
  public static RESULTS_CLICKED_EVENT: string = 'resultsClicked';
  public static CONTROLLER_VALUE_CHANGED_EVENT: string =
    'controllerValueChanged';
  public static CONTROLLER_CHOSE_EVENT: string = 'controllerChoseEvent';

  protected background: Phaser.GameObjects.Image;
  protected backgroundLeft: Phaser.GameObjects.Image;
  protected backgroundRight: Phaser.GameObjects.Image;
  protected interface: SkillsInterface;
  protected controllers: BaseController[];

  constructor() {
    super(SkillsScene.NAME);
  }

  public setControllersState(enabled: boolean): void {
    for (const controller of this.controllers) {
      controller.setEnabled(enabled);
    }
  }

  public async startIndicatorsProcessing(
    success: boolean,
    bestSkill: string,
  ): Promise<void> {
    await this.interface.showLoadingProcess(success, 500);
    if (success) {
      await this.interface.startSlideShow(bestSkill, 4, 2000);
      this.interface.showGameEnd();
    }
  }

  public async showSlideShow(bestSkill: string): Promise<void> {
    await this.interface.startSlideShow(bestSkill, 4);
    this.interface.showGameEnd();
  }

  public activateController(targetController: BaseController): void {
    this.interface.setProduceButtonState(true);
    this.interface.setIndicatorsFrame();
    this.interface.startSlideShow(targetController.name);
    for (const controller of this.controllers) {
      if (controller === targetController) {
        continue;
      }
      controller.setActiveState(false);
    }
  }

  protected create(): void {
    this.createBackgrounds();
    this.createControllers();
    this.createInterface();
  }

  protected createBackgrounds(): void {
    this.background = this.make.image({
      x: this.width / 2,
      y: this.height / 2,
      key: Images.WhitePixel.Name,
    });
    this.background.setScale(this.width, this.height);
    this.background.setTint(0x67bf9e);
    this.add.existing(this.background);

    this.backgroundLeft = this.make.image({
      x: 0,
      y: 0,
      key: Images.WhitePixel.Name,
    });
    this.backgroundLeft.setScale(
      this.width * 0.475,
      this.height - this.width * 0.025,
    );
    this.backgroundLeft.setTint(0x59b995);
    this.add.existing(this.backgroundLeft);
    this.backgroundLeft.x =
      this.width * 0.4875 - this.backgroundLeft.displayWidth * 0.5;
    this.backgroundLeft.y =
      this.height -
      this.backgroundLeft.displayHeight * 0.5 -
      this.width * 0.0125;

    this.backgroundRight = this.make.image({
      x: 0,
      y: 0,
      key: Images.WhitePixel.Name,
    });
    this.backgroundRight.setScale(
      this.width * 0.475,
      this.height - this.width * 0.025,
    );
    this.backgroundRight.setTint(0x59b995);
    this.add.existing(this.backgroundRight);
    this.backgroundRight.x =
      this.width * 0.5125 + this.backgroundRight.displayWidth * 0.5;
    this.backgroundRight.y =
      this.height -
      this.backgroundRight.displayHeight * 0.5 -
      this.width * 0.0125;
  }

  protected createControllers(): void {
    this.controllers = [];
    this.createVerticalControllers();
    this.createSphereControllers();
    this.createHorizontalControllers();
  }

  protected createVerticalControllers(): void {
    const names: string[] = ['reading', 'speaking', 'writing'];
    const startX: number =
      this.backgroundLeft.x - this.backgroundLeft.displayWidth * 0.6;
    const endX: number = startX + this.backgroundLeft.displayWidth * 1.2;
    const y: number =
      this.backgroundLeft.y - this.backgroundLeft.displayHeight * 0.5;
    const line: Phaser.Geom.Line = new Phaser.Geom.Line(startX, y, endX, y);
    const points: Phaser.Geom.Point[] = line.getPoints(names.length + 1);
    points.shift();
    for (let i: number = 0; i < names.length; i++) {
      const controller = new VerticalController(this, names[i]);
      controller.x = points[i].x;
      controller.y = points[i].y + controller.height * 0.5;
      this.add.existing(controller);
      this.controllers.push(controller);
    }
  }
  protected createSphereControllers(): void {
    const names: string[] = ['analyzing', 'organizing', 'observing'];
    const startX: number =
      this.backgroundLeft.x - this.backgroundLeft.displayWidth * 0.6;
    const endX: number = startX + this.backgroundLeft.displayWidth * 1.2;
    const lastVerticalController = this.controllers.getLast();
    const y: number =
      lastVerticalController.y + lastVerticalController.height * 0.65;
    const line: Phaser.Geom.Line = new Phaser.Geom.Line(startX, y, endX, y);
    const points: Phaser.Geom.Point[] = line.getPoints(names.length + 1);
    points.shift();
    for (let i: number = 0; i < names.length; i++) {
      const controller = new SphereController(this, names[i]);
      controller.x = points[i].x;
      controller.y = points[i].y + controller.height * 0.5;
      this.add.existing(controller);
      this.controllers.push(controller);
    }
  }

  protected createHorizontalControllers(): void {
    const names: string[] = [
      'decision',
      'relationship',
      'listening',
      'problem',
    ];
    const startX: number =
      this.backgroundLeft.x - this.backgroundLeft.displayWidth * 0.75;
    const endX: number = startX + this.backgroundLeft.displayWidth * 1.5;
    const lastSphereController = this.controllers.getLast();
    const startY: number =
      lastSphereController.y +
      lastSphereController.height * 0.5 -
      this.backgroundLeft.displayHeight * 0.115;
    const endY: number =
      this.backgroundLeft.y + this.backgroundLeft.displayHeight * 0.485;
    const line: Phaser.Geom.Line = new Phaser.Geom.Line(
      startX,
      startY,
      endX,
      endY,
    );
    const points: Phaser.Geom.Point[] = line.getPoints(3);
    points.shift();
    for (let i: number = 0; i < 2; i++) {
      for (let ii: number = 0; ii < 2; ii++) {
        const controller = new HorizontalController(this, names[i * 2 + ii]);
        controller.x = points[ii].x;
        controller.y = points[i].y + controller.height * 0.6;
        this.add.existing(controller);
        this.controllers.push(controller);
      }
    }
  }

  protected createInterface(): void {
    this.interface = new SkillsInterface(this);
    this.add.existing(this.interface);
  }
}
