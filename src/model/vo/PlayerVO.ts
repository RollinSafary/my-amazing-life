import {
  defaultAvatarConfig,
  defaultGamesState,
} from '../../constants/Constants';
import { StringIndexedObject } from '../../utils/Utils';
import {
  IAvatarConfig,
  IHobbiesClusterChoice,
  ILifeStyleChoices,
  ISkillsValues,
  PersonalityChoice,
} from './UiVO';

export class PlayerVO {
  constructor(userData: IPlayerRegistrationData) {
    this.user = userData;
    this.dates = {
      created: Date.now(),
      updated: Date.now(),
    };
    this.avatar = defaultAvatarConfig;
    this.games = defaultGamesState;
    this.backup = null;
  }

  avatar: IAvatarConfig;
  user: IPlayerRegistrationData;
  dates: IPlayerDates;
  games: IGamesPlayerData;
  backup: IGamesPlayerData;
}

export interface IGamesPlayerData {
  lifestyle: ILifeStylePlayerData;
  personality: IPersonalityPlayerData;
  hobbies: IHobbiesPlayerData;
  skills: ISkillsPlayerData;
}

export interface IPlayerRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IGameAvailableState {
  lifeStyle: boolean;
  personality: boolean;
  hobbies: boolean;
  skills: boolean;
}

export interface IPlayerDates {
  created: number;
  updated: number;
}

export interface ILifeStylePlayerData {
  choices: ILifeStyleChoices;
  total: number;
}

export interface IPersonalityPlayerData {
  choices: PersonalityChoice[];
  results: PersonalityChoice;
  bestOption: string;
}

export interface IHobbiesPlayerData {
  option: string;
  clusters: string[];
  results: StringIndexedObject<number>;
  choices: StringIndexedObject<IHobbiesClusterChoice[]>;
}

export interface ISkillsPlayerData {
  skills: ISkillsValues;
}
