import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    ARCJET_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    TT_APP_ID: z.string().min(1),
    TT_SECRET: z.string().min(1),
    TT_ACCESS_TOKEN: z.string().min(1),
    TT_ACC_ID: z.string().min(1),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
