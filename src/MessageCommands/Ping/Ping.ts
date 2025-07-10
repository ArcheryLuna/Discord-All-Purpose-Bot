import MessageCommand from "class/MessageCommands/MessageCommand";
import { type Message, EmbedBuilder } from "discord.js";
import type TheBotClient from "server";
import CommandCategoryEnum from "types/CommandCategoryEnum";

export default class PingCommand extends MessageCommand {
  constructor(client: TheBotClient) {
    super(client, {
      name: "ping",
      description: "A simple ping command",
      category: CommandCategoryEnum.utilities,
      aliases: ["pong"],
      cooldown: 0,
    });
  }

  public override async run(message: Message, args: string[]): Promise<void> {
    if (!message.channel.isSendable()) return;
    const msg = await message.channel.send({ content: "ping" });
    const newEmbed = new EmbedBuilder()
      .setTitle(`Pong`)
      .setURL("https://archery-luna.com")
      .setFooter({
        iconURL: message.author.displayAvatarURL(),
        text: message.author.username,
      })
      .setDescription(
        `[Your ping 🏓](https://archery-luna.com) : \`${this.client.ws.ping}ms\`,\n [Client ping 🖥](https://archery-luna.com) : \`${msg.createdTimestamp - message.createdTimestamp}ms\``,
      )
      .setColor(0x64a30d)
      .setTimestamp(Date.now());

    msg.edit({ embeds: [newEmbed] });
  }
}
