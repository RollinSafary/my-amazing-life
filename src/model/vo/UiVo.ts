import { StringIndexedObject } from '../../utils/Utils';

export class UiVO {
  avatar: IAvatarConfig;

  constructor() {}
}

export interface IAvatarConfig extends StringIndexedObject<number | string> {
  color: number;
  hair: number;
  face: number;
  shirt: number;
  breeches: number;
  gender: string;
}
