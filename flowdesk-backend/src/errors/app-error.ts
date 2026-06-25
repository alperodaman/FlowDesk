export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly details: unknown | undefined;
    public readonly isOperational: boolean;

    constructor(options: {
        message: string;
        statusCode: number;
        code: string;
        details?: unknown;
        isOperational?: boolean;
    }) {
        super(options.message);

        this.name = new.target.name;
        this.statusCode = options.statusCode;
        this.code = options.code;
        this.details = options.details;
        this.isOperational = options.isOperational ?? true;

        Error.captureStackTrace(this, new.target);
    }
}