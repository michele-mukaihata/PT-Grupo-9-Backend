import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}