import { AppError } from "./app-error.js";

export class BusinessRuleError extends AppError {
    constructor(
        message: string,
        details?: unknown
    ) {
        super({
            message,
            statusCode: 422,
            code: "BUSINESS_RULE_VIOLATION",
            details
        });
    }
}