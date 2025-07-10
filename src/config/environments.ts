import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

const env = createEnv({
  /**
   * Your types for the environment variables
   */
  server: {
    TOKEN: z.string(),
    CLIENT_ID: z.string(),
    GUILD_ID: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Destructing the `process.env` manually
   */
  runtimeEnv: {
    TOKEN:
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DISCORD_BOT_TOKEN
        : process.env.DEV_DISCORD_BOT_TOKEN,
    CLIENT_ID:
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DISCORD_CLIENT_ID
        : process.env.DEV_DISCORD_CLIENT_ID,
    GUILD_ID: process.env.DISCORD_GUILD_ID,
    NODE_ENV: process.env.NODE_ENV,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined
   * `SOME_VAR: z.string()` and `SOME_BAR=''`
   * will throw an error
   */
  emptyStringAsUndefined: true,
});

export { env };
