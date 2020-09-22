import { StringIndexedObject } from '../utils/Utils';

export enum Orientation {
  PORTRAIT,
  LANDSCAPE,
}

export let gameConfig: IGameScreenConfig = {
  designWidth: 1280,
  designHeight: 720,
  canvasWidth: 1280,
  canvasHeight: 720,
  designRatio: 1,
  deviceRatio: 1,
  orientation: Orientation.LANDSCAPE,
  resolutionMultiplier: 1,
};

export interface IGameScreenConfig extends StringIndexedObject<number> {
  designWidth: number;
  designHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  designRatio: number;
  deviceRatio: number;
  orientation: Orientation;
  resolutionMultiplier: number;
}
