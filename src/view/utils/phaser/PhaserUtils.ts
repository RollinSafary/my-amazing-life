import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';
import { gameConfig } from '../../../constants/GameConfig';
import Game from '../../../Game';
import GameFacade from '../../../GameFacade';
import { getPlatform } from '../../../utils/CordovaUtils';
import { getMode } from '../../../utils/Utils';
import BaseScene from '../../scenes/BaseScene';
import ServiceScene from '../../scenes/ServiceScene';

// game configs start

export function setUpDimension(): void {
  window.innerWidth > window.innerHeight
    ? setUpLandscapeDimensions()
    : setUpPortraitDimensions();
}

function setUpLandscapeDimensions(): void {
  let screenWidth: number = window.innerWidth / window.devicePixelRatio;
  let screenHeight: number = window.innerHeight / window.devicePixelRatio;
  const designMultiplier: number =
    gameConfig.canvasHeight / gameConfig.canvasWidth;
  const screenMultiplier: number = screenHeight / screenWidth;
  const difMultiplier: number = designMultiplier / screenMultiplier;
  if (difMultiplier > 1) {
    gameConfig.canvasWidth *= difMultiplier;
  } else {
    gameConfig.canvasHeight /= difMultiplier;
  }
}
function setUpPortraitDimensions(): void {
  let screenWidth: number = window.innerWidth / window.devicePixelRatio;
  let screenHeight: number = window.innerHeight / window.devicePixelRatio;
  const designMultiplier: number =
    gameConfig.canvasWidth / gameConfig.canvasHeight;
  const screenMultiplier: number = screenHeight / screenWidth;
  const difMultiplier: number = designMultiplier / screenMultiplier;
  if (difMultiplier > 1) {
    gameConfig.canvasHeight *= difMultiplier;
  } else {
    gameConfig.canvasWidth /= difMultiplier;
  }
}

export function generateGameConfiguration(): any {
  setUpDimension();
  return {
    type: Phaser.WEBGL,
    width: gameConfig.canvasWidth,
    height: gameConfig.canvasHeight,
    parent: 'game-container',
    title: Game.NAME,
    transparent: false,
    background: 'black',
    roundPixels: true,
    disableContextMenu:
      getMode().toLowerCase() === 'production' || getPlatform() !== 'browser',
    dom: {
      createContainer: false,
    },
    plugins: {
      global: [
        { key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true },
      ],
    },
    banner: {
      text: '#ffffff',
      background: ['#fff200', '#38f0e8', '#00bff3', '#ec008c'],
      hidePhaser: false,
    },
  };
}

// game configs end

// getTexture start

export function getKey(key: string): Phaser.Textures.Texture {
  return getScene(ServiceScene.NAME).textures.get(key);
}

export function getFrame(key: string, frame: string): Phaser.Textures.Frame {
  return getScene(ServiceScene.NAME).textures.getFrame(key, frame);
}

export function getFramesByName(key: string, name: string): string[] {
  const scene = getScene(ServiceScene.NAME);
  const texture = scene.textures.get(key);
  const frames = texture.getFrameNames(false);
  const frameNames: string[] = frames.filter((frame: string) =>
    frame.includes(name),
  );
  return frameNames.sort((a: string, b: string) => {
    const aIndex: number = +a.substring(a.lastIndexOf('-'), a.length);
    const bIndex: number = +b.substring(b.lastIndexOf('-'), b.length);
    return bIndex - aIndex;
  });
}
// getTexture end

// textures start

export async function loadImageFromUrl(
  scene: BaseScene,
  key: string,
  url: string,
  corsEnabled: boolean = true,
  defaultBase64?: string,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!key || !url) {
      scene.textures.addBase64(key, defaultBase64);
      scene.textures.on(Phaser.Textures.Events.ADD, resolve);
    }
    hasKey(key) && scene.textures.removeKey(key);
    const headers: Headers = new Headers({});
    const request: Request = new Request(url);
    const options: any = {
      method: 'GET',
      headers,
      mode: corsEnabled ? 'cors' : 'no-cors',
      cache: 'default',
    };
    fetch(request, options)
      .then((response: any) => {
        response
          .arrayBuffer()
          .then((buffer: any) => {
            const imageStr: string = Phaser.Utils.Base64.ArrayBufferToBase64(
              buffer,
              'image/jpeg',
            );
            return imageStr;
          })
          .then((base64: string) => {
            scene.textures.addBase64(key, base64);
            scene.textures.on(Phaser.Textures.Events.ADD, resolve);
          });
      })
      .catch((err: any) => {
        console.error(err);

        if (defaultBase64) {
          hasKey(key) && scene.textures.removeKey(key);
          scene.textures.addBase64(key, defaultBase64);
          resolve();
        } else {
          resolve();
        }
      });
  });
}

export function arrayBufferToBase64(buffer: any): any {
  let binary: string = '';
  const bytes: any = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b: any) => (binary += String.fromCharCode(b)));

  return window.btoa(binary);
}

export function hasKey(key: string): boolean {
  return GameFacade.game.textures.getTextureKeys().contains(key);
}

export function hasFrame(key: string, frameName: string): boolean {
  const texture: Phaser.Textures.Texture = (GameFacade.game.textures
    .list as any)[key];
  const frameNames: string[] = texture.getFrameNames();
  return frameNames.contains(frameName);
}

export function removeTexture(key: string): void {
  const serviceScene: ServiceScene = getScene(ServiceScene.NAME);
  hasKey(key) && serviceScene.textures.remove(key);
  hasKey(key) && serviceScene.textures.removeKey(key);
}

// textures end

// runnables start

export function delayRunnable(
  scene: Phaser.Scene,
  delay: number,
  runnable: Function,
  context?: any,
  ...args: any[]
): Phaser.Time.TimerEvent {
  const timerEvent: Phaser.Time.TimerEvent = _addRunnable(
    scene,
    delay,
    runnable,
    context,
    false,
    ...args,
  );
  return timerEvent;
}

export function loopRunnable(
  scene: Phaser.Scene,
  delay: number,
  runnable: (...args: any[]) => any,
  context: any,
  ...args: any[]
): Phaser.Time.TimerEvent {
  return _addRunnable(scene, delay, runnable, context, true, ...args);
}

export function postRunnable(
  runnable: Function,
  context?: any,
  ...args: any[]
): Phaser.Time.TimerEvent {
  const serviceScene: ServiceScene = getScene(ServiceScene.NAME);
  return delayRunnable(
    serviceScene,
    serviceScene.game.loop.delta,
    runnable,
    context,
    ...args,
  );
}

function _addRunnable(
  scene: Phaser.Scene,
  delay: number,
  runnable: Function,
  context: any,
  loop: boolean = false,
  ...args: any[]
): Phaser.Time.TimerEvent {
  return scene.time.addEvent({
    delay,
    callback: runnable,
    callbackScope: context,
    loop,
    args,
  });
}

export function removeRunnable(runnable: Phaser.Time.TimerEvent): void {
  !!runnable && runnable.destroy();
}

// runnables end

// other utils start

export function getScene<T extends Phaser.Scene>(name: string): T {
  return GameFacade.game.scene.getScene(name) as T;
}

export function pickAny<T>(array: Array<T>): T {
  return array[Phaser.Math.Between(0, array.length - 1)];
}

// other utils end

export function fromObjectToArgs(object: any, keys?: string[]): any[] {
  const currentKeys: string[] = Object.keys(object);
  for (let i: number = 0; i < keys.length; i++) {
    const key: string = keys[i];
    if (currentKeys.contains(key)) {
      currentKeys.remove(key);
      currentKeys.addAt(i, key);
    }
  }
  return keys.map((key: string) => object[key]);
}

declare global {
  interface Window {
    enableUiDebug: () => void;
  }
}

export interface IPosition {
  x: number;
  y: number;
  angle?: number;
}

export interface ITextStyle {
  fontFamily?: string;
  fontSize?: number;
  fill?: string;
}

export interface ISize {
  width: number;
  height: number;
}

export interface ILimitation {
  min: number;
  max: number;
}

export interface IImageConfig {
  key: string;
  frame?: string;
}
