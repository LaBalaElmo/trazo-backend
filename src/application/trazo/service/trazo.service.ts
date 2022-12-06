import { Inject, Injectable } from '@nestjs/common';
import { TrazoHomeDto } from '../dto/trazo_home.dto';
import { Trazo } from '../entity/trazo.entity';
import { TrazoRepository } from '../repository/trazo.repository';

@Injectable()
export class TrazoService {
  constructor(
    @Inject(TrazoRepository)
    private trazoRepository: TrazoRepository
  ){}

  async getTrazosByUser(userId: number): Promise<TrazoHomeDto[]>{
    const trazo = await this.trazoRepository.findTrazosByUser(userId)
    const trazosHome: TrazoHomeDto[] = trazo.map(trazo => {
      const trazoHome: TrazoHomeDto ={
        id: 0,
        cantidadPasos: 0,
        descripcion: '',
        nombre: '',
        nombrePasos: [],
        pasoActual: 0
      }
      trazoHome.id = trazo.id;
      trazoHome.cantidadPasos = trazo.cantidadPasos;
      trazoHome.descripcion = trazo.descripcion;
      trazoHome.nombre = trazo.nombre;
      trazoHome.nombrePasos = trazo.paso.map(paso => paso.nombre);
      trazoHome.pasoActual = trazo.pasoActual;
      return trazoHome;
    })
    return trazosHome;
  }

  async getSpecificTrazo(trazoId: number): Promise<Trazo>{
    return this.trazoRepository.findTrazoById(trazoId);
  }
}
