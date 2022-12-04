import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolService } from '../service/rol.service';

@Controller()
export class RolController {
  constructor(
    private readonly rolService: RolService
  ) { }
}
