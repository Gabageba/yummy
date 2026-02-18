import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { CollectionDto } from './collection.dto';

export class CreateAndUpdateCollectionDto extends OmitType(CollectionDto, [
  'id',
  'allowedUsers',
  'actions',
]) {
  @ApiProperty({
    example: 'Название',
    description: 'Название подборки',
    required: true,
  })
  @IsDefined()
  @IsString()
  name: string;
}
