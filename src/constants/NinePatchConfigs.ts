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
  game.cache.custom.ninePatch.add(Atlases.Popups.Atlas.Frames.BackgroundBlue, {
    top: 122 * gameConfig.resolutionMultiplier,
    left: 196 * gameConfig.resolutionMultiplier,
  });
  game.cache.custom.ninePatch.add(Atlases.Popups.Atlas.Frames.BackgroundGreen, {
    top: 122 * gameConfig.resolutionMultiplier,
    left: 196 * gameConfig.resolutionMultiplier,
  });
  game.cache.custom.ninePatch.add(
    Atlases.Popups.Atlas.Frames.BackgroundOrange,
    {
      top: 122 * gameConfig.resolutionMultiplier,
      left: 196 * gameConfig.resolutionMultiplier,
    },
  );
  game.cache.custom.ninePatch.add(Atlases.Popups.Atlas.Frames.BackgroundPink, {
    top: 122 * gameConfig.resolutionMultiplier,
    left: 196 * gameConfig.resolutionMultiplier,
  });
  game.cache.custom.ninePatch.add(Atlases.Popups.Atlas.Frames.BackgroundRed, {
    top: 122 * gameConfig.resolutionMultiplier,
    left: 196 * gameConfig.resolutionMultiplier,
  });
  game.cache.custom.ninePatch.add(
    Atlases.Popups.Atlas.Frames.BackgroundYellow,
    {
      top: 122 * gameConfig.resolutionMultiplier,
      left: 196 * gameConfig.resolutionMultiplier,
    },
  );
  game.cache.custom.ninePatch.add(Atlases.Avatar.Atlas.Frames.Frame, {
    top: 36 * gameConfig.resolutionMultiplier,
  });
}
