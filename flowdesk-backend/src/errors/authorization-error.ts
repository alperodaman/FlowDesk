import { AppError } from "./app-error.js";

export class AuthorizationError extends AppError {
    constructor(message = "You are not authorized for this action") {
        super({
            message,
            statusCode: 403,
            code: "AUTHORIZATION_ERROR"
        });
    }
}