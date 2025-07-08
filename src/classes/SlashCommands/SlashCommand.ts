import TheBotClient from "server";
import CommandCategoryEnum from "types/CommandCategoryEnum";
import type ISlashCommandOptions from "types/SlashCommands/ISlashCommandOptions";
import type ISlashCommand from "types/SlashCommands/ISlashCommands";
import type {
  AutocompleteInteraction,
  CacheType,
  ChatInputCommandInteraction,
} from "discord.js";

export default class SlashCommand implements ISlashCommand {
  client: TheBotClient;
  name: string;
  description: string;
  category: CommandCategoryEnum;
  options: object;
  default_member_permissions: bigint;
  dm_permission: boolean;
  cooldown: number;

  constructor(client: TheBotClient, options: ISlashCommandOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.category = options.category;
    this.options = options.options;
    this.default_member_permissions = options.default_member_permissions;
    this.dm_permission = options.dm_permission;
    this.cooldown = options.cooldown;
  }

  public async run(interaction: ChatInputCommandInteraction<CacheType>) {}
  public async autoComplete(interaction: AutocompleteInteraction<CacheType>) {}
}
