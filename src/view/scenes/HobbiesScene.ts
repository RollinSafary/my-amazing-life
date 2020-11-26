import { Fonts, Images, MultiAtlases } from '../../assets';
import { Translation } from '../../translations';
import HobbiesGameUi from '../components/hobbies/HobbiesGameUi';
import HobbiesImage from '../components/hobbies/HobbiesImage';
import HobbiesImagePair from '../components/hobbies/HobbiesImagePair';
import HobbiesObstacle from '../components/hobbies/HobbiesObstacle';
import HobbiesPlayer from '../components/hobbies/HobbiesPlayer';
import {
  delayRunnable,
  getFramesByName,
  pickAny,
  postRunnable,
  removeRunnable,
} from '../utils/phaser/PhaserUtils';
import ISimpleButtonState from '../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../utils/simpleButton/SimpleButton';
import BaseScene from './BaseScene';

const cameraSpeed: number = 3;
export default class HobbiesScene extends BaseScene {
  public static NAME: string = 'HobbiesScene';

  public static START_GAME_NOTIFICATION: string = `${HobbiesScene.NAME}StartGameNotification`;
  public static HOBBY_CHOSE_NOTIFICATION: string = `${HobbiesScene.NAME}HobbyChoseNotification`;
  public static HELP_CLICKED_NOTIFICATION: string = `${HobbiesScene.NAME}HelpClickedNotification`;
  public static LIVES_SPENT_NOTIFICATION: string = `${HobbiesScene.NAME}LivesSpentNotification`;

  public static GENERATE_ITEMS_EVENT: string = 'generateItems';
  public static HOBBY_CHOSE_EVENT: string = 'hobbyChose';
  public static FUEL_OVER_EVENT: string = 'fuelOver';
  public static LIVES_SPENT_EVENT: string = 'livesSpent';
  public static HELP_CLICKED_EVENT: string = 'helpClicked';

  public cameraState: number = 0;
  protected background: Phaser.GameObjects.Image;
  protected road: Phaser.GameObjects.TileSprite;
  protected player: HobbiesPlayer;
  protected decorations: Phaser.GameObjects.Image[];
  protected obstacles: HobbiesObstacle[];
  protected oilSpats: Phaser.GameObjects.Image[];
  protected cameraSpeed: number = cameraSpeed;
  protected oilRunnable: Phaser.Time.TimerEvent;
  protected ui: HobbiesGameUi;
  protected isGameStarted: boolean = false;
  protected imagePair: HobbiesImagePair;
  protected helpButton: SimpleButton;

  constructor() {
    super(HobbiesScene.NAME);
  }

  public pause(): void {
    this.isGameStarted = false;
    this.tweens.pauseAll();
  }

  public resume(): void {
    this.isGameStarted = true;
    this.tweens.resumeAll();
  }

  public startGame(): void {
    this.input.setTopOnly(false);
    this.resetValues();
    this.ui.fuel.start();
    postRunnable(this.tweens.pauseAll, this.tweens);
  }

  public makeImageSelected(frameName: string, remaining: number): void {
    this.imagePair.makeSelected(frameName);
    this.ui.fuel.restart();
    this.ui.remaining.setText(remaining);
  }

  public generateDecorations(): void {
    const leftX: number = this.width * 0.5 - this.road.width * 0.7;
    const rightX: number = this.width - leftX;
    const left = new Phaser.Geom.Line(leftX, 0, leftX, this.height);
    const right = new Phaser.Geom.Line(rightX, 0, rightX, this.height);
    const leftRandom: number = Phaser.Math.Between(0, 5);
    const rightRandom: number = Phaser.Math.Between(0, 5);
    const frames: string[] = getFramesByName(
      MultiAtlases.Hobbies.Atlas.Name,
      'tree',
    );
    for (let i: number = 0; i < leftRandom; i++) {
      const point = left.getRandomPoint();
      const decoration = this.make.image({
        x: Phaser.Math.Between(point.x / 2, point.x),
        y: point.y - this.height * (this.cameraState + 1),
        key: MultiAtlases.Hobbies.Atlas.Name,
        frame: pickAny(frames),
      });
      this.add.existing(decoration);
      this.decorations.push(decoration);
    }
    for (let i: number = 0; i < rightRandom; i++) {
      const point = right.getRandomPoint();
      const decoration = this.make.image({
        x: Phaser.Math.Between(point.x, this.width + point.x * 0.5),
        y: point.y - this.height * (this.cameraState + 1),
        key: MultiAtlases.Hobbies.Atlas.Name,
        frame: pickAny(frames),
      });
      this.add.existing(decoration);
      this.decorations.push(decoration);
    }
  }

  public setImagePair(frames: string[]): void {
    const line = new Phaser.Geom.Line(
      this.width * 0.5,
      0,
      this.width * 0.5,
      this.height,
    );
    const points = line.getPoints(4);
    points.shift();
    const point = points.getLast();
    this.imagePair.x = point.x;
    this.imagePair.y = point.y - this.height * (this.cameraState + 1);
    this.imagePair.setImagePair(frames);
  }

  public generateObstacles(): void {
    const leftX: number = this.road.x - this.road.width * 0.25;
    const rightX: number = this.road.x + this.road.width * 0.25;
    const left = new Phaser.Geom.Line(leftX, 0, leftX, this.height);
    const right = new Phaser.Geom.Line(rightX, 0, rightX, this.height);
    const leftPoints = left.getPoints(4);
    const rightPoints = right.getPoints(4);
    leftPoints.shift();
    rightPoints.shift();
    leftPoints.pop();
    rightPoints.pop();
    const pointLeft = pickAny(leftPoints);
    this.generateObstacle(pointLeft);
    const rightPoint = rightPoints.find(
      (point: Phaser.Geom.Point) => point.y === pointLeft.y,
    );
    rightPoints.remove(rightPoint);
    const pointRight = pickAny(rightPoints);
    this.generateObstacle(pointRight);
  }

  public createImagePair(): void {
    this.imagePair = new HobbiesImagePair(this);
    this.add.existing(this.imagePair);
  }

  protected createHelpButton(): void {
    const textConfig: ISimpleButtonText = {
      text: Translation.HOBBIES_BUTTON_HELP,
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: '#1f4226',
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Hobbies.Atlas.Name,
      frame: MultiAtlases.Hobbies.Atlas.Frames.InterfaceButtonPlay,
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.helpButton = new SimpleButton(this, configs);
    this.helpButton.x = this.ui.lives.x + this.helpButton.width;
    this.helpButton.y = this.ui.lives.y + this.helpButton.height * 1.2;
    this.helpButton.setScrollFactor(0, 0);
    this.add.existing(this.helpButton);
    this.helpButton.on(SimpleButton.CLICK_EVENT, this.onHelpClick, this);
    this.helpButton.setDepth(10);
  }

  protected generateObstacle(point: Phaser.Geom.Point): void {
    const random: number = Phaser.Math.Between(0, 4);
    switch (random) {
      case 0: // hole
        const hole = new HobbiesObstacle(
          this,
          point,
          MultiAtlases.Hobbies.Atlas.Frames.ObstaclesHole,
          'hole',
        );
        this.add.existing(hole);
        this.obstacles.push(hole);
        break;
      case 1: // oil
        const oilSpat = this.make.image({
          x: point.x,
          y: point.y - this.height * (this.cameraState + 1),
          key: MultiAtlases.Hobbies.Atlas.Name,
          frame: MultiAtlases.Hobbies.Atlas.Frames.ObstaclesOilSpat,
        });
        oilSpat.setName('oilSpat');
        this.add.existing(oilSpat);
        this.oilSpats.push(oilSpat);
        break;
      case 2: // car
        const frames = getFramesByName(MultiAtlases.Hobbies.Atlas.Name, 'car');
        const obstacle = new HobbiesObstacle(
          this,
          point,
          pickAny(frames),
          'car',
        );
        this.add.existing(obstacle);
        this.obstacles.push(obstacle);
        break;
      default:
        break;
    }
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);
    if (!this.isGameStarted) {
      return;
    }
    this.updateCameraPosition();
    this.updateDecorations();
    if (this.player && this.player.active) {
      this.player.update();
      !this.player.isImmortal && this.checkObstacleCollisions();
      this.imagePair.collisionEnabled && this.checkImagesCollision();
    }
  }

  public create(): void {
    this.createBackground();
    this.createRoad();
    this.createUi();
    this.createPlayer();
    this.decorations = [];
    this.oilSpats = [];
    this.obstacles = [];
    this.generateDecorations();
    this.generateObstacles();
    this.createImagePair();
    this.createHelpButton();
  }

  protected createBackground(): void {
    this.background = this.make.image({
      x: this.width / 2,
      y: this.height / 2,
      key: Images.WhitePixel.Name,
    });
    this.background.setScale(this.width, this.height);
    this.background.setScrollFactor(0);
    this.add.existing(this.background);
    this.background.setTint(0x97ce60);
  }

  protected createRoad(): void {
    const frame: Phaser.Textures.Frame = this.textures.getFrame(
      MultiAtlases.Hobbies.Atlas.Name,
      MultiAtlases.Hobbies.Atlas.Frames.Road,
    );
    this.road = this.make.tileSprite({
      x: this.width * 0.5,
      y: this.height,
      key: MultiAtlases.Hobbies.Atlas.Name,
      frame: MultiAtlases.Hobbies.Atlas.Frames.Road,
      width: frame.width,
      height: this.height,
    });
    this.add.existing(this.road);
    this.road.setOrigin(0.5, 0);
    this.road.setScale(1, -1);
  }

  protected createUi(): void {
    this.ui = new HobbiesGameUi(this, this.road);
    this.add.existing(this.ui);
  }

  protected createPlayer(): void {
    this.player = new HobbiesPlayer(this, this.road);
    this.add.existing(this.player);
    this.player.y = this.height - this.player.height * 0.6;
    this.player.setScrollFactor(0);
    this.player.setDepth(10);
  }

  protected updateCameraPosition(): void {
    this.camera.scrollY -= this.cameraSpeed;
    this.road.height = this.road.height + Math.abs(this.camera.scrollY);
    const cameraState = Math.abs(Math.floor(this.camera.scrollY / this.height));
    if (cameraState !== this.cameraState) {
      this.cameraState = cameraState;
      this.events.emit(HobbiesScene.GENERATE_ITEMS_EVENT, this.cameraState);
    }
  }

  protected updateDecorations(): void {
    if (!this.decorations.length) {
      return;
    }
    const decorationsToRemove: Phaser.GameObjects.Image[] = [];
    for (const decoration of this.decorations) {
      if (
        decoration.y - decoration.height >
        this.camera.scrollY + this.height
      ) {
        decorationsToRemove.push(decoration);
      }
    }
    for (const decoration of decorationsToRemove) {
      this.decorations.remove(decoration);
      decoration.destroy();
    }
  }

  protected checkObstacleCollisions(): void {
    const oil = this.checkCollisionWith(...this.oilSpats);
    const obstacle = this.checkCollisionWith(...(this.obstacles as any[]));
    switch (true) {
      case !!oil:
        const sign: number = Math.sign(oil.x - this.road.x);
        this.player.setAngle(sign * 45);
        this.player.speedX = sign;
        this.oilRunnable = delayRunnable(this, 2000, () => {
          this.player.setAngle(0);
          this.player.speedX = 0;
        });
        break;
      case !!obstacle:
        this.onPlayerCrash();
        break;
      default:
        break;
    }
  }

  protected checkImagesCollision(): void {
    const leftBounds = this.imagePair.getLeftImageBounds();
    const rightBounds = this.imagePair.getRightImageBounds();
    const left = this.checkCollision(leftBounds);
    const right = this.checkCollision(rightBounds);
    let target: HobbiesImage;
    switch (true) {
      case left && right:
        const dxLeft: number = Math.abs(this.player.x - leftBounds.centerX);
        const dxRight: number = Math.abs(this.player.x - rightBounds.centerX);
        target = dxLeft <= dxRight ? this.imagePair.left : this.imagePair.right;
        break;
      case left:
        target = this.imagePair.left;
        break;
      case right:
        target = this.imagePair.right;
        break;
      default:
        return;
    }
    this.events.emit(HobbiesScene.HOBBY_CHOSE_EVENT, target.name);
  }

  protected onPlayerCrash(): void {
    this.ui.fuel.pause();
    this.cameraSpeed = 0;
    this.player.isImmortal = true;
    this.player.play('boom');
    this.player.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      this.player.setVisible(false);
      if (this.ui.lives.livesCount > 0) {
        this.ui.lives.decreaseLife();
        delayRunnable(this, 500, this.revivePlayer, this);
      } else {
        postRunnable(
          this.events.emit,
          this.events,
          HobbiesScene.LIVES_SPENT_EVENT,
        );
      }
    });
    this.player.setAngle(0);
    this.oilRunnable && removeRunnable(this.oilRunnable);
  }

  protected revivePlayer(): void {
    this.player.setTexture(
      MultiAtlases.Hobbies.Atlas.Name,
      MultiAtlases.Hobbies.Atlas.Frames.Player,
    );
    this.player.setVisible(true);
    this.tweens.add({
      targets: this.player,
      alpha: 0,
      yoyo: true,
      duration: 100,
      repeat: 5,
      repeatDelay: 500,
      onComplete: () => {
        this.player.isImmortal = false;
        this.ui.fuel.resume();
      },
    });
    this.player.x = this.width * 0.5;
    this.cameraSpeed = cameraSpeed;
  }

  protected checkCollisionWith<T extends Collider>(...targets: T[]): T {
    for (const target of targets) {
      if (this.checkCollision(target.getBounds())) {
        return target;
      }
    }
    return null;
  }

  protected checkCollision(target: Phaser.Geom.Rectangle): boolean {
    return Phaser.Geom.Intersects.RectangleToRectangle(
      this.playerBounds,
      target,
    );
  }

  protected resetValues(): void {
    this.cameraSpeed = cameraSpeed;
    this.isGameStarted = false;
    this.cameraState = 0;
  }

  protected onHelpClick(): void {
    this.events.emit(HobbiesScene.HELP_CLICKED_EVENT);
  }

  get camera(): Phaser.Cameras.Scene2D.Camera {
    return this.cameras.main;
  }

  get playerBounds(): Phaser.Geom.Rectangle {
    return new Phaser.Geom.Rectangle(
      this.player.x - this.player.width * 0.5,
      this.player.y + this.camera.scrollY - this.player.height * 0.5,
      this.player.width,
      this.player.height * 0.5,
    );
  }
}

type Collider = Phaser.GameObjects.GameObject &
  Phaser.GameObjects.Components.GetBounds;
