import { Atlases } from '../assets';
import Game from '../Game';
import { gameConfig } from './GameConfig';

export function addNinePatchConfigs(game: Game): void {
  game.cache.custom.ninePatch.add(Atlases.Loading.Atlas.Frames.LoadingFill, {
    top: 0,
    left: 3 * gameConfig.resolutionMultiplier,
  });
  game.cache.custom.ninePatch.add(
    Atlases.Popups.Atlas.Frames.BackgroundOrange,
    {
      top: 26 * gameConfig.resolutionMultiplier,
    },
  );
  game.cache.custom.ninePatch.add(Atlases.Popups.Atlas.Frames.BackgroundRed, {
    top: 75 * gameConfig.resolutionMultiplier,
  });
  game.cache.custom.ninePatch.add(Atlases.Popups.Atlas.Frames.BackgroundBlue, {
    top: 65 * gameConfig.resolutionMultiplier,
  });
  game.cache.custom.ninePatch.add(Atlases.Popups.Atlas.Frames.BackgroundGreen, {
    top: 94 * gameConfig.resolutionMultiplier,
  });
  game.cache.custom.ninePatch.add(
    Atlases.Popups.Atlas.Frames.BackgroundYellow,
    {
      top: 75 * gameConfig.resolutionMultiplier,
    },
  );
  game.cache.custom.ninePatch.add(Atlases.Popups.Atlas.Frames.BackgroundPink, {
    top: 78 * gameConfig.resolutionMultiplier,
    left: 52 * gameConfig.resolutionMultiplier,
  });
  game.cache.custom.ninePatch.add(Atlases.Avatar.Atlas.Frames.Frame, {
    top: 36 * gameConfig.resolutionMultiplier,
  });
}
