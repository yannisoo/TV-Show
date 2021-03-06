import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { ShowEntity } from './show.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShowEntity, UserEntity])],
  controllers: [ShowController],
  providers: [ShowService],
  exports: [ShowService]
})
export class ShowModule {}
