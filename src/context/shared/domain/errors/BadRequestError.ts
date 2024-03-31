import { BaseError } from '../BaseError';

export class BadRequestError extends BaseError {
  constructor(
    readonly message: string = 'Bad Request Error',
    readonly code: string = 'INT-002',
    readonly error: string = message,
    readonly status: number = 400,
  ) {
    super(message, status, { error, code });
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
