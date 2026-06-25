import type { ErrorRequestHandler } from "express";

import { AppError } from "../errors/app-error.js";
import { env } from "../config/env.js";

interface ErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
        stack?: string;
    };
}

export const errorHandler: ErrorRequestHandler = (
    error: unknown,
    _request,
    response,
    next
) => {
    if (response.headersSent) {
        next(error);
        return;
    }

    if (error instanceof AppError) {
        const payload: ErrorResponse = {
            success: false,
            error: {
                code: error.code,
                message: error.message
            }
        };

        if (error.details !== undefined) {
            payload.error.details = error.details;
        }

        if (
            env.NODE_ENV === "development" &&
            error.stack !== undefined
        ) {
            payload.error.stack = error.stack;
        }

        response
            .status(error.statusCode)
            .json(payload);

        return;
    }

    console.error(error);

    const payload: ErrorResponse = {
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred"
        }
    };

    if (
        env.NODE_ENV === "development" &&
        error instanceof Error &&
        error.stack !== undefined
    ) {
        payload.error.stack = error.stack;
    }

    response.status(500).json(payload);
};