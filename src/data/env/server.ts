import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().optional(),
    DB_PASSWORD: z.string().optional(),
    DB_HOST: z.string().optional(),
    DB_PORT: z.string().optional(),
    DB_NAME: z.string().optional(),
    DB_USER: z.string().optional(),
    ARCJET_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
  },

  createFinalSchema: (env) => {
    return z.object(env).transform((val) => {
      const {
        DATABASE_URL,
        DB_PASSWORD,
        DB_HOST,
        DB_PORT,
        DB_NAME,
        DB_USER,
        ...rest
      } = val;

      const url =
        DATABASE_URL ??
        `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

      return {
        ...rest,
        DATABASE_URL: url,
      };
    });
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
