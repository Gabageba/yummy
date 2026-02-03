import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({
    example: 'Название',
    description: 'Название меню',
    required: true,
  })
  @IsDefined()
  @IsString()
  name: string;
}
