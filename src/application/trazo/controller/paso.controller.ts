import { Controller, Get, Put, Post, Delete, UseGuards } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { TrazoGuard } from '../guard/trazo.guard';
import { PasoService } from '../service/paso.service';

@Controller('paso')
@UseGuards(AuthGuard('jwt'))
export class PasoController {
  constructor(
    private pasoService: PasoService
  ){}

  @UseGuards(JwtAuthGuard)
  @UseGuards(TrazoGuard)
  @Get('trazo/:id')
  async getPasosByTrazoId(@Param('id') trazoId: number){
    return await this.pasoService.getPasosByTrazoId(trazoId);
  }
}
