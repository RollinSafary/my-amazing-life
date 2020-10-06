import { SimpleCommand, SyncMacroCommand } from '@candywings/pure-mvc';
import PlayerVOProxy from '../model/PlayerVOProxy';
import AvatarPreview from '../view/components/avatar/AvatarPreview';
import AvatarSkins from '../view/components/avatar/AvatarSkins';
import AvatarScene from '../view/scenes/AvatarScene';
import ClearAvatarSettingsCommand from './ui/ClearAvatarSettingsCommand';
import RegisterUiVOProxyCommand from './ui/RegisterUiVOProxyCommand';
import RetrieveAvatarConfigFromFirebaseCommand from './ui/RetrieveAvatarConfigFromFirebaseCommand';
import SaveAvatarConfigurationCommand from './ui/SaveAvatarConfigurationCommand';
import UpdateAvatarSkinCommand from './ui/UpdateAvatarSkinCommand';

export default class RegisterUiCommands extends SyncMacroCommand<
  SimpleCommand
> {
  public execute(): void {
    this.facade.registerCommand(
      PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION,
      RetrieveAvatarConfigFromFirebaseCommand,
    );
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
    super.execute();
  }

  public initializeMacroCommand(): void {
    this.addSubCommand(RegisterUiVOProxyCommand);
  }
}
