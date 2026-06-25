import { app } from "./app.js";
import { APP_CONSTANTS } from "./config/constants.js";
import { env } from "./config/env.js";
import {
    disconnectPrisma,
    prisma
} from "./infrastructure/prisma.js";

async function bootstrap(): Promise<void> {
    try {
        await prisma.$connect();

        const server = app.listen(env.PORT, () => {
            console.log(
                `FlowDesk API: http://localhost:${env.PORT}`
            );

            console.log(
                `Swagger UI: http://localhost:${env.PORT}${APP_CONSTANTS.DOCS_PATH}`
            );
        });

        let isShuttingDown = false;

        const shutdown = async (
            signal: NodeJS.Signals
        ): Promise<void> => {
            if (isShuttingDown) {
                return;
            }

            isShuttingDown = true;

            console.log(`${signal} received. Shutting down...`);

            const forceShutdownTimer = setTimeout(() => {
                console.error("Forced shutdown due to timeout.");
                process.exit(1);
            }, APP_CONSTANTS.SHUTDOWN_TIMEOUT_MS);

            forceShutdownTimer.unref();

            server.close(async () => {
                try {
                    await disconnectPrisma();

                    clearTimeout(forceShutdownTimer);

                    console.log("FlowDesk API shut down successfully.");
                    process.exit(0);
                } catch (error) {
                    console.error(
                        "Error during graceful shutdown:",
                        error
                    );

                    process.exit(1);
                }
            });
        };

        process.once("SIGINT", () => {
            void shutdown("SIGINT");
        });

        process.once("SIGTERM", () => {
            void shutdown("SIGTERM");
        });
    } catch (error) {
        console.error(
            "FlowDesk API could not start:",
            error
        );

        await disconnectPrisma();
        process.exit(1);
    }
}

void bootstrap();