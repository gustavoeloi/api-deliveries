import { JWT_AUTHSECRET } from "@/env";

export const authConfig = {
  jwt: {
    secret: JWT_AUTHSECRET,
    expiresIn: "1d",
  },
};
