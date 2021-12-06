import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ShowModule } from './show/show.module';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiService } from './api/api.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: '0.0.0.0',
        username: 'admin',
        password: 'admin',
        synchronize: true,
        logging: configService.get('NODE_ENV') === 'test' ? false : true,
        dropSchema: configService.get('NODE_ENV') === 'test',
        database:
          configService.get('NODE_ENV') === 'test' ? 'demo-test' : 'demo',
        port: 5434,
        entities: ['./**/*.entity.{js,ts}']
      })
    }),
    ShowModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, ApiService]
})
export class AppModule {}
