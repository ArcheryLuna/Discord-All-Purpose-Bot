import type ISubSlashCommand from "types/SlashCommands/ISubSlashCommand";
import type ISubSlashCommandOptions from "types/SlashCommands/ISubSlashCommandOptions";
import TheBotClient from "server";
import type { CacheType, ChatInputCommandInteraction } from "discord.js";

export default class SubSlashCommand implements ISubSlashCommand {
  client: TheBotClient;
  name: string;

  constructor(client: TheBotClient, options: ISubSlashCommandOptions) {
    this.client = client;
    this.name = options.name;
  }

  public async run(interaction: ChatInputCommandInteraction<CacheType>) {}
}
