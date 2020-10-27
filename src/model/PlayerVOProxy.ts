import { Proxy } from '@candywings/pure-mvc';
import { StringIndexedObject } from '../utils/Utils';
import { setUserDataAsync } from '../view/utils/FirebaseUtils';
import { PlayerVO } from './vo/PlayerVO';
import {
  IAvatarConfig,
  IHobbiesClusterChoice,
  ILifeStyleChoices,
  ISkillsValues,
  PersonalityChoice,
} from './vo/UiVO';

export default class PlayerVOProxy extends Proxy<PlayerVO> {
  public static NAME: string = 'PlayerVOProxy';
  public static INITIALIZE_COMPLETE_NOTIFICATION: string = `${PlayerVOProxy.NAME}InitializeCompleteNotification`;
  public static SAVE_COMPLETE_NOTIFICATION: string = `${PlayerVOProxy.NAME}SaveCompleteNotification`;

  constructor(data: PlayerVO) {
    super(PlayerVOProxy.NAME, data);
  }

  public onRegister(): void {
    this.sendNotification(PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION);
  }

  public setAvatar(avatar: IAvatarConfig): void {
    this.vo.avatar = avatar;
    this.save();
  }

  public saveLifeStyleResults(choices: ILifeStyleChoices, total: number): void {
    this.vo.games.lifestyle = {
      choices,
      total,
    };
    this.save();
  }

  public savePersonalityResults(
    bestOption: string,
    choices: PersonalityChoice[],
    results: PersonalityChoice,
  ): void {
    this.vo.games.personality = {
      bestOption,
      choices,
      results,
    };
    this.vo.games.hobbies = null;
    this.save();
  }

  public saveHobbiesResults(
    option: string,
    clusters: string[],
    results: StringIndexedObject<number>,
    choices: StringIndexedObject<IHobbiesClusterChoice[]>,
  ): void {
    this.vo.games.hobbies = {
      option,
      clusters,
      results,
      choices,
    };
    this.save();
  }

  public saveSkillsResults(skills: ISkillsValues): void {
    this.vo.games.skills = {
      skills,
    };
    this.vo.dates.updated = Date.now();
    this.save();
  }

  private async save(): Promise<void> {
    await setUserDataAsync(this.vo);
    this.sendNotification(PlayerVOProxy.SAVE_COMPLETE_NOTIFICATION);
  }
}
