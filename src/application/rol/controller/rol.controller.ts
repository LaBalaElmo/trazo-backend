import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/authentication/guard/jwt-auth.guard';
import { RolService } from '../service/rol.service';

@Controller()
export class RolController {
  constructor(
    private readonly rolService: RolService
  ) { }

  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Post('rol')
  async getRoles(@Body() body, @Req() req) {
    return await this.rolService.getRolesById(body.roles)
  }

}
