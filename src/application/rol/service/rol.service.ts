import { Inject, Injectable } from '@nestjs/common';
import { Rol } from 'src/application/rol/entity/rol.entity';
import { DataSource } from 'typeorm';
import { RolRepository } from '../repository/rol.repository';

@Injectable()
export class RolService {
  constructor(
    @Inject(RolRepository)
    private rolRepository: RolRepository,
  ) { }

  async saveRoles(rol: Rol): Promise<Rol> {
    return await this.rolRepository.saveRol(rol)
  }

  async getRolesById(rol: number[]): Promise<Rol[]>{
    let roles: Rol[] = [];
    for(let i = 0; i < rol.length; i++){
      const rolFinded = await this.rolRepository.findRolById(rol[i])
      roles.push(rolFinded)
    }
    return roles;
  }
}
