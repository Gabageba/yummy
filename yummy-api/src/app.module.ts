import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ValidationModule } from './services/validation.module';
import { CollectionModule } from './collection/collection.module';
import { DishModule } from './dish/dish.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // доступ к process.env везде
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          throw new Error('MONGO_URI не задана в .env');
        }
        return { uri };
      },
    }),
    ValidationModule,
    UsersModule,
    AuthModule,
    CollectionModule,
    DishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
