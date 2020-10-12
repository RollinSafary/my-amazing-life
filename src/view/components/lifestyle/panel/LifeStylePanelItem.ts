import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import {
  getLifeStylePanelItemPrice,
  getLifeStylePanelItemPriceKey,
} from '../../../../utils/Utils';
import BaseScene from '../../../scenes/BaseScene';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';
import { ILifeStylePanelConfig } from './LifeStylePanel';
import {
  ILifeStylePanelItemPriceConfig,
  LifeStylePanelItemPrice,
} from './LifeStylePanelItemPrice';

export class LifeStylePanelItem extends Phaser.GameObjects.Container {
  public static CLICK_EVENT: string = 'click';
  protected background: Phaser.GameObjects.Image;
  protected shadow: Phaser.GameObjects.Image;
  protected innerBox: Phaser.GameObjects.Image;
  protected icon: Phaser.GameObjects.Image;
  protected textBox: Phaser.GameObjects.Image;
  protected title: ExtendedText;
  protected description: ExtendedText;

  constructor(
    protected scene: BaseScene,
    protected config: ILifeStylePanelConfig,
    public index: number,
  ) {
    super(scene);
    this.createComponents();
    this.setAlpha(0.8);
  }

  public disableInteractive(): this {
    for (const child of this.list) {
      child.disableInteractive();
    }
    return super.disableInteractive();
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createShadow();
    this.createInnerBox();
    this.createIcon();
    this.createTextBox();
    this.createTitle();
    this.createDescription();
    const prices: number[] = getLifeStylePanelItemPrice(
      this.config.xIndex,
      this.config.yIndex,
      this.index,
    );
    const isSinglePrice: boolean = prices.length === 1;
    isSinglePrice ? this.createPrice() : this.createPrices();
    this.setListeners(isSinglePrice);
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.PanelBorder,
    });
    this.add(this.background);
    this.background.setTint(this.config.color);
  }

  protected createShadow(): void {
    this.shadow = this.scene.make.image({
      x: this.width * 0.05,
      y: this.width * 0.05,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.PanelBorder,
    });
    this.add(this.shadow);
    this.shadow.setTintFill(0x8e8e8e);
    this.shadow.setAlpha(0.5);
    this.sendToBack(this.shadow);
  }
  protected createInnerBox(): void {
    this.innerBox = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.PanelInnerBox,
    });
    this.add(this.innerBox);
    this.innerBox.setAlpha(0.5);
  }
  protected createIcon(): void {
    this.icon = this.scene.make.image({
      x: 0,
      y: -this.height * 0.225,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: (MultiAtlases.Lifestyle.Atlas.Frames as any)[
        `PanelIcon${this.config.yIndex}${this.config.xIndex}${this.index}`
      ],
    });
    this.add(this.icon);
  }
  protected createTextBox(): void {
    this.textBox = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.PanelTextBox,
    });
    this.textBox.y =
      this.icon.y + this.icon.height / 2 + this.textBox.height * 0.55;
    this.add(this.textBox);
  }

  protected createTitle(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: `#${this.config.color.toString(16)}`,
    };
    this.title = this.scene.make.extText({
      x: 0,
      y: this.textBox.y - this.textBox.height * 0.5,
      text: (Translation as any)[
        `LIFESTYLE_TITLE_${this.config.xIndex}_${this.config.yIndex}_${this.index}`
      ],
      style,
    });
    this.add(this.title);
    this.title.setOrigin(0.5, 0);
    this.title.setAlign('center');
    this.title.setShadow(1, 1, '#8e8e8e', 1, false, true);
    this.title.setWordWrapWidth(this.textBox.width);
  }
  protected createDescription(): void {
    const style: ITextStyle = {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: '#585858',
    };
    this.description = this.scene.make.extText({
      x: 0,
      y: this.title.y + this.title.height * 1.05,
      text: (Translation as any)[
        `LIFESTYLE_DESCRIPTION_${this.config.xIndex}_${this.config.yIndex}_${this.index}`
      ],
      style,
    });
    this.add(this.description);
    this.description.setOrigin(0.5, 0);
    this.description.setWordWrapWidth(this.textBox.width * 0.98);
  }

  protected createPrice(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: `#${this.config.color.toString(16)}`,
    };
    const price: ExtendedText = this.scene.make.extText({
      x: 0,
      y: this.textBox.y + this.textBox.height * 0.49,
      text: getLifeStylePanelItemPriceKey(
        this.config.xIndex,
        this.config.yIndex,
        this.index,
      ),
      style,
      i18nOptions: {
        value: getLifeStylePanelItemPrice(
          this.config.xIndex,
          this.config.yIndex,
          this.index,
        ),
      },
    });
    this.add(price);
    price.setOrigin(0.5, 1);
  }

  protected createPrices(): void {
    const prices: number[] = getLifeStylePanelItemPrice(
      this.config.xIndex,
      this.config.yIndex,
      this.index,
    );
    const privateConfig: ILifeStylePanelItemPriceConfig = {
      nameKey: Translation.LIFESTYLE_PRICE_PRIVATE,
      key: getLifeStylePanelItemPriceKey(
        this.config.xIndex,
        this.config.yIndex,
        this.index,
      ),
      value: prices.getLast(),
    };
    const publicConfig: ILifeStylePanelItemPriceConfig = {
      nameKey: Translation.LIFESTYLE_PRICE_PUBLIC,
      key: getLifeStylePanelItemPriceKey(
        this.config.xIndex,
        this.config.yIndex,
        this.index,
      ),
      value: prices.getFirst(),
    };

    const privatePrice: LifeStylePanelItemPrice = new LifeStylePanelItemPrice(
      this.scene,
      privateConfig,
    );
    const publicPrice: LifeStylePanelItemPrice = new LifeStylePanelItemPrice(
      this.scene,
      publicConfig,
    );

    this.add(privatePrice);
    this.add(publicPrice);

    privatePrice.x = -this.textBox.width / 2 + privatePrice.width * 0.55;
    privatePrice.y =
      this.textBox.y + this.textBox.height / 2 - privatePrice.height / 2;
    publicPrice.x = -privatePrice.x;
    publicPrice.y = privatePrice.y;
  }

  protected setListeners(isSinglePrice: boolean): void {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_OVER, this.onHover, this);
    this.on(Phaser.Input.Events.POINTER_OUT, this.onOut, this);
    isSinglePrice &&
      this.on(Phaser.Input.Events.POINTER_DOWN, this.onDown, this);
    this.input.enabled = false;
  }

  protected onHover(): void {
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 100,
    });
  }

  protected onOut(): void {
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      targets: this,
      alpha: 0.8,
      duration: 100,
    });
    this.off(Phaser.Input.Events.POINTER_UP, this.onClick, this);
  }

  protected onDown(): void {
    this.once(Phaser.Input.Events.POINTER_UP, this.onClick, this);
  }

  public onClick(): void {
    this.emitChoice();
  }

  public emitChoice(
    value: number = getLifeStylePanelItemPrice(
      this.config.xIndex,
      this.config.yIndex,
      this.index,
    ).getFirst(),
  ): void {
    this.emit(LifeStylePanelItem.CLICK_EVENT);
    this.scene.events.emit(
      LifeStylePanelItem.CLICK_EVENT,
      this.config,
      this.index,
      value,
    );
  }
}
