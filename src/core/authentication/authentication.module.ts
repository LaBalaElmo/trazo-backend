import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from './service/authentication.service';
import * as dotenv from 'dotenv';
import { AuthController } from './controller/auth.controller';
import { UsuarioService } from 'src/application/usuario/service/usuario.service';
import { UsuarioRepository } from 'src/application/usuario/repository/usuario.repository';
import { RolRepository } from 'src/application/rol/repository/rol.repository';
import { RolUsuarioService } from '../authorization/service/rol_usuario.service';
import { RolUsuarioRepository } from '../authorization/repository/rol_usuario.repository';
import { RolService } from 'src/application/rol/service/rol.service';
import { JwtStrategy } from './strategy/jwt.strategy';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    })
  ],
  providers: [
    AuthenticationService, 
    ConfigService,
    UsuarioService, 
    UsuarioRepository, 
    RolRepository, 
    RolUsuarioService, 
    RolUsuarioRepository,
    RolService,
    JwtStrategy
  ],
  exports: [AuthenticationService],
  controllers: [AuthController]
})
export class AuthenticationModule {}
