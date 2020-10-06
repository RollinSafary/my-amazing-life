import { IAvatarConfig } from '../model/vo/UiVo';

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
