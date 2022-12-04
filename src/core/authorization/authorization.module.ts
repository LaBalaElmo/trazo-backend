import { Module } from '@nestjs/common';
import { RolRepository } from 'src/application/rol/repository/rol.repository';
import { RolService } from 'src/application/rol/service/rol.service';
import { RolUsuarioRepository } from './repository/rol_usuario.repository';
import { RolUsuarioService } from './service/rol_usuario.service';

@Module({
  providers: [RolUsuarioService, RolUsuarioRepository, RolRepository, RolService],
  exports:[RolUsuarioService]
})
export class AuthorizationModule {}
