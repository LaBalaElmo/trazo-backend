import { Module } from '@nestjs/common';
import { TrazoService } from './service/trazo.service';
import { TrazoController } from './controller/trazo.controller';
import { TrazoRepository } from './repository/trazo.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trazo } from './entity/trazo.entity';

@Module({
  providers: [TrazoService, TrazoRepository],
  controllers: [TrazoController],
  imports: [
    TypeOrmModule.forFeature([
      Trazo
    ])
  ]
})
export class TrazoModule {}
