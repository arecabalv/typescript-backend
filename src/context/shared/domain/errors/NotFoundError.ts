import { BaseError } from '../BaseError';

export class NotFoundError extends BaseError {
  constructor(
    readonly message: string = 'Not Found',
    readonly code: string = 'INT-001',
    readonly error: string = message,
    readonly status: number = 404,
  ) {
    super(message, status, { error, code });
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
