import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Paso } from '../entity/paso.entity';

@Injectable()
export class PasoRepository {
  constructor(
    private dataSource: DataSource
  ){}

  async findPasosByTrazoId(trazoId): Promise<Paso[]>{
    const query = this.dataSource.getRepository(Paso)
    .createQueryBuilder('paso')
    .where('paso.idTrazo = :trazoId', {trazoId: trazoId})
    .select('paso')

    return await query.getMany()
  }
}
