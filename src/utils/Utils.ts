import { MultiAtlases } from '../assets';
import { lifeStyleSectionsPrices } from '../constants/Constants';
import { Translation } from '../translations';
import {
  getFrame,
  getFramesByName,
  IPosition,
} from '../view/utils/phaser/PhaserUtils';
import { getPlatform, IDevice } from './CordovaUtils';

export type StringIndexedObject<T> = { [key: string]: T };

declare global {
  interface Array<T> {
    contains(element: T): boolean;
    remove(...element: T[]): T[];
    getFirst(): T;
    getLast(): T;
    addAt(index: number, ...elements: T[]): T[];
  }
  interface Window {
    device: IDevice;
  }
}
Array.prototype.contains = function<T>(element: T) {
  return this.indexOf(element) !== -1;
};
Array.prototype.remove = function<T>(...elements: T[]) {
  for (const element of elements) {
    this.contains(element) && this.splice(this.indexOf(element), 1);
  }
  return elements;
};
Array.prototype.getLast = function<T>() {
  return this[this.length - 1];
};
Array.prototype.getFirst = function<T>() {
  return this[0];
};
Array.prototype.addAt = function<T>(index: number, ...elements: T[]) {
  const arrayLastPart: T[] = this.splice(index, this.length - index - 1);
  this.remove(...arrayLastPart);
  this.push(...elements, ...arrayLastPart);
  return this;
};

export function serialize(object: any): any {
  return JSON.parse(JSON.stringify(object));
}

export function blackLog(...args: any[]): void {
  write('#000000', '#ffffff', args.shift(), ...args);
}
export function brownLog(...args: any[]): void {
  write('#654321', '#ffffff', args.shift(), ...args);
}
export function greyLog(...args: any[]): void {
  write('#8e8e8e', '#ffffff', args.shift(), ...args);
}

export function write(
  backgroundColor: string,
  fontColor: string,
  text: any,
  ...args: any[]
): void {
  const consoleArgs: string[] = [
    ``,
    `background: ${'#c8c8ff'}`,
    `background: ${'#9696ff'}`,
    `color: ${fontColor}; background: ${backgroundColor};`,
    `background: ${'#9696ff'}`,
    `background: ${'#c8c8ff'}`,
  ];

  consoleArgs[0] = `%c %c %c ${text} ${
    args ? '\n' + JSON.stringify(args, null, '\t') : ''
  } %c %c`;
  console.log.apply(console, consoleArgs);
}

export function formatTime(ms: number): string {
  const allInSecs: number = Math.floor(ms / 1000);
  let minutes: number = Math.floor(allInSecs / 60);
  let seconds: number = allInSecs % 60;
  minutes = minutes < 0 ? 0 : minutes;
  seconds = seconds < 0 ? 0 : seconds;
  return `${minutes < 10 ? '0' + minutes : minutes}։${
    seconds < 10 ? '0' + seconds : seconds
  }`;
}

export function formatValue(
  value: number,
  fixTo: number = 2,
  roundSmallValues: boolean = false,
): string {
  value = +value.toFixed(2);
  let exponent: number = 0;
  while (1000 ** exponent <= value) {
    exponent++;
  }
  exponent -= 1;
  if (exponent < 0) {
    return value.toString();
  }
  let numberPart: number = +(value / 1000 ** exponent);
  numberPart =
    fixTo === 0
      ? Math.floor(+numberPart.toFixed(3))
      : +numberPart.toFixed(fixTo);
  const postfix: string = generateStringPart(exponent);
  const resultNumber: number =
    fixTo >= 1 || postfix.length > 0
      ? +numberPart.toFixed(numberPart < 100 ? 1 : 0)
      : +numberPart.toFixed(roundSmallValues ? 0 : fixTo);
  return resultNumber + postfix;
}

const ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';

function generateStringPart(exponent: number): string {
  let result: string = '';
  switch (exponent) {
    case 0:
      break;
    case 1:
      result = 'K';
      break;
    case 2:
      result = 'M';
      break;
    case 3:
      result = 'B';
      break;
    case 4:
      result = 'T';
      break;
    default:
      const firstElementIndex: number = Math.floor(
        (exponent - 5) / ALPHABET.length,
      );
      const secondElementIndex: number = (exponent - 5) % ALPHABET.length;
      result += ALPHABET[firstElementIndex];
      result += ALPHABET[secondElementIndex];
      break;
  }
  return result;
}

declare const VERSION: string;

declare const mode: string;
declare const __APP_VERSION__: string;

export function getMode(): string {
  return mode;
}

export function getAppVersion(): string {
  return __APP_VERSION__;
}

export function getGameVersion(): string {
  return VERSION;
}

export function upperCaseFirstLetter(value: string): string {
  return value.substr(0, 1).toUpperCase() + value.substr(1, value.length);
}

export function toKebabCase(value: string): string {
  value.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  value.indexOf('-') === 0 && value.substring(1);
  return value;
}

export function sumArrayValues(...arr: number[]): number {
  let total: number = 0;
  for (const num of arr) {
    total += num;
  }
  return total;
}

export function populateAndConcat(
  array: string[],
  concatWith: string = '',
): string {
  let result: string = '';
  for (const item of array) {
    result += item + concatWith;
  }
  return result;
}

export function isMobile(): boolean {
  return getPlatform() !== 'browser';
}

export function disableConsoleFunctions(): void {
  window.console.log = window.console.info = window.console.warn = window.console.error = () => {};
}

export function disableInspectElement(): void {
  document.onkeydown = function(e: KeyboardEvent) {
    switch (true) {
      case e.keyCode === 123:
      case e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0):
      case e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0):
      case e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0):
      case e.ctrlKey && e.keyCode == 'U'.charCodeAt(0):
        event.preventDefault();
        return false;
      default:
        break;
    }
  };
}

export function getFramesCountByString(node: any, str: string): number {
  const keys: string[] = Object.keys(node);
  return keys.filter((value: string) => value.indexOf(str) !== -1).length;
}

export function validateEmail(email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function isNullOrUndefined(value: any): boolean {
  return value === undefined || value === null;
}

export function getLifeStylePanelItemPrice(
  posX: number,
  posY: number,
  index: number,
): number[] {
  return lifeStyleSectionsPrices[`${posX}-${posY}`][index];
}

export function getLifeStylePanelItemPriceKey(
  posX: number,
  posY: number,
  index: number,
): string {
  switch (true) {
    case posX === 5 && posY === 3:
    case posX === 1 && posY === 3:
      return Translation.LIFESTYLE_PRICE_PERCENT;
    default:
      return Translation.LIFESTYLE_PRICE_DOLLAR;
  }
}

export function getLifeStylePanelItemAddonState(
  posX: number,
  posY: number,
  index: number,
): boolean {
  switch (true) {
    case posX === 4 && posY === 0 && index === 3:
    case posX === 0 && posY === 1:
    case posX === 0 && posY === 2:
      return true;
    default:
      return false;
  }
}

export function getHobbiesClusters(color: string): string[] {
  switch (color) {
    case 'red':
      return [
        'ac',
        'hsc',
        'it',
        'stem',
        'bma',
        'tdl',
        'mfg',
        'fnc',
        'mss',
        'et',
        'gps',
        'ht',
      ];
    case 'green':
      return ['ac', 'it', 'stem', 'aatc'];
    case 'blue':
      return ['ac', 'hsc', 'stem', 'tdl', 'mfg', 'afn', 'aatc', 'lpss'];
    case 'cyan':
      return ['hsc', 'stem', 'afn', 'et', 'hs', 'gps'];
    case 'orange':
      return ['ac', 'hsc', 'it', 'stem', 'bma', 'mss', 'afn'];
    case 'purple':
      return [
        'it',
        'bma',
        'tdl',
        'mfg',
        'fnc',
        'mss',
        'afn',
        'aatc',
        'et',
        'gps',
        'ht',
        'hs',
        'lpss',
      ];
    default:
      break;
  }
}

export function generateHobbiesFrames(clusters: string[]): IHobbiesFramesData {
  const duplicates: IHobbiesFrameData[] = [];
  const allFrames: string[] = [];
  const clusterFrames: IFramesByClusters = {};
  for (const cluster of clusters) {
    const frames = getFramesByName(
      MultiAtlases.Hobbies.Atlas.Name,
      `/${cluster}-`,
    );
    clusterFrames[cluster] = frames;
    allFrames.push(...frames);
  }
  const uniqueFrames = allFrames.slice();
  for (let i: number = 0; i < clusters.length - 1; i++) {
    const cluster = clusters[i];
    const currentClusterFrames = clusterFrames[cluster];
    allFrames.remove(...currentClusterFrames);
    for (let ii: number = 0; ii < currentClusterFrames.length; ii++) {
      const frameNameII: string = currentClusterFrames[ii];
      const frameII = getFrame(
        MultiAtlases.Hobbies.Atlas.Name,
        frameNameII,
      ) as IFrame;
      const frames: string[] = [frameNameII];
      const values: number[] = [getValueFromFrame(frameNameII)];
      const indexes: number[] = [getIndexFromFrame(frameNameII)];
      const clusters: string[] = [cluster];
      for (let j: number = 0; j < allFrames.length; j++) {
        const frameNameJ: string = allFrames[j];
        const frameJ = getFrame(
          MultiAtlases.Hobbies.Atlas.Name,
          frameNameJ,
        ) as IFrame;
        if (areFramesSame(frameII, frameJ)) {
          const value: number = getValueFromFrame(frameNameJ);
          clusters.push(getClusterFromFrame(frameNameJ));
          frames.push(frameNameJ);
          values.push(value);
          indexes.push(getIndexFromFrame(frameNameJ));
        }
      }
      if (frames.length > 1) {
        allFrames.remove(...frames);
        duplicates.push({
          frames,
          values,
          clusters,
          indexes,
        });
      }
    }
  }
  const duplicateFrames: string[] = [];
  for (const value of duplicates) {
    duplicateFrames.push(...value.frames);
  }
  uniqueFrames.remove(...duplicateFrames);
  return {
    duplicates,
    uniques: uniqueFrames.map((frameName: string) => {
      return {
        clusters: [getClusterFromFrame(frameName)],
        frames: [frameName],
        values: [getValueFromFrame(frameName)],
        indexes: [getIndexFromFrame(frameName)],
      };
    }),
  };
}

function areFramesSame(frameI: IFrame, frameJ: IFrame): boolean {
  return (
    frameI.canvasData.x === frameJ.canvasData.x &&
    frameI.canvasData.y === frameJ.canvasData.y
  );
}

export function getValueFromFrame(frame: string): number {
  return +frame.substring(frame.lastIndexOf('v') + 1, frame.length);
}
export function getClusterFromFrame(frame: string): string {
  return frame.substring(frame.indexOf('/') + 1, frame.indexOf('-'));
}
export function getIndexFromFrame(frame: string): number {
  return +frame[frame.lastIndexOf('-') - 1];
}

export interface IHobbiesFrameData {
  clusters: string[];
  frames: string[];
  indexes: number[];
  values: number[];
}

export interface IFramesByClusters extends StringIndexedObject<string[]> {}

export interface IHobbiesFramesData {
  duplicates: IHobbiesFrameData[];
  uniques: IHobbiesFrameData[];
}

class IFrame extends Phaser.Textures.Frame {
  canvasData: IPosition;
}
