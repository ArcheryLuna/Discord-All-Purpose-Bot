import { env } from "config/environments";
import { Client, Collection } from "discord.js";
import Handler from "class/Handlers";
import SlashCommand from "./SlashCommands/SlashCommand";
import SubSlashCommand from "./SlashCommands/SubSlashCommand";
import type MessageCommand from "./MessageCommands/MessageCommand";

export default class TheBotClient extends Client {
  public env = env;
  public handlers: Handler;
  public slashCommands: Collection<string, SlashCommand> = new Collection();
  public subSlashCommands: Collection<string, SubSlashCommand> =
    new Collection();
  public slashCommandCooldowns: Collection<string, Collection<string, number>> =
    new Collection();
  public messageCommands: Collection<string, MessageCommand> = new Collection();
  public messageCommandCooldowns: Collection<
    string,
    Collection<string, number>
  > = new Collection();

  constructor() {
    super({
      intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent",
        "GuildBans",
        "GuildMembers",
        "DirectMessages",
        "DirectMessageTyping",
        "DirectMessageReactions",
        "MessageContent",
        "GuildVoiceStates",
      ],
    });

    this.handlers = new Handler(this);
  }

  public LoadHandlers() {
    this.handlers.LoadSlashCommands();
    this.handlers.LoadMessageCommands();
    this.handlers.LoadEvents();
  }

  public async Start() {
    console.log(`Launching the bot in ${this.env.NODE_ENV} mode`);
    this.LoadHandlers();
    this.login(this.env.TOKEN).catch((err) => console.error(err));
  }
}
