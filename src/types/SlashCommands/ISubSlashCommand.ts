import type { ChatInputCommandInteraction } from "discord.js";
import type TheBotClient from "server";

export default interface ISubSlashCommand {
  client: TheBotClient;
  name: string;

  run: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
