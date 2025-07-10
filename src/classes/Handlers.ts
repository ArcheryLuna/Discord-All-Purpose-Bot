import { glob } from "glob";
import type IHandler from "types/IHandler";
import path from "path";
import type Event from "./Events";
import type TheBotClient from "server";
import type SlashCommand from "./SlashCommands/SlashCommand";
import type SubSlashCommand from "./SlashCommands/SubSlashCommand";
import { REST, Routes, type Collection } from "discord.js";
import type MessageCommand from "./MessageCommands/MessageCommand";

export default class Handler implements IHandler {
  client: TheBotClient;

  constructor(client: TheBotClient) {
    this.client = client;
  }

  private async SlashCommandGetJson(
    commands: Collection<string, SlashCommand>,
  ): Promise<object[]> {
    const data: object[] = [];

    commands.map((command) => {
      data.push({
        name: command.name,
        description: command.description,
        options: command.options,
        default_member_permissions:
          command.default_member_permissions.toString(),
        dm_permission: command.dm_permission,
      });
    });

    return data;
  }

  async RegisterCommands() {
    const commands = await this.SlashCommandGetJson(this.client.slashCommands);
    const rest = new REST().setToken(this.client.env.TOKEN);
    try {
      if (
        this.client.env.NODE_ENV === "development" ||
        this.client.env.NODE_ENV === "test"
      ) {
        const setCommands: any = await rest.put(
          Routes.applicationGuildCommands(
            this.client.env.CLIENT_ID,
            this.client.env.GUILD_ID,
          ),
          {
            body: commands,
          },
        );

        console.log(
          `Successfully set ${setCommands.length} commands in dev guild!`,
        );
      } else {
        const setCommands: any = await rest.put(
          Routes.applicationCommands(this.client.env.CLIENT_ID),
          { body: commands },
        );

        console.log(`Successfully set ${setCommands.length} commands globaly`);
      }
    } catch (exception) {
      console.error(exception);
    }
  }

  async LoadEvents() {
    const files = (
      await glob(
        this.client.env.NODE_ENV === "production"
          ? "build/events/**/*.js"
          : "src/events/**/*.ts",
      )
    ).map((filePath) => path.resolve(filePath));

    files.map(async (file: string) => {
      const event: Event = new (await import(file)).default(this.client);

      if (!event.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have any name`)
        );
      }

      const run = (...args: any[]) => event.run(...args);

      //@ts-ignore
      if (event.once) this.client.once(event.name, run);
      //@ts-ignore
      else this.client.on(event.name, run);

      if (this.client.env.NODE_ENV === "development") {
        console.log(`Loaded Event : ${event.name}`);
      }

      return delete require.cache[require.resolve(file)];
    });
  }

  async LoadSlashCommands() {
    const commandFiles = (
      await glob(
        this.client.env.NODE_ENV === "production"
          ? "build/SlashCommands/**/*.js"
          : "src/SlashCommands/**/*.ts",
      )
    ).map((filePath) => path.resolve(filePath));

    commandFiles.map(async (file: string) => {
      const command: SlashCommand | SubSlashCommand = new (
        await import(file)
      ).default(this.client);

      if (!command.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have a name`)
        );
      }

      if (file.split("/").pop()?.split(".")[2]) {
        return this.client.subSlashCommands.set(command.name, command);
      }

      this.client.slashCommands.set(command.name, command as SlashCommand);

      if (this.client.env.NODE_ENV === "development") {
        console.log(`Loaded Slash Command : ${command.name}`);
      }
      return delete require.cache[require.resolve(file)];
    });
  }

  async LoadMessageCommands() {
    const commandFiles = (
      await glob(
        this.client.env.NODE_ENV === "production"
          ? "build/MessageCommands/**/*.js"
          : "src/MessageCommands/**/*.ts",
      )
    ).map((filePath) => path.resolve(filePath));

    commandFiles.map(async (file: string) => {
      const command: MessageCommand = new (
        await import(file)
      ).default(this.client);

      if (!command.name) {
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have a name`)
        );
      }

      this.client.messageCommands.set(command.name, command as MessageCommand);

      if (this.client.env.NODE_ENV === "development") {
        console.log(`Loaded Message Command : ${command.name}`);
      }

      return delete require.cache[require.resolve(file)];
    });
  }
}
