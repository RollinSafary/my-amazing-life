import { IHobbiesFramesData, StringIndexedObject } from '../../utils/Utils';

export class UiVO {
  avatar: IAvatarConfig;
  lifeStyleChoices: ILifeStyleChoices;
  lifeStyleProgress: number;
  lifeStyleTotal: number;
  lifeStyleSubtotal: number;
  lifeStylePanelUsedIndexes: number[];

  personalityChoices: PersonalityChoice[];
  personalityResult: PersonalityChoice;
  personalityIndex: number;
  personalityBestOption: string;

  hobbiesClusters: string[];
  hobbiesResults: StringIndexedObject<number>;
  hobbiesClusterFrames: string[];
  hobbiesImagePairs: string[][];
  hobbiesClusterFramesData: IHobbiesFramesData;
  hobbiesClusterChoices: StringIndexedObject<IHobbiesClusterChoice[]>;

  skillsValues: ISkillsValues;

  constructor() {
    this.lifeStyleChoices = {};
    this.lifeStyleTotal = 0;
    this.lifeStyleProgress = 0;
    this.lifeStyleSubtotal = 0;
    this.lifeStylePanelUsedIndexes = [];

    this.personalityChoices = [new PersonalityChoice()];
    this.personalityResult = new PersonalityChoice();
    this.personalityIndex = 1;
    this.personalityBestOption = 'red';
    // this.personalityBestOption = null;

    this.skillsValues = {
      reading: 1,
      speaking: 1,
      writing: 1,
      analyzing: 1,
      organizing: 1,
      observing: 1,
      decision: 1,
      relationship: 1,
      listening: 1,
      problem: 1,
    };
  }
}

export interface IAvatarConfig extends StringIndexedObject<number | string> {
  color: number;
  hair: number;
  face: number;
  shirt: number;
  breeches: number;
  gender: string;
}

export interface ILifeStyleChoices extends StringIndexedObject<number> {}

export interface IPersonalityChoice extends StringIndexedObject<number> {
  red: number;
  blue: number;
  green: number;
  cyan: number;
  orange: number;
  purple: number;
}

export class PersonalityChoice {
  red: number = 0;
  blue: number = 0;
  green: number = 0;
  cyan: number = 0;
  orange: number = 0;
  purple: number = 0;
}

export interface ISkillsValues extends StringIndexedObject<number> {
  reading: number;
  speaking: number;
  writing: number;
  analyzing: number;
  organizing: number;
  observing: number;
  decision: number;
  relationship: number;
  listening: number;
  problem: number;
}

export interface IHobbiesClusterChoice {
  frameName: string;
  cluster: string;
  index: number;
  value: number;
  selected: boolean;
}
