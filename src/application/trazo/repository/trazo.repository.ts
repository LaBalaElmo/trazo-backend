import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Trazo } from '../entity/trazo.entity';

@Injectable()
export class TrazoRepository {
  constructor(
    private dataSource: DataSource
  ){}

  async findTrazoByUser(userId){
    const query = this.dataSource
    .getRepository(Trazo)
    .createQueryBuilder('trazo')
    .leftJoinAndSelect('trazo.usuario', 'usuario')
    .leftJoinAndSelect('trazo.paso', 'paso')
    .where('trazo.id_usuario = :userId', {userId: userId})
    .select([
      'trazo.id',
      'trazo.nombre',
      'trazo.cantidadPasos',
      'trazo.pasoActual',
      'paso.nombre'
    ])

    return query.getMany();
  }
}
