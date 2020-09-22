import 'phaser';
import Game from './Game';
import {
  disableConsoleFunctions,
  disableInspectElement,
  getMode,
} from './utils/Utils';
import { loadCordova } from './utils/wrappers/CordovaWrapper';

if (getMode() === 'production') {
  disableConsoleFunctions();
  disableInspectElement();
}

document.title = Game.NAME;

document.addEventListener('DOMContentLoaded', loadCordova, false);
