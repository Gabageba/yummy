import { HttpException, HttpStatus } from '@nestjs/common';
import type { ValidationErrorItem } from '../pipes/validation.pipe';

export class ValidationException extends HttpException {
  messages: ValidationErrorItem[];

  constructor(response: ValidationErrorItem[]) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
