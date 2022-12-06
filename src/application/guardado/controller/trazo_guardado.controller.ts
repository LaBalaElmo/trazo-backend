import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { TrazoGuardadoService } from '../service/trazo_guardado.service';

@Controller('guardado')
@UseGuards(AuthGuard('jwt'))
export class TrazoGuardadoController {
  constructor(
    private trazoGuardadoService: TrazoGuardadoService
  ){}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllTrazosGuardados(){
    return this.trazoGuardadoService.getAllTrazosGuardados()
  }
}