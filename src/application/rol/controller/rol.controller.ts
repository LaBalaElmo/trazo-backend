import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { RolService } from '../service/rol.service';

@Controller('rol')
@UseGuards(AuthGuard('jwt'))
export class RolController {
  constructor(
    private readonly rolService: RolService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllRoles() {
    return await this.rolService.getAllRoles()
  }

  @UseGuards(JwtAuthGuard)
  @Get('public')
  async getPublicRoles() {
    return await this.rolService.getAllPublicRoles()
  }

}
