import * as dotenv from "dotenv";

dotenv.config(); // Load .env variables

export const ENV = {
  BASE_URL: process.env.BASE_URL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
} as const;
