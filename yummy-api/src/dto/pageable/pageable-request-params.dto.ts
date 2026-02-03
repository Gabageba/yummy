import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class PageableRequestParamsDto {
  @ApiProperty({
    example: 1,
    description: 'Номер страницы',
    required: true,
  })
  @IsDefined()
  @IsNumber()
  page: number;

  @ApiProperty({
    example: 30,
    description: 'Количество объектов на странице',
    default: 30,
  })
  @IsOptional()
  @IsNumber()
  size: number = 30;

  @ApiProperty({
    example: 'string',
    description: 'Поисковая фраза',
  })
  @IsOptional()
  @IsString()
  query: string;
}
