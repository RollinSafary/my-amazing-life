import { Atlases } from '../assets';
import Game from '../Game';
import { gameConfig } from './GameConfig';

export function addNinePatchConfigs(game: Game): void {
  game.cache.custom.ninePatch.add(Atlases.Login.Atlas.Frames.BackgroundLogin, {
    top: 26 * gameConfig.resolutionMultiplier,
  });
  game.cache.custom.ninePatch.add(Atlases.Login.Atlas.Frames.BackgroundError, {
    top: 75 * gameConfig.resolutionMultiplier,
  });
}
