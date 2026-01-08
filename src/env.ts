import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_AUTHSECRET: z.string(),
});

const { DATABASE_URL, JWT_AUTHSECRET } = envSchema.parse(process.env);

export { DATABASE_URL, JWT_AUTHSECRET };
