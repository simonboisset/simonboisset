import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  SESSION_SECRET: z.string(),
  JWT_SECRET: z.string(),
  PORT: z
    .string()
    .transform((value) => parseInt(value, 10))
    .optional(),
});

export type EnvType = z.infer<typeof envSchema>;

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  SESSION_SECRET: process.env.SESSION_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
});
