import { env } from "config/environments";
import { Client, Collection } from "discord.js";
import Handler from "class/Handlers";
import SlashCommand from "./SlashCommands/SlashCommand";
import SubSlashCommand from "./SlashCommands/SubSlashCommand";

export default class TheBotClient extends Client {
  public env = env;
  public handlers: Handler;
  public slashCommands: Collection<string, SlashCommand> = new Collection();
  public subSlashCommands: Collection<string, SubSlashCommand> =
    new Collection();
  public slashCommandCooldowns: Collection<string, Collection<string, number>> =
    new Collection();

  constructor() {
    super({
      intents: [],
    });

    this.handlers = new Handler(this);
  }

  public LoadHandlers() {
      this.handlers.RegisterCommands();
    this.handlers.LoadEvents();
  }

  public async Start() {
    console.log(`Launching the bot in ${this.env.NODE_ENV} mode`);
    this.LoadHandlers();
    this.login(this.env.TOKEN).catch((err) => console.error(err));
  }
}
