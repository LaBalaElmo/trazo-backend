import { Inject, Injectable } from '@nestjs/common';
import { TrazoHomeDto } from '../dto/trazo_home.dto';
import { TrazoRepository } from '../repository/trazo.repository';

@Injectable()
export class TrazoService {
  constructor(
    @Inject(TrazoRepository)
    private trazoRepository: TrazoRepository
  ){}

  async getTrazoByUser(userId: number): Promise<TrazoHomeDto[]>{
    const trazo = await this.trazoRepository.findTrazoByUser(userId)
    const trazosHome: TrazoHomeDto[] = trazo.map(trazo => {
      const trazoHome: TrazoHomeDto ={
        id: 0,
        cantidadPasos: 0,
        nombre: '',
        nombrePasos: [],
        pasoActual: 0
      }
      trazoHome.id = trazo.id;
      trazoHome.cantidadPasos = trazo.cantidadPasos;
      trazoHome.nombre = trazo.nombre;
      trazoHome.nombrePasos = trazo.paso.map(paso => paso.nombre);
      trazoHome.pasoActual = trazo.pasoActual;
      return trazoHome;
    })
    return trazosHome;
  }
}
