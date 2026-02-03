import { ApiProperty } from '@nestjs/swagger';

export interface ValidationErrorCode {
  code: string;
  value?: number | string;
}

export class ValidationErrorDto {
  @ApiProperty({
    example: 'email',
    description: 'Название поля',
  })
  field: string;

  @ApiProperty({
    example: [
      {
        code: 'invalid',
      },
    ],
    description: 'Коды ошибок',
  })
  codes: ValidationErrorCode[];
}
