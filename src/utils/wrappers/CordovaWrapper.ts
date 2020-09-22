import Game from '../../Game';
//Cordova
declare global {
  interface Window {
    cordovaPlugins: MyCordovaPlugins;
  }
}
interface MyCordovaPlugins {
  // playGamesServices: IPlayGamesServices;
  OneSignal: OneSignalCordovaPlugin.OneSignalCordovaPlugin;
}

export function loadCordova(): void {
  (window as any).defaultOpen = window.open;
  const script = document.createElement('script');
  script.src = 'cordova.js';
  document.head.appendChild(script);
  script.onload = init;
}

function init(): void {
  document.addEventListener('deviceready', () => {
    // CrashlyticsWrapper.initialize();
    switch (window.cordova.platformId) {
      case 'android':
        preparePlugins();
        initAndroid();
        break;
      case 'ios':
        preparePlugins();
        initIOS();
        break;
      case 'browser':
        initBrowser();
        break;
      default:
        console.warn(
          `platform ${window.cordova.platformId} is not expected for handling in CordovaWrapper`,
        );
        break;
    }
  });
}

async function initAndroid(): Promise<void> {
  initAndroidFullScreen()
    .then(() => {
      new Game();
    })
    .catch(error => {
      console.warn(error);
    });
}

function preparePlugins(): void {
  window.cordovaPlugins = {
    OneSignal: (window as any).plugins.OneSignal,
    // playGamesServices: (window as any).plugins.playGamesServices,
  };
}

function initIOS(): void {
  new Game();
}

function initBrowser(): void {
  window.open = (window as any).defaultOpen;
  new Game();
}

async function initAndroidFullScreen(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    AndroidFullScreen.isSupported(() => {
      AndroidFullScreen.immersiveMode(resolve, reject);
    }, reject);
  });
}
