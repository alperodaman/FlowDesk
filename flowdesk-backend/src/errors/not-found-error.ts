import { AppError } from "./app-error.js";

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super({
            message,
            statusCode: 404,
            code: "NOT_FOUND"
        });
    }
}