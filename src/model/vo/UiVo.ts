import { StringIndexedObject } from '../../utils/Utils';

export class UiVO {
  avatar: IAvatarConfig;
  lifeStyleChoices: ILifeStyleChoices;
  lifeStyleProgress: number;
  lifeStyleTotal: number;
  lifeStyleSubtotal: number;
  lifeStylePanelUsedIndexes: number[];

  constructor() {
    this.lifeStyleChoices = {};
    this.lifeStyleTotal = 0;
    this.lifeStyleProgress = 0;
    this.lifeStyleSubtotal = 0;
    this.lifeStylePanelUsedIndexes = [];
  }
}

export interface IAvatarConfig extends StringIndexedObject<number | string> {
  color: number;
  hair: number;
  face: number;
  shirt: number;
  breeches: number;
  gender: string;
}

export interface ILifeStyleChoices extends StringIndexedObject<number> {}
