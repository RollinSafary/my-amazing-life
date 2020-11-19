import { Proxy } from '@candywings/pure-mvc';
import { Translation } from '../translations';
import {
  generateHobbiesFrames,
  getHobbiesClusters,
  getLifeStylePanelItemAddonState,
  getLifeStylePanelItemPriceKey,
  IHobbiesFrameData,
  sumArrayValues,
} from '../utils/Utils';
import { setDataToStorage, StorageKey } from '../utils/wrappers/StorageWrapper';
import { ILifeStylePanelConfig } from '../view/components/lifestyle/panel/LifeStylePanel';
import { pickAny } from '../view/utils/phaser/PhaserUtils';
import { IGamesPlayerData } from './vo/PlayerVO';
import {
  IAvatarConfig,
  IPersonalityChoice,
  PersonalityChoice,
  UiVO,
} from './vo/UiVO';

export default class UiVOProxy extends Proxy<UiVO> {
  public static NAME: string = 'UiVOProxy';
  public static REGISTERED_NOTIFICATION: string = `${UiVOProxy.NAME}RegisteredNotification`;
  public static AVATAR_CONFIGURATION_UPDATED_NOTIFICATION: string = `${UiVOProxy.NAME}AvatarConfigurationUpdatedNotification`;
  public static AVATAR_CONFIGURATION_CLEARED_NOTIFICATION: string = `${UiVOProxy.NAME}AvatarConfigurationClearedNotification`;
  public static AVATAR_CONFIGURATION_SAVED_NOTIFICATION: string = `${UiVOProxy.NAME}AvatarConfigurationSavedNotification`;
  public static LIFE_STYLE_GAME_COMPLETE_NOTIFICATION: string = `${UiVOProxy.NAME}LifeStyleGameCompleteNotification`;
  public static LIFE_STYLE_OPTION_SELECTED_NOTIFICATION: string = `${UiVOProxy.NAME}LifeStyleOptionSelectedNotification`;
  public static LIFE_STYLE_OPTION_CONFIRMED_NOTIFICATION: string = `${UiVOProxy.NAME}LifeStyleOptionConfirmedNotification`;

  public static PERSONALITY_CHOICE_NOTIFICATION: string = `${UiVOProxy.NAME}PersonalityChoiceNotification`;
  public static PERSONALITY_SECTOR_RESET_NOTIFICATION: string = `${UiVOProxy.NAME}PersonalitySectorResetNotification`;
  public static PERSONALITY_SECTOR_READY_NOTIFICATION: string = `${UiVOProxy.NAME}PersonalitySectorReadyNotification`;
  public static PERSONALITY_SECTOR_COMPLETE_NOTIFICATION: string = `${UiVOProxy.NAME}PersonalitySectorCompleteNotification`;
  public static PERSONALITY_GAME_COMPLETE_NOTIFICATION: string = `${UiVOProxy.NAME}PersonalityGameCompleteNotification`;

  public static HOBBIES_CLUSTERS_PREPARED_NOTIFICATION: string = `${UiVOProxy.NAME}HobbiesClustersPreparedNotification`;
  public static HOBBIES_CLUSTER_ELEMENT_CHOICE_NOTIFICATION: string = `${UiVOProxy.NAME}HobbiesClusterElementChoiceNotification`;
  public static HOBBIES_GAME_COMPLETE_NOTIFICATION: string = `${UiVOProxy.NAME}HobbiesGameCompleteNotification`;

  public static SKILLS_GAME_COMPLETE_NOTIFICATION: string = `${UiVOProxy.NAME}SkillsGameCompleteNotification`;

  constructor() {
    super(UiVOProxy.NAME, new UiVO());
  }

  public onRegister(): void {
    this.sendNotification(UiVOProxy.REGISTERED_NOTIFICATION);
  }

  public setLoadedData(games: IGamesPlayerData): void {
    if (games.lifestyle) {
      this.vo.lifeStyleChoices = games.lifestyle.choices;
      this.vo.lifeStyleTotal = games.lifestyle.total;
    }
    if (games.personality) {
      this.vo.personalityBestOption = games.personality.bestOption;
      this.vo.personalityResult = games.personality.results;
      this.vo.personalityChoices = games.personality.choices;
    }
    if (games.hobbies) {
      this.vo.hobbiesClusterChoices = games.hobbies.choices;
      this.vo.hobbiesClusters = games.hobbies.clusters;
      this.vo.hobbiesResults = games.hobbies.results;
    }
    if (games.skills) {
      this.vo.skillsValues = games.skills.skills;
    }
  }

  // AVATAR
  public updateAvatarConfiguration(key: string, value: number | string): void {
    this.vo.avatar[key] = value;
    key === 'gender' && this.clearAvatarConfiguration();
    this.sendNotification(UiVOProxy.AVATAR_CONFIGURATION_UPDATED_NOTIFICATION);
  }

  public clearAvatarConfiguration(): void {
    this.vo.avatar.color = 0;
    this.vo.avatar.hair = -1;
    this.vo.avatar.face = -1;
    this.vo.avatar.shirt = -1;
    this.vo.avatar.breeches = -1;
    this.sendNotification(UiVOProxy.AVATAR_CONFIGURATION_CLEARED_NOTIFICATION);
  }

  public async setAvatarConfig(avatar: IAvatarConfig): Promise<void> {
    this.vo.avatar = avatar;
    this.sendNotification(UiVOProxy.AVATAR_CONFIGURATION_UPDATED_NOTIFICATION);
  }

  public saveAvatarConfiguration(email: string): void {
    setDataToStorage(StorageKey.AVATAR, email, this.vo.avatar);
    this.sendNotification(UiVOProxy.AVATAR_CONFIGURATION_SAVED_NOTIFICATION);
  }

  // LIFESTYLE
  public setLifeStyleChoice(
    config: ILifeStylePanelConfig,
    index: number,
    value: number,
  ): void {
    if (this.vo.lifeStylePanelUsedIndexes.includes(index)) {
      return;
    }
    const type: string = getLifeStylePanelItemPriceKey(
      config.xIndex,
      config.yIndex,
      index,
    );
    const isAddon: boolean = getLifeStylePanelItemAddonState(
      config.xIndex,
      config.yIndex,
      index,
    );
    if (isAddon) {
      this.vo.lifeStylePanelUsedIndexes.push(index);
      this.vo.lifeStyleSubtotal += value;
    } else {
      this.vo.lifeStylePanelUsedIndexes = [];
      this.vo.lifeStyleSubtotal =
        type === Translation.LIFESTYLE_PRICE_PERCENT
          ? Math.round(
              this.vo.lifeStyleTotal / ((100 - value) / 100) -
                this.vo.lifeStyleTotal,
            )
          : Math.round(value);
    }
    this.vo.lifeStyleChoices[
      `${config.xIndex}-${config.yIndex}`
    ] = this.vo.lifeStyleSubtotal;

    this.sendNotification(
      UiVOProxy.LIFE_STYLE_OPTION_SELECTED_NOTIFICATION,
      true,
    );
  }

  public clearLifeStyleChoice(): void {
    const key: string = Object.keys(this.vo.lifeStyleChoices).getLast();
    delete this.vo.lifeStyleChoices[key];
    this.vo.lifeStyleSubtotal = 0;
    this.vo.lifeStylePanelUsedIndexes = [];
    this.sendNotification(
      UiVOProxy.LIFE_STYLE_OPTION_SELECTED_NOTIFICATION,
      false,
    );
  }

  public confirmLifeStyleChoice(): void {
    this.vo.lifeStyleTotal += this.vo.lifeStyleSubtotal;
    this.vo.lifeStylePanelUsedIndexes = [];
    this.vo.lifeStyleSubtotal = 0;
    this.vo.lifeStyleProgress++;
    Object.keys(this.vo.lifeStyleChoices).length === 12
      ? this.sendNotification(UiVOProxy.LIFE_STYLE_GAME_COMPLETE_NOTIFICATION)
      : this.sendNotification(
          UiVOProxy.LIFE_STYLE_OPTION_CONFIRMED_NOTIFICATION,
        );
  }

  public resetLifeStyle(): void {
    this.vo.lifeStyleChoices = {};
    this.vo.lifeStylePanelUsedIndexes = [];
    this.vo.lifeStyleSubtotal = 0;
    this.vo.lifeStyleTotal = 0;
    this.vo.lifeStyleProgress = 0;
  }

  // PERSONALITY

  public resetPersonality(): void {
    this.vo.personalityBestOption = null;
    this.vo.personalityChoices = [new PersonalityChoice()];
    this.vo.personalityIndex = 1;
    this.vo.personalityResult = new PersonalityChoice();
  }

  public applyPersonalityMarkerChoice(
    sectorIndex: number,
    colorName: string,
  ): void {
    (this.vo.personalityChoices as IPersonalityChoice[])[sectorIndex][
      colorName
    ] = this.vo.personalityIndex;
    this.sendNotification(
      UiVOProxy.PERSONALITY_CHOICE_NOTIFICATION,
      colorName,
      this.vo.personalityIndex,
    );
    this.vo.personalityIndex++;
    this.vo.personalityIndex === 7 &&
      this.sendNotification(UiVOProxy.PERSONALITY_SECTOR_READY_NOTIFICATION);
  }

  public applyPersonalitySectorComplete(): void {
    if (this.vo.personalityChoices.length !== 6) {
      this.vo.personalityChoices.push(new PersonalityChoice());
      this.vo.personalityIndex = 1;
      this.sendNotification(UiVOProxy.PERSONALITY_SECTOR_COMPLETE_NOTIFICATION);
    } else {
      this.calculatePersonalityResults();
      this.sendNotification(UiVOProxy.PERSONALITY_GAME_COMPLETE_NOTIFICATION);
    }
  }

  private calculatePersonalityResults(): void {
    const keys: string[] = Object.keys(this.vo.personalityResult);
    let total: number = 0;
    for (const choice of this.vo.personalityChoices) {
      for (const key of keys) {
        (this.vo.personalityResult as IPersonalityChoice)[
          key
        ] += (choice as IPersonalityChoice)[key];
        total += (choice as IPersonalityChoice)[key];
      }
    }
    for (const key of keys) {
      (this.vo.personalityResult as IPersonalityChoice)[key] =
        Math.round(
          ((this.vo.personalityResult as IPersonalityChoice)[key] / total) *
            10000,
        ) / 100;
    }
    this.calculatePersonalityBestOption();
  }

  public applyPersonalitySectorReset(): void {
    this.vo.personalityChoices.pop();
    this.vo.personalityChoices.push(new PersonalityChoice());
    this.vo.personalityIndex = 1;
    this.sendNotification(UiVOProxy.PERSONALITY_SECTOR_RESET_NOTIFICATION);
  }

  public applyPersonalityReset(): void {
    this.vo.personalityChoices = [new PersonalityChoice()];
    this.vo.personalityIndex = 1;
  }

  private calculatePersonalityBestOption(): void {
    const keys: string[] = Object.keys(this.vo.personalityResult);
    const values: number[] = keys.map(
      (key: string) =>
        6 - (this.vo.personalityResult as IPersonalityChoice)[key],
    );
    const maxValue: number = Math.max(...values);
    // TODO: need to handle cases when there are multiple maxValues
    this.vo.personalityBestOption = keys[values.indexOf(maxValue)];
  }

  // HOBBIES
  public resetHobbies(): void {
    this.vo.hobbiesClusterChoices = null;
    this.vo.hobbiesClusterFrames = [];
    this.vo.hobbiesClusterFramesData = null;
    this.vo.hobbiesClusters = [];
    this.vo.hobbiesImagePairs = [];
    this.vo.hobbiesResults = null;
  }

  public prepareHobbiesGameData(): void {
    this.prepareHobbiesClusters();
    const frames = this.prepareHobbiesFrames();
    this.prepareHobbiesChoices(frames);
    this.generateHobbiesImagePairs(frames);
    this.sendNotification(UiVOProxy.HOBBIES_CLUSTERS_PREPARED_NOTIFICATION);
  }

  private prepareHobbiesClusters(): void {
    this.vo.hobbiesClusters = getHobbiesClusters(this.vo.personalityBestOption);
  }

  private prepareHobbiesFrames(): string[] {
    this.vo.hobbiesClusterFramesData = generateHobbiesFrames(
      this.vo.hobbiesClusters,
    );
    let hobbiesClusterFrames = this.vo.hobbiesClusterFramesData.duplicates.map(
      value => value.frames[0],
    );
    hobbiesClusterFrames.push(
      ...this.vo.hobbiesClusterFramesData.uniques.map(value => value.frames[0]),
    );
    hobbiesClusterFrames = hobbiesClusterFrames.splice(
      0,
      Math.min(hobbiesClusterFrames.length, 40),
    );
    return hobbiesClusterFrames;
  }

  private generateHobbiesImagePairs(frames: string[]): void {
    this.vo.hobbiesImagePairs = [];
    for (let i: number = 0; i < 20; i++) {
      const pair: string[] = [];
      pair.push(pickAny(frames));
      frames.remove(...pair);
      pair.push(pickAny(frames));
      frames.remove(...pair);
      this.vo.hobbiesImagePairs.push(pair);
    }
  }

  private prepareHobbiesChoices(hobbiesClusterFrames: string[]): void {
    this.vo.hobbiesClusterChoices = {};
    this.vo.hobbiesResults = {};
    for (const cluster of this.vo.hobbiesClusters) {
      this.vo.hobbiesClusterChoices[cluster] = [];
      this.vo.hobbiesResults[cluster] = 0;
    }
    for (const frame of hobbiesClusterFrames) {
      const frameData = this.hobbiesGetFrameData(frame);
      for (let i: number = 0; i < frameData.frames.length; i++) {
        this.vo.hobbiesClusterChoices[frameData.clusters[i]].push({
          frameName: frameData.frames[i],
          cluster: frameData.clusters[i],
          index: frameData.indexes[i],
          value: frameData.values[i],
          selected: false,
        });
      }
    }
  }

  private hobbiesGetFrameData(frame: string): IHobbiesFrameData {
    return (
      this.vo.hobbiesClusterFramesData.duplicates.find(element =>
        element.frames.includes(frame),
      ) ||
      this.vo.hobbiesClusterFramesData.uniques.find(element =>
        element.frames.includes(frame),
      )
    );
  }

  public applyHobbyChoice(frameName: string): void {
    this.vo.hobbiesImagePairs.shift();
    const frameData: IHobbiesFrameData = [
      ...this.vo.hobbiesClusterFramesData.duplicates,
      ...this.vo.hobbiesClusterFramesData.uniques,
    ].find((frameData: IHobbiesFrameData) =>
      frameData.frames.includes(frameName),
    );
    for (let i: number = 0; i < frameData.frames.length; i++) {
      const cluster: string = frameData.clusters[i];
      const frame: string = frameData.frames[i];
      const choice = this.vo.hobbiesClusterChoices[cluster].find(
        choice => choice.frameName === frame,
      );
      choice.selected = true;
    }
    this.sendNotification(
      UiVOProxy.HOBBIES_CLUSTER_ELEMENT_CHOICE_NOTIFICATION,
      frameName,
    );
    if (this.vo.hobbiesImagePairs.length === 0) {
      this.calculateHobbiesGameResult();
    }
  }

  private calculateHobbiesGameResult(): void {
    const clusters: string[] = Object.keys(this.vo.hobbiesClusterChoices);
    const results: number[] = [];
    for (const cluster of clusters) {
      const selectedChoices = this.vo.hobbiesClusterChoices[cluster].filter(
        choice => choice.selected,
      );
      const sum: number = sumArrayValues(
        ...selectedChoices.map(choice => choice.value),
      );
      results.push(sum);
      this.vo.hobbiesResults[cluster] = sum;
    }
    const sortedResults = results.slice().sort((a, b) => b - a);
    const firstIndex: number = results.indexOf(sortedResults[0]);
    const secondIndex: number = results.indexOf(sortedResults[1]);
    this.sendNotification(
      UiVOProxy.HOBBIES_GAME_COMPLETE_NOTIFICATION,
      clusters[firstIndex],
      clusters[secondIndex],
    );
  }

  // SKILL
  public setSkillsOptionValue(name: string, value: number): void {
    this.vo.skillsValues[name] = value;
  }

  public checkSkillOptionValues(): boolean {
    const keys: string[] = Object.keys(this.vo.skillsValues);
    const values: number[] = keys.map(
      (key: string) => this.vo.skillsValues[key],
    );
    const topValues: number[] = values.filter((value: number) => value === 9);
    return topValues.length === 1;
  }

  public getBestSkill(): string {
    const keys: string[] = Object.keys(this.vo.skillsValues);
    const values: number[] = keys.map(
      (key: string) => this.vo.skillsValues[key],
    );
    const index: number = values.indexOf(9);
    return keys[index];
  }
  public resetSkills(): void {
    const keys: string[] = Object.keys(this.vo.skillsValues);
    for (const key of keys) {
      this.vo.skillsValues[key] = 1;
    }
  }
}
