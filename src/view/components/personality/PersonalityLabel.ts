import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts } from '../../../assets';
import { personalityLabelsPositions } from '../../../constants/Constants';
import { gameConfig } from '../../../constants/GameConfig';
import { Translation } from '../../../translations';
import PersonalityScene from '../../scenes/PersonalityScene';

export default class PersonalityLabel extends ExtendedText {
  constructor(protected scene: PersonalityScene, protected colorName: string) {
    super(
      scene,
      0,
      0,
      (Translation as any)[
        `PERSONALITY_SECTION_TITLE_${colorName.toUpperCase()}_0`
      ],
      {
        fontFamily: Fonts.ArialBlack.Name,
        fontSize: 20,
        fill: '#000',
      },
      null,
    );
    this.setScrollFactor(0);
    this.setOrigin(0.5);
    this.updateSector(0);
  }

  public updateSector(sectorIndex: number): void {
    this.setText(
      (Translation as any)[
        `PERSONALITY_SECTION_TITLE_${this.colorName.toUpperCase()}_${sectorIndex}`
      ],
    );
    const position = personalityLabelsPositions[sectorIndex][this.colorName];
    this.x =
      this.scene.frameLeft.displayWidth + position.x * gameConfig.designWidth;
    this.y = position.y * gameConfig.designHeight;
    this.setAngle(position.angle || 0);
    this.setAlpha(0);
  }
}
