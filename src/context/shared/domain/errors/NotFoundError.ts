import { BaseError } from '../BaseError';

export class NotFoundError extends BaseError {
  constructor(
    readonly message: string = 'Not Found',
    readonly error: string = message,
    readonly status: number = 404, 
    readonly code: string = 'INT-001',
  ) {
    super(message, status, { error, code });
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}