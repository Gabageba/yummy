import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './schemas/menu.schema';
import { AuthModule } from '../auth/auth.module';
import { MenuRepository } from './menu.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    AuthModule,
  ],
  controllers: [MenuController],
  providers: [MenuService, MenuRepository],
})
export class MenuModule {}
