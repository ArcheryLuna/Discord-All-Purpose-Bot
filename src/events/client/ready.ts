import Event from "class/Events";
import { ActivityType, Events, PresenceUpdateStatus } from "discord.js";
import type TheBotClient from "server";

export default class Ready extends Event {
  constructor(client: TheBotClient) {
    super(client, {
      name: Events.ClientReady,
      description: "Executes code when the client is ready",
      once: true,
    });
  }

  override async run() {
    console.log(`${this.client.user?.tag} is online`);

    this.client.user?.setActivity({
      name: "All your commands",
      type: ActivityType.Watching,
    });

    this.client.user?.setStatus(PresenceUpdateStatus.Online);
  }
}
