import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

const env = createEnv({
    /**
     * Your types for the environment variables
     */
    server: {
        TOKEN: z.string(),
        NODE_ENV: z.enum(["development", "test", "production"]).default("development")
    },

    /**
     * Destructing the `process.env` manually
     */
    runtimeEnv: {
        TOKEN: process.env.DISCORD_BOT_TOKEN,
        NODE_ENV: process.env.NODE_ENV
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
