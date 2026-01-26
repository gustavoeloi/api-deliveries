import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_AUTHSECRET: z.string(),
  PORT: z.coerce.number().default(3333),
});

const { DATABASE_URL, JWT_AUTHSECRET, PORT } = envSchema.parse(process.env);

export { DATABASE_URL, JWT_AUTHSECRET, PORT };
