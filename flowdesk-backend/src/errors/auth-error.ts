import { AppError } from "./app-error.js";

export class AuthError extends AppError {
    constructor(message = "Authentication required") {
        super({
            message,
            statusCode: 401,
            code: "AUTHENTICATION_ERROR"
        });
    }
}