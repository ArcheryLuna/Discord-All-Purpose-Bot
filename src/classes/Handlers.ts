import { glob } from "glob";
import type IHandler from "types/IHandler";
import path from "path";
import { env } from "config/environments";
import type Event from "./Events";
import type TheBotClient from "server";

export default class Handler implements IHandler {
  client: TheBotClient;

  constructor(client: TheBotClient) {
    this.client = client;
  }

  async LoadEvents() {
    const files = (
      await glob(
        env.NODE_ENV === "production"
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

      return delete require.cache[require.resolve(file)];
    });
  }
}
