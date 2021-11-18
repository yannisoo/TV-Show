import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ShowModule } from './show/show.module';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiService } from './api/api.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    ShowModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, ApiService]
})
export class AppModule {}
