import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/application/rol/entity/rol.entity';
import { RolController } from './controller/rol.controller';
import { RolRepository } from './repository/rol.repository';
import { RolService } from './service/rol.service';

@Module({
  controllers: [RolController],
  providers: [RolService, RolRepository],
  imports: [
    TypeOrmModule.forFeature([
      Rol
    ])
  ]
})
export class RolModule {}
