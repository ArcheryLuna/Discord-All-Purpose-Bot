import SlashCommand from "class/SlashCommands/SlashCommand";
import {
  PermissionsBitField,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  type CacheType,
} from "discord.js";
import type TheBotClient from "server";
import CommandCategoryEnum from "types/CommandCategoryEnum";

export default class Test extends SlashCommand {
  constructor(client: TheBotClient) {
    super(client, {
      name: "ping",
      description: "Simple Ping Command",
      category: CommandCategoryEnum.utilities,
      default_member_permissions:
        PermissionsBitField.Flags.UseApplicationCommands,
      dm_permission: false,
      cooldown: 0,
      options: [],
    });
  }

  public override async run(
    interaction: ChatInputCommandInteraction<CacheType>,
  ) {
    interaction.reply({
      content: "Pong!",
      flags: ["Ephemeral"]
    });
  }
  // public override async autoComplete(interaction: AutocompleteInteraction<CacheType>) {}
}
