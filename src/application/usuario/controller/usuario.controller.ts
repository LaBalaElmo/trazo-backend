import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import * as dotenv from 'dotenv';
import { Get } from '@nestjs/common';
import { UserExists } from '../dto/user_exists.dto';

dotenv.config();

@Controller('user')
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService,
  ) { }

  @Get('exist')
  async userExists(@Query('email') email: string): Promise<UserExists>{
    return await this.usuarioService.getUserByEmail(email)
  }
}
