import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { APP_CONSTANTS } from "./config/constants.js";
import { corsOptions } from "./config/cors.js";
import { swaggerSpec } from "./docs/swagger.js";
import { NotFoundError } from "./errors/not-found-error.js";
import { errorHandler } from "./middleware/error-handler.js";
import { healthRouter } from "./modules/health/health.routes.js";

export const app = express();

app.disable("x-powered-by");

/*
 * CORS middleware'i route'lardan ve body parser'lardan
 * önce çalıştırılır.
 */
app.use(cors(corsOptions));

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(APP_CONSTANTS.DOCS_PATH, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(`${APP_CONSTANTS.API_PREFIX}/health`, healthRouter);

app.use((request, _response, next) => {
  next(
    new NotFoundError(
      `Route not found: ${request.method} ${request.originalUrl}`,
    ),
  );
});

// Her zaman en son middleware olmalı.
app.use(errorHandler);
