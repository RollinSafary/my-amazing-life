import { IAvatarConfig } from '../model/vo/UiVo';
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

export const lifeStyleSections: IPosition[] = [
  { x: 2, y: 0 },
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 6, y: 1 },
  { x: 6, y: 2 },
  { x: 5, y: 3 },
  { x: 4, y: 3 },
  { x: 2, y: 3 },
  { x: 1, y: 3 },
  { x: 0, y: 2 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
];
