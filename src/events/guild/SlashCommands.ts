import Event from "class/Events";
import type SlashCommand from "class/SlashCommands/SlashCommand";
import { Events, ChatInputCommandInteraction, Collection } from "discord.js";
import type TheBotClient from "server";

export default class SlashCommandHandler extends Event {
  constructor(client: TheBotClient) {
    super(client, {
      name: Events.InteractionCreate,
      description: "Slash Command Handler",
      once: false,
    });
  }

  public override async run(
    interaction: ChatInputCommandInteraction,
  ): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const command: SlashCommand = this.client.slashCommands.get(
      interaction.commandName,
    )!;

    if (!command) {
      await interaction.reply({
        content: "This command does not exist!",
        flags: ["Ephemeral"],
      });
      this.client.slashCommands.delete(interaction.commandName);
      return;
    }
    const { slashCommandCooldowns } = this.client;

    if (!slashCommandCooldowns.has(command.name))
      slashCommandCooldowns.set(command.name, new Collection());

    const now = Date.now();
    const timestamp = slashCommandCooldowns.get(command.name)!;
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (
      timestamp.has(interaction.user.id) &&
      now < (timestamp.get(interaction.user.id) || 0) + cooldownAmount
    ) {
      interaction.reply({
        content: `Please wait another \`${(((timestamp.get(interaction.user.id) || 0) + cooldownAmount - now) / 1000).toFixed(1)}\` seconds to run this command!`,
        ephemeral: true,
      });

      return;
    }

    timestamp.set(interaction.user.id, now);
    setTimeout(() => timestamp.delete(interaction.user.id), cooldownAmount);

    try {
      const subCommandGroup = interaction.options.getSubcommandGroup(false);
      const subCommand = `${interaction.commandName}${subCommandGroup ? `.${subCommandGroup}` : ""}.${interaction.options.getSubcommand(false) || ""}`;

      this.client.subSlashCommands.get(subCommand)?.run(interaction) ||
        command.run(interaction);
      return;
    } catch (exception) {
      console.log(exception);
    }
  }
}
