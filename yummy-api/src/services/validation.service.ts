import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ValidationException } from '../exception/validation.exception';
import type {
  ValidationErrorItem,
  ValidationErrorCode,
} from '../pipes/validation.pipe';

interface UniqueFieldConfig {
  field: string;
  value: string | number | undefined | null;
  model: Model<any>;
}

@Injectable()
export class ValidationService {
  async validateUniqueFields(configs: UniqueFieldConfig[]): Promise<void> {
    const errors: ValidationErrorItem[] = [];

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
    const errors: ValidationErrorItem[] = [
      {
        field,
        codes: [{ code }],
      },
    ];
    throw new ValidationException(errors);
  }
}
