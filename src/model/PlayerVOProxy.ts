import { Proxy } from '@candywings/pure-mvc';
import { PlayerVO } from './vo/PlayerVO';

export default class PlayerVOProxy extends Proxy<PlayerVO> {
  public static NAME: string = 'PlayerVOProxy';
  public static INITIALIZE_COMPLETE_NOTIFICATION: string = `${PlayerVOProxy.NAME}InitializeCompleteNotification`;

  constructor(data: PlayerVO) {
    super(PlayerVOProxy.NAME, data);
  }

  public onRegister(): void {
    this.sendNotification(PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION);
  }

  public isLifeStyleComplete(): boolean {
    const keys: string[] = this.getGameKeys('lifestyle');
    for (const key of keys) {
      // TODO: check why implementing from StringIndexedObject doesn't make PlayerVO indexed by string
      if (!(this.vo as any)[key]) {
        return false;
      }
    }
    return true;
  }
  public isPersonalityComplete(): boolean {
    const keys: string[] = this.getGameKeys('personality');
    for (const key of keys) {
      // TODO: check why implementing from StringIndexedObject doesn't make PlayerVO indexed by string
      if (!(this.vo as any)[key]) {
        return false;
      }
    }
    return true;
  }
  public isHobbiesComplete(): boolean {
    const keys: string[] = this.getGameKeys('hobbies');
    for (const key of keys) {
      // TODO: check why implementing from StringIndexedObject doesn't make PlayerVO indexed by string
      if (!(this.vo as any)[key]) {
        return false;
      }
    }
    return true;
  }
  public isSkillsComplete(): boolean {
    const keys: string[] = this.getGameKeys('skills');
    for (const key of keys) {
      // TODO: check why implementing from StringIndexedObject doesn't make PlayerVO indexed by string
      if (!(this.vo as any)[key]) {
        return false;
      }
    }
    return true;
  }

  private getGameKeys(keyWord: string): string[] {
    const keys: string[] = Object.keys(this.vo);
    const unsavedKeys: string[] = keys.filter(
      (key: string) => !key.includes('saved'),
    );
    const keyWordKeys: string[] = unsavedKeys.filter((key: string) =>
      key.includes(keyWord),
    );
    return keyWordKeys;
  }
}
