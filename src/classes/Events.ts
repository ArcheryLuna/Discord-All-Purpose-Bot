import { Events } from "discord.js";
import TheBotClient from "server";

import type IEvent from "types/events/IEvent";
import type IEventOptions from "types/events/IEventOptions";

export default class Event implements IEvent {
  client: TheBotClient;
  name: Events;
  description: string;
  once: boolean;

  constructor(client: TheBotClient, options: IEventOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.once = options.once;
  }

  public async run(...args: any[]): Promise<void> {}
}
