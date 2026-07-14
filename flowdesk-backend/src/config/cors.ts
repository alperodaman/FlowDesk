import type { CorsOptions } from "cors";

import { env } from "./env.js";

const allowedOrigins = env.CORS_ORIGINS.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const corsOptions: CorsOptions = {
  origin: allowedOrigins,
};
