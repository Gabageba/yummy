import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ValidationException } from '../exception/validation.exception';
import {
  ValidationErrorCode,
  ValidationErrorDto,
} from 'src/dto/validation-error.dto';

interface UniqueFieldConfig {
  field: string;
  value: string | number | undefined | null;
  model: Model<any>;
}

@Injectable()
export class ValidationService {
  async validateUniqueFields(configs: UniqueFieldConfig[]): Promise<void> {
    const errors: ValidationErrorDto[] = [];

    for (const config of configs) {
      if (config.value !== undefined && config.value !== null) {
        const query: Record<string, string | number> = {
          [config.field]: config.value,
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const existing = await config.model.findOne(query).exec();

        if (existing) {
          const codes: ValidationErrorCode[] = [{ code: 'unique' }];
          errors.push({
            field: config.field,
            codes,
          });
        }
      }
    }

    if (errors.length) {
      throw new ValidationException(errors);
    }
  }

  throwValidationError(field: string, code: string): never {
    const errors: ValidationErrorDto[] = [
      {
        field,
        codes: [{ code }],
      },
    ];
    throw new ValidationException(errors);
  }

  validateObjectId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid collection id: "${id}"`);
    }
  }
}
