import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ShowModule } from './show/show.module';
import { UserModule } from './user/user.module';

import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpErrorFilter } from './shared/http-error.filter';
import { ValidationPipe } from './shared/validation.pipe';

@Module({
  imports: [TypeOrmModule.forRoot(), ShowModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
