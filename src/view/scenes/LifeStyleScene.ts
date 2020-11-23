import { Fonts, MultiAtlases } from '../../assets';
import { lifeStyleSections } from '../../constants/Constants';
import { IAvatarConfig } from '../../model/vo/UiVO';
import { Translation } from '../../translations';
import LifeStyleCenter from '../components/lifestyle/center/LifeStyleCenter';
import LifeStyleTooltip from '../components/lifestyle/center/LifeStyleTooltip';
import LifeStyleWheel from '../components/lifestyle/center/LifeStyleWheel';
import LifeStyleBackground from '../components/lifestyle/LifeStyleBackground';
import LifeStyleSection from '../components/lifestyle/LifeStyleSection';
import LifeStyleUser from '../components/lifestyle/LifeStyleUser';
import LifeStyleTopPanel from '../components/lifestyle/panel/LifeStyleTopPanel';
import { IPosition } from '../utils/phaser/PhaserUtils';
import ISimpleButtonState from '../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../utils/simpleButton/SimpleButton';
import BaseScene from './BaseScene';

export default class LifeStyleScene extends BaseScene {
  public static NAME: string = 'LifeStyleScene';
  public static OPTION_SELECTED_NOTIFICATION: string = `${LifeStyleScene.NAME}OptionSelectedNotification`;
  public static OPTION_CONFIRMED_NOTIFICATION: string = `${LifeStyleScene.NAME}OptionConfirmedNotification`;
  public static OPTION_CLEAR_NOTIFICATION: string = `${LifeStyleScene.NAME}OptionClearNotification`;
  public static SHOW_RESULT_NOTIFICATION: string = `${LifeStyleScene.NAME}ShowResultNotification`;
  public static HELP_CLICKED_NOTIFICATION: string = `${LifeStyleScene.NAME}HelpClickedNotification`;

  public static CLEAR_EVENT: string = 'clear';
  public static CONFIRM_EVENT: string = 'confirm';
  public static MOVE_TO_SECTION_EVENT: string = 'moveToSection';
  public static HELP_CLICKED_EVENT: string = 'helpClicked';

  protected background: LifeStyleBackground;
  protected topPanel: LifeStyleTopPanel;
  protected center: LifeStyleCenter;
  protected wheel: LifeStyleWheel;
  protected sections: LifeStyleSection[];
  protected player: LifeStyleUser;
  protected targetSection: LifeStyleSection;
  protected helpButton: SimpleButton;
  protected tooltip: LifeStyleTooltip;

  constructor() {
    super(LifeStyleScene.NAME);
  }

  public restart(): void {
    for (const child of this.children.list) {
      child.active && child.destroy();
    }
    this.create();
  }

  public showTooltip(index: number): void {
    this.tooltip.updateTooltip(index);
    this.tooltip.setVisible(true);
    if (index === 0) {
      this.children.bringToTop(this.wheel);
    } else {
      for (const section of this.sections) {
        this.children.bringToTop(section);
      }
      this.children.bringToTop(this.player);
    }
  }

  public hideTooltip(): void {
    this.tooltip.setVisible(false);
  }

  public create(): void {
    this.createBackground();
    this.createCenter();
    this.createWheel();
    this.createTopPanel();
    this.createSections();
    this.createTooltip();
    this.createHelpButton();
  }

  public createPlayer(config: IAvatarConfig): void {
    this.player = new LifeStyleUser(this, config);
    this.add.existing(this.player);
    const position: IPosition = this.background.getCeilPosition(0, 0);
    this.player.setPosition(position.x, position.y);
    this.setListeners();
  }

  public async hidePanels(): Promise<void> {
    const promises: Promise<void>[] = [];
    this.topPanel.hide();
    for (const section of this.sections) {
      const hidePromise = section.hidePanel();
      promises.push(hidePromise);
    }
    await Promise.all(promises);
  }

  public enableWheel(): void {
    this.tooltip && this.showTooltip(0);
    this.wheel.setEnabled(true);
  }

  public async updateTotal(value: number): Promise<void> {
    await this.center.setTotal(value);
  }

  public async updateProgress(progress: number): Promise<void> {
    await this.center.setProgress(progress / 12);
  }

  public updateSubtotal(value: number, showNextButton: boolean): void {
    this.topPanel.subtotal.setValue(value);
    showNextButton
      ? this.topPanel.showNextButton()
      : this.topPanel.hideNextButton();
  }

  protected createBackground(): void {
    this.background = new LifeStyleBackground(this);
    this.add.existing(this.background);
  }

  protected createTopPanel(): void {
    this.topPanel = new LifeStyleTopPanel(this);
    this.add.existing(this.topPanel);
  }
  protected createCenter(): void {
    const start = this.background.getCeilPosition(1, 1);
    const end = this.background.getCeilPosition(6, 3);
    const width: number = end.x - start.x;
    const dif: number = width * 0.05;
    const height: number = end.y - start.y;
    this.center = new LifeStyleCenter(this, width - dif, height - dif);
    this.center.x = this.width / 2;
    this.center.y = this.height / 2;
    this.add.existing(this.center);
  }

  protected createWheel(): void {
    this.wheel = new LifeStyleWheel(this);
    this.add.existing(this.wheel);
    this.wheel.setScale((this.center.height * 1.05) / this.wheel.height);
    this.wheel.x =
      this.center.x + this.center.width * 0.5 - this.wheel.displayWidth * 0.5;
    this.wheel.y =
      this.center.y +
      this.center.height * 0.5 -
      this.wheel.displayHeight * 0.4825;
  }

  protected createSections(): void {
    this.sections = [];
    for (const sectionConfig of lifeStyleSections) {
      const section: LifeStyleSection = new LifeStyleSection(
        this,
        sectionConfig,
      );
      this.add.existing(section);
      this.sections.push(section);
      const position: IPosition = this.background.getCeilPosition(
        sectionConfig.x,
        sectionConfig.y,
      );
      section.x = position.x;
      section.y = position.y;
    }
  }

  protected createTooltip(): void {
    this.tooltip = new LifeStyleTooltip(this, this.wheel);
    this.add.existing(this.tooltip);
    this.tooltip.setVisible(false);
  }

  protected createHelpButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.ButtonsHelp,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: '#ffffff',
      text: Translation.LIFESTYLE_BUTTON_HELP,
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.helpButton = new SimpleButton(this, configs);
    this.add.existing(this.helpButton);
    this.helpButton.x = this.width - this.helpButton.width * 0.55;
    this.helpButton.y =
      this.height - this.helpButton.height * 0.5 - this.helpButton.width * 0.05;
  }

  protected setListeners(): void {
    this.player.input.enabled = false;
    this.wheel.once(LifeStyleWheel.ROLL_STARTED_EVENT, this.hideTooltip, this);
    this.wheel.on(LifeStyleWheel.ROLLED_EVENT, this.onWheelRoll, this);
    this.player.on(Phaser.Input.Events.DRAG_END, this.onWrongDrag, this);
    this.player.on(Phaser.Input.Events.DROP, this.movePlayerToSection, this);
    this.helpButton.on(SimpleButton.CLICK_EVENT, this.onHelpClick, this);
  }

  protected onWheelRoll(index: number): void {
    !!this.tooltip && this.showTooltip(1);
    this.wheel.setEnabled(false);
    this.player.input.enabled = true;
    const position: IPosition = lifeStyleSections[index];
    this.targetSection = this.sections.find(
      (section: LifeStyleSection) =>
        section.config.x === position.x && section.config.y === position.y,
    );
    for (const section of this.sections) {
      if (section === this.targetSection) {
        continue;
      }
      section.makeUnselected();
    }
    this.targetSection.makeSelected();
    this.tweens.killTweensOf(this.sections);
    this.tweens.add({
      targets: this.targetSection,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 200,
      yoyo: true,
      repeat: -1,
      repeatDelay: 1000,
    });
  }

  protected onWrongDrag(pointer: Phaser.Input.Pointer, ...args: any[]): void {
    this.player.input.enabled = false;
    if (args.getLast()) {
      return;
    }
    this.tweens.killTweensOf(this.player);
    this.tweens.add({
      targets: this.player,
      x: this.player.lastPosition.x,
      y: this.player.lastPosition.y,
      duration: 400,
      ease: Phaser.Math.Easing.Expo.InOut,
      onComplete: () => {
        this.player.input.enabled = true;
      },
    });
  }

  public movePlayerToSection(): void {
    this.tweens.killTweensOf(this.player);
    this.tweens.killTweensOf(this.targetSection);
    this.tooltip && this.tooltip.destroy();
    this.tooltip = null;
    this.targetSection.setScale(1);
    this.targetSection.makeUnselected();
    this.tweens.add({
      targets: this.player,
      x: this.targetSection.x,
      y: this.targetSection.y,
      duration: 100,
      onComplete: () => {
        this.player.setPosition(this.targetSection.x, this.targetSection.y);
        this.topPanel.instructions.setSectionConfig(this.targetSection.config);
        this.topPanel.show();
        this.targetSection.showPanel();
      },
    });
  }

  protected onHelpClick(): void {
    this.events.emit(LifeStyleScene.HELP_CLICKED_EVENT);
  }
}
