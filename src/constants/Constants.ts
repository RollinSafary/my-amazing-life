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

export const personalitySectors: IPosition[] = [
  {
    x: 0,
    y: 1,
  },
  {
    x: 0,
    y: 0,
  },
  {
    x: 1,
    y: 0,
  },
  {
    x: 2,
    y: 0,
  },
  {
    x: 2,
    y: 1,
  },
  {
    x: 1,
    y: 1,
  },
  {
    x: 1,
    y: 2,
  },
];

export const personalityMarkersPositions: IPersonalityMarkersPositions[] = [
  {
    red: { x: 0.82, y: 0.71 },
    blue: { x: 0.7, y: 0.5 },
    green: { x: 0.21, y: 0.26 },
    cyan: { x: 0.54, y: 0.24 },
    orange: { x: 0.062, y: 0.73 },
    purple: { x: 0.785, y: 0.161 },
  },
  {
    red: { x: 0.95, y: 0.17 },
    blue: { x: 0.05, y: 0.23 },
    green: { x: 0.49, y: 0.58 },
    cyan: { x: 0.74, y: 0.53 },
    orange: { x: 0.43, y: 0.14 },
    purple: { x: 0.65, y: 0.23 },
  },
  {
    red: { x: 0.37, y: 0.16 },
    blue: { x: 0.67, y: 0.14 },
    green: { x: 0.77, y: 0.52 },
    cyan: { x: 0.56, y: 0.85 },
    orange: { x: 0.08, y: 0.23 },
    purple: { x: 0.09, y: 0.67 },
  },
  {
    red: { x: 0.29, y: 0.12 },
    blue: { x: 0.71, y: 0.62 },
    green: { x: 0.37, y: 0.84 },
    cyan: { x: 0.11, y: 0.82 },
    orange: { x: 0.74, y: 0.14 },
    purple: { x: 0.08, y: 0.45 },
  },
  {
    red: { x: 0.8, y: 0.49 },
    blue: { x: 0.75, y: 0.87 },
    green: { x: 0.79, y: 0.19 },
    cyan: { x: 0.42, y: 0.18 },
    orange: { x: 0.4, y: 0.44 },
    purple: { x: 0.26, y: 0.74 },
  },
  {
    red: { x: 0.49, y: 0.43 },
    blue: { x: 0.63, y: 0.8 },
    green: { x: 0.64, y: 0.16 },
    cyan: { x: 0.09, y: 0.35 },
    orange: { x: 0.1, y: 0.84 },
    purple: { x: 0.93, y: 0.38 },
  },
];

export const personalitySectorPaths: IPosition[][] = [
  [
    { x: 0, y: 438 },
    { x: 750, y: 438 },
    { x: 777, y: 413 },
    { x: 770, y: 220 },
    { x: 680, y: 0 },
  ],
  [
    { x: 676, y: 716 },
    { x: 629, y: 620 },
    { x: 960, y: 620 },
    { x: 1280, y: 487 },
  ],
  [
    { x: 0, y: 484 },
    { x: 41, y: 467 },
    { x: 41, y: 643 },
    { x: 608, y: 643 },
    { x: 608, y: 503 },
    { x: 1060, y: 503 },
    { x: 1060, y: 575 },
    { x: 1280, y: 575 },
  ],
  [
    { x: 0, y: 574 },
    { x: 49, y: 574 },
    { x: 29, y: 523 },
    { x: 29, y: 523 },
    { x: 29, y: 495 },
    { x: 683, y: 495 },
    { x: 683, y: 625 },
    { x: 705, y: 644 },
    { x: 935, y: 644 },
    { x: 935, y: 720 },
  ],
  [
    { x: 935, y: 0 },
    { x: 935, y: 252 },
    { x: 506, y: 252 },
    { x: 585, y: 436 },
    { x: 0, y: 436 },
  ],
  [{ x: 1280, y: 436 }, { x: 422, y: 436 }, { x: 422, y: 720 }],
];

export const personalityTimerPositions: IPosition[] = [
  { x: 0.36, y: 0.7 },
  { x: 0.185, y: 0.7 },
  { x: 0.56, y: 0.52 },
  { x: 0.48, y: 0.6 },
  { x: 0.07, y: 0.51 },
  { x: 0.92, y: 0.69 },
];

export const personalityNumberColors: StringIndexedObject<string> = {
  red: '#f11848',
  green: '#16d91a',
  blue: '#1879f1',
  cyan: '#f118ed',
  orange: '#ffa200',
  purple: '#8f18f1',
};

export interface ILifeStyleSectionConfig extends IPosition {
  color: number;
}

export interface ILifeStyleSectionPrices
  extends StringIndexedObject<number[][]> {}

export interface IPersonalityMarkersPositions
  extends StringIndexedObject<IPosition> {
  red: IPosition;
  blue: IPosition;
  cyan: IPosition;
  orange: IPosition;
  green: IPosition;
  purple: IPosition;
}
