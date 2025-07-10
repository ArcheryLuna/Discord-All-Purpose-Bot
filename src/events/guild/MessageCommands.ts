import Event from "class/Events";
import type MessageCommands from "class/MessageCommands/MessageCommand";
import { Events, Message, Collection } from "discord.js";
import type TheBotClient from "server";

export default class MessageEvent extends Event {
  constructor(client: TheBotClient) {
    super(client, {
      name: Events.MessageCreate,
      description: "Runs on message create event within the guild",
      once: false,
    });
  }

  private GetCommands(cmd: string): MessageCommands | null {
    const Command =
      this.client.messageCommands.get(cmd) ||
      this.client.messageCommands.find(
        (a) => a.aliases && a.aliases.includes(cmd),
      );

    if (Command) {
      return Command;
    }

    return null;
  }

  public override async run(message: Message): Promise<void> {
    if (!message.guild || message.author.bot) return;

    const prefix = "$";

    if (!message.content.toLowerCase().startsWith(prefix)) {
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const commandName = args.shift()?.toLowerCase();
    const command = this.GetCommands(commandName!);

    if (!command) return;

    command.run(message, args).catch((err) => console.error(err));
  }
}
