import { IAvatarConfig } from '../model/vo/UiVO';
import { StringIndexedObject } from '../utils/Utils';
import { IPosition } from '../view/utils/phaser/PhaserUtils';

export enum ERROR_CODE {
  SIGN_IN_WRONG_PASSWORD,
  SIGN_IN_NOT_EXISTING_USER,
  REGISTRATION_UNFILLED_FIELD,
  REGISTRATION_SHORT_PASSWORD,
  REGISTRATION_MISMATCH_PASSWORD,
  REGISTRATION_INVALID_EMAIL,
}

export const defaultAvatarConfig: IAvatarConfig = {
  color: 0,
  hair: -1,
  face: -1,
  shirt: -1,
  breeches: -1,
  gender: 'male',
};

export const lifeStyleSections: ILifeStyleSectionConfig[] = [
  { x: 2, y: 0, color: 0xfbd569 },
  { x: 4, y: 0, color: 0x698ffb },
  { x: 5, y: 0, color: 0x69fb76 },
  { x: 6, y: 1, color: 0xfb69dc },
  { x: 6, y: 2, color: 0xffa465 },
  { x: 5, y: 3, color: 0xfb8269 },
  { x: 4, y: 3, color: 0xfbf969 },
  { x: 2, y: 3, color: 0x69f9fb },
  { x: 1, y: 3, color: 0xc169fb },
  { x: 0, y: 2, color: 0xd9ff65 },
  { x: 0, y: 1, color: 0x69c6fb },
  { x: 1, y: 0, color: 0xfb8269 },
];

export const lifeStyleSectionsPrices: ILifeStyleSectionPrices = {
  '2-0': [[0], [80], [543], [808]],
  '4-0': [[50], [140], [180], [25]],
  '5-0': [[0], [56, 86], [70, 120], [186, 235]],
  '6-1': [[50], [125], [150], [200]],
  '6-2': [[0], [667], [796], [1256]],
  '5-3': [[0], [2], [5], [10]],
  '4-3': [[25], [50], [75], [100]],
  '2-3': [[50], [75], [100], [200]],
  '1-3': [[0], [2], [5], [10]],
  '0-2': [[41], [47], [85], [580]],
  '0-1': [[50], [100], [150], [200]],
  '1-0': [[300], [400], [450], [550]],
};
export interface ILifeStyleSectionConfig extends IPosition {
  color: number;
}

export interface ILifeStyleSectionPrices
  extends StringIndexedObject<number[][]> {}
