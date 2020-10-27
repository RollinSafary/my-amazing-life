import { SimpleCommand, SyncMacroCommand } from '@candywings/pure-mvc';
import PlayerVOProxy from '../model/PlayerVOProxy';
import AvatarPreview from '../view/components/avatar/AvatarPreview';
import AvatarSkins from '../view/components/avatar/AvatarSkins';
import LifeStyleResultPopup from '../view/popups/LifeStyleResultPopup';
import PersonalityTimeoutPopup from '../view/popups/PersonalityTimeoutPopup';
import AvatarScene from '../view/scenes/AvatarScene';
import HobbiesScene from '../view/scenes/HobbiesScene';
import LifeStyleScene from '../view/scenes/LifeStyleScene';
import LobbyScene from '../view/scenes/LobbyScene';
import PersonalityScene from '../view/scenes/PersonalityScene';
import SkillsScene from '../view/scenes/SkillsScene';
import ClearAvatarSettingsCommand from './ui/ClearAvatarSettingsCommand';
import ApplyHobbyChoseCommand from './ui/hobbies/ApplyHobbyChoseCommand';
import PrepareHobbiesGameCommand from './ui/hobbies/PrepareHobbiesGameCommand';
import ClearLifeStyleChoiceCommand from './ui/lifestyle/ClearLifeStyleChoiceCommand';
import ResetLifeStyleCommand from './ui/lifestyle/ResetLifeStyleCommand';
import SaveLifeStyleChoiceCommand from './ui/lifestyle/SaveLifeStyleChoiceCommand';
import SetLifeStyleChoseCommand from './ui/lifestyle/SetLifeStyleChoseCommand';
import ApplyPersonalityMarkerChoiceCommand from './ui/personality/ApplyPersonalityMarkerChoiceCommand';
import ApplyPersonalityResetCommand from './ui/personality/ApplyPersonalityResetCommand';
import ApplyPersonalitySectorCompleteCommand from './ui/personality/ApplyPersonalitySectorCompleteCommand';
import ApplyPersonalitySectorResetCommand from './ui/personality/ApplyPersonalitySectorResetCommand';
import PrepareGameDataCommand from './ui/PrepareGameDataCommand';
import RegisterUiVOProxyCommand from './ui/RegisterUiVOProxyCommand';
import SaveAvatarConfigurationCommand from './ui/SaveAvatarConfigurationCommand';
import SetAvatarConfigCommand from './ui/SetAvatarConfigCommand';
import SetGamesDataCommand from './ui/SetGamesDataCommand';
import ApplySkillsOptionValueCommand from './ui/skills/ApplySkillsOptionValueCommand';
import ResetSkillsOptionsValuesCommand from './ui/skills/ResetSkillsOptionsValuesCommand';
import UpdateAvatarSkinCommand from './ui/UpdateAvatarSkinCommand';

export default class RegisterUiCommands extends SyncMacroCommand<
  SimpleCommand
> {
  public execute(): void {
    this.facade.registerCommand(
      PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION,
      SetAvatarConfigCommand,
    );
    this.facade.registerCommand(
      PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION,
      SetGamesDataCommand,
    );
    this.facade.registerCommand(
      LobbyScene.GAME_CHOSE_NOTIFICATION,
      PrepareGameDataCommand,
    );
    // AVATAR
    this.facade.registerCommand(
      AvatarSkins.SKIN_CLICKED_NOTIFICATION,
      UpdateAvatarSkinCommand,
    );
    this.facade.registerCommand(
      AvatarPreview.GENDER_BUTTON_CLICKED_NOTIFICATION,
      UpdateAvatarSkinCommand,
    );
    this.facade.registerCommand(
      AvatarScene.CLEAR_NOTIFICATION,
      ClearAvatarSettingsCommand,
    );
    this.facade.registerCommand(
      AvatarScene.SUBMIT_NOTIFICATION,
      SaveAvatarConfigurationCommand,
    );
    // LIFESTYLE
    this.facade.registerCommand(
      LifeStyleScene.OPTION_SELECTED_NOTIFICATION,
      SetLifeStyleChoseCommand,
    );
    this.facade.registerCommand(
      LifeStyleScene.OPTION_CONFIRMED_NOTIFICATION,
      SaveLifeStyleChoiceCommand,
    );
    this.facade.registerCommand(
      LifeStyleScene.OPTION_CLEAR_NOTIFICATION,
      ClearLifeStyleChoiceCommand,
    );
    this.facade.registerCommand(
      LifeStyleResultPopup.PLAY_AGAIN_NOTIFICATION,
      ResetLifeStyleCommand,
    );
    // PERSONALITY
    this.facade.registerCommand(
      PersonalityScene.MARKER_CLICKED_NOTIFICATION,
      ApplyPersonalityMarkerChoiceCommand,
    );
    this.facade.registerCommand(
      PersonalityTimeoutPopup.OK_CLICKED_NOTIFICATION,
      ApplyPersonalitySectorResetCommand,
    );
    this.facade.registerCommand(
      PersonalityScene.RESET_CLICKED_NOTIFICATION,
      ApplyPersonalitySectorResetCommand,
    );
    this.facade.registerCommand(
      PersonalityScene.PLAY_CLICKED_NOTIFICATION,
      ApplyPersonalityResetCommand,
    );
    this.facade.registerCommand(
      PersonalityScene.PATH_COMPLETE_NOTIFICATION,
      ApplyPersonalitySectorCompleteCommand,
    );
    // HOBBIES
    this.facade.registerCommand(
      HobbiesScene.START_GAME_NOTIFICATION,
      PrepareHobbiesGameCommand,
    );
    this.facade.registerCommand(
      HobbiesScene.HOBBY_CHOSE_NOTIFICATION,
      ApplyHobbyChoseCommand,
    );
    // SKILLS
    this.facade.registerCommand(
      SkillsScene.CONTROLLER_VALUE_CHANGED_NOTIFICATION,
      ApplySkillsOptionValueCommand,
    );
    this.facade.registerCommand(
      SkillsScene.PLAY_AGAIN_CLICKED_NOTIFICATION,
      ResetSkillsOptionsValuesCommand,
    );
    super.execute();
  }

  public initializeMacroCommand(): void {
    this.addSubCommand(RegisterUiVOProxyCommand);
  }
}
