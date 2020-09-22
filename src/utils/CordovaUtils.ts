// Plugins
// cordova-plugin-facebook4
export interface IFacebookConnectPlugin {
  api: (
    graphPath: string,
    permissions: Object,
    successCallback: Function,
    failCallback: Function,
  ) => void;
  browserInit: (
    appId: number | string,
    version: string,
    successCallback: Function,
  ) => void;
  getAccessToken: (successCallback: Function, failCallback: Function) => void;
  getLoginStatus: (successCallback: Function, failCallback: Function) => void;
  logEvent: (
    eventName: string,
    params: Object,
    valueToSub: any,
    successCallback: Function,
    failCallback: Function,
  ) => void;
  logPurchase: (
    value: any,
    currency: string,
    successCallback: Function,
    failCallback: Function,
  ) => void;
  login: (
    permissions: Object,
    successCallback: Function,
    failCallback: Function,
  ) => void;
  logout: (successCallback: Function, failCallback: Function) => void;
  showDialog: (
    options: Object,
    successCallback: Function,
    failCallback: Function,
  ) => void;
}

export interface IDevice {
  available: boolean;
  cordova: string;
  isVirtual: boolean;
  manufacturer: string;
  model: string;
  platform: string;
  serial: string;
  uuid: string;
  version: string;
}

export function getPlatform(): string {
  return window.device.platform.toLowerCase();
}
