import type {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
} from "discord.js";
import type TheBotClient from "server";
import type CommandCategoryEnum from "types/CommandCategoryEnum";

export default interface ISlashCommand {
  client: TheBotClient;
  name: string;
  description: string;
  category: CommandCategoryEnum;
  options: object;
  default_member_permissions: bigint;
  dm_permission: boolean;
  cooldown: number;

  run(interaction: ChatInputCommandInteraction): Promise<void>;
  autoComplete(interaction: AutocompleteInteraction): Promise<void>;
}
