import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { RegisterDto } from 'src/application/usuario/dto/register.dto';
import { Usuario } from 'src/application/usuario/entity/usuario.entity';
import { UsuarioService } from 'src/application/usuario/service/usuario.service';
import { AuthenticationService } from '../service/authentication.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usuarioService: UsuarioService,
    private authenticationService: AuthenticationService
  ){}

  //@UseGuards(GoogleOauthGuard)
  @Post('register')
  async registerUser(@Body() body: RegisterDto) {
    const user: Usuario = await this.usuarioService.saveUser(body)
    return {
      token: await this.authenticationService.generateToken(user.id, []),
      idUsuario: user.id
    }
  }
}
