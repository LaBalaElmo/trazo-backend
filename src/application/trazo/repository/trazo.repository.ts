import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Trazo } from '../entity/trazo.entity';

@Injectable()
export class TrazoRepository {
  constructor(
    private dataSource: DataSource
  ){}

  async findTrazosByUser(userId: number){
    const query = this.dataSource
    .getRepository(Trazo)
    .createQueryBuilder('trazo')
    .leftJoinAndSelect('trazo.usuario', 'usuario')
    .leftJoinAndSelect('trazo.paso', 'paso')
    .where('trazo.id_usuario = :userId', {userId: userId})
    .select([
      'trazo.id',
      'trazo.nombre',
      'trazo.descripcion',
      'trazo.cantidadPasos',
      'trazo.pasoActual',
      'paso.nombre'
    ])

    return query.getMany();
  }

  async findTrazoById(trazoId: number){
    const query = this.dataSource
    .getRepository(Trazo)
    .createQueryBuilder('trazo')
    .innerJoinAndSelect('trazo.paso', 'paso')
    .where('trazo.id = :trazoId', {trazoId: trazoId})
    .select([
      'trazo',
      'paso'
    ]);

    return query.getOne();
  }
}
