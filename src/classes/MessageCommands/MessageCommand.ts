import { Message } from "discord.js";
import type IMessageCommand from "types/MessageCommands/IMessageCommand";
import type IMessageCommandOptions from "types/MessageCommands/IMessageCommandOptions";
import TheBotClient from "server";
import type CommandCategoryEnum from "types/CommandCategoryEnum";

export default class MessageCommand implements IMessageCommand {
    public client: TheBotClient;
    public name: string;
    public description: string;
    public category: CommandCategoryEnum;
    public aliases: string[];
    public cooldown: number;

    constructor(client: TheBotClient, options: IMessageCommandOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.category = options.category;
        this.aliases = options.aliases;
        this.cooldown = options.cooldown;
    }

    async run(message: Message, args: string[]) {}
}
