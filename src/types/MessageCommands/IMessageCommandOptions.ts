import CommandCategoryEnum from "types/CommandCategoryEnum";

export default interface IMessageCommandOptions {
  name: string;
  description: string;
  category: CommandCategoryEnum;
  aliases: string[];
  cooldown: number;
}
