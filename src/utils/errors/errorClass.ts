import {
    INTERNAL_SERVER_ERROR,
    SERVICE_UNAVAILABLE_ERROR,
} from "./errorCodes";
import { ErrorProps } from "./errorsInterface";

class BaseError extends Error {
    private httpCode: number;
    private error: any;
    private errorType?: string;

    constructor({ message, httpCode, error, errorType }: ErrorProps) {
        super(message);

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);

        this.httpCode = httpCode || 500;
        this.error = error;
        this.errorType = errorType || "SERVER_ERROR";
    }
}
export class InternalServerError extends BaseError {
    constructor({ message, error }: Partial<ErrorProps>) {
        super({
            message: message || INTERNAL_SERVER_ERROR.message,
            httpCode: INTERNAL_SERVER_ERROR.code,
            errorType: INTERNAL_SERVER_ERROR.type,
            error,
        });
    }
}
export class ServiceUnavailableError extends BaseError {
    constructor({ message, error }: Partial<ErrorProps>) {
        super({
            message: message || SERVICE_UNAVAILABLE_ERROR.message,
            httpCode: SERVICE_UNAVAILABLE_ERROR.code,
            errorType: SERVICE_UNAVAILABLE_ERROR.type,
            error,
        });
    }
}
