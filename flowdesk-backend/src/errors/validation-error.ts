import { AppError } from "./app-error.js";

export class ValidationError extends AppError {
    constructor(
        message = "Validation failed",
        details?: unknown
    ) {
        super({
            message,
            statusCode: 400,
            code: "VALIDATION_ERROR",
            details
        });
    }
}