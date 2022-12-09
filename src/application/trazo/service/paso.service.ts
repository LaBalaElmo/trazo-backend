import { Inject, Injectable } from '@nestjs/common';
import { Paso } from '../entity/paso.entity';
import { PasoRepository } from '../repository/paso.repository';

@Injectable()
export class PasoService {
  constructor(
    @Inject(PasoRepository)
    private pasoRepository: PasoRepository
  ){}

  async getPasosByTrazoId(trazoId: number): Promise<Paso[]>{
    return await this.pasoRepository.findPasosByTrazoId(trazoId);
  }
}
