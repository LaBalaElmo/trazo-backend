import { Inject, Injectable } from '@nestjs/common';
import { Rol } from 'src/application/rol/entity/rol.entity';
import { RolRepository } from 'src/application/rol/repository/rol.repository';
import { RolUsuario } from '../entity/rol_usuario.entity';
import { RolUsuarioRepository } from '../repository/rol_usuario.repository';

@Injectable()
export class RolUsuarioService {
  constructor(
    @Inject(RolRepository)
    private rolRepository: RolRepository,
    @Inject(RolUsuarioRepository)
    private rolUsuarioRepository: RolUsuarioRepository
  ){}

  async saveRolUser(userId: number, rol: number[]): Promise<Rol[]>{
    let roles: Rol[];
    rol.forEach(async id => {
      const rol: Rol = await this.rolRepository.findRolById(id)
      roles.push(rol)
      const rolUser = new RolUsuario({
        idRol: rol.id,
        idUsuario: userId
      })
      this.rolUsuarioRepository.saveRolUser(rolUser);
    })
    return roles;
  }
}
