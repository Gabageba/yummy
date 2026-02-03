import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exception/validation.exception';
import {
  ValidationErrorCode,
  ValidationErrorDto,
} from 'src/dto/validation-error.dto';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }

    const obj = plainToInstance(metadata.metatype as new () => unknown, value, {
      enableImplicitConversion: true,
    });

    const errors = await validate(obj as object);

    if (errors.length) {
      const items: ValidationErrorDto[] = errors.map((err) => {
        const constraints = err.constraints ?? {};
        const codes: ValidationErrorCode[] = Object.entries(constraints).map(
          ([type, message]) => {
            if (type === 'minLength') {
              const match = message.match(/\d+/);
              if (match) {
                return {
                  code: type,
                  value: Number(match[0]),
                };
              }
            }

            return { code: type };
          },
        );

        return {
          field: err.property,
          codes,
        };
      });

      throw new ValidationException(items);
    }

    return obj;
  }
}
