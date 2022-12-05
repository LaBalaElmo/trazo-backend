import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { TrazoHomeDto } from '../dto/trazo_home.dto';
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
    return await this.trazoService.getTrazoByUser(user.id)
  }
}
