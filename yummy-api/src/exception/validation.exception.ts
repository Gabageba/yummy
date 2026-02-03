import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationErrorDto } from 'src/dto/validation-error.dto';

export class ValidationException extends HttpException {
  messages: ValidationErrorDto[];

  constructor(response: ValidationErrorDto[]) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
