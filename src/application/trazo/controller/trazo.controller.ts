import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { TrazoHomeDto } from '../dto/trazo_home.dto';
import { Trazo } from '../entity/trazo.entity';
import { TrazoGuard } from '../guard/trazo.guard';
import { TrazoService } from '../service/trazo.service';

@Controller('trazo')
@UseGuards(AuthGuard('jwt'))
export class TrazoController {
  constructor(
    private trazoService: TrazoService
  ){}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async trazoListByUser(@Req() req): Promise<TrazoHomeDto[]>{
    const user = req.user;
    return await this.trazoService.getTrazosByUser(user.id)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TrazoGuard)
  @Get(':id')
  async singleTrazo(@Param('id') trazoId: number): Promise<Trazo>{
    return await this.trazoService.getSpecificTrazo(trazoId);
  }
}
