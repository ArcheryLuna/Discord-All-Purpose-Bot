import CommandCategoryEnum from "types/CommandCategoryEnum";
import TheBotClient from "server";
import { Message } from "discord.js" 

export default interface IMessageCommand {
  client: TheBotClient;
  name: string;
  description: string;
  category: CommandCategoryEnum;
  aliases: string[];
  cooldown: number;

  run(message: Message, args: string[] ): Promise<void>;
}
