import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { MenuDto } from './menu.dto';

export class CreateAndUpdateMenuDto extends OmitType(MenuDto, [
  'id',
  'allowedUsers',
  'actions',
]) {
  @ApiProperty({
    example: 'Название',
    description: 'Название меню',
    required: true,
  })
  @IsDefined()
  @IsString()
  name: string;
}
