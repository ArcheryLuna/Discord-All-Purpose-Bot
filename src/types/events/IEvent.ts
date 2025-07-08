import type TheBotClient from "server";
import { Events } from "discord.js"

export default interface IEvent {
  client: TheBotClient;
  name: Events;
  description: string;
  once: boolean;
}
