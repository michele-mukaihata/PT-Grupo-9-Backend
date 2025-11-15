import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { UsuarioPayLoad } from 'src/auth/types/UsuarioPayLoad';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Public()
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
    return this.usuarioService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto, @UsuarioAtual() usuarioAtual: UsuarioPayLoad) {
    if (id.toString() !== usuarioAtual.sub) {
      throw new UnauthorizedException('Você só pode atualizar suas próprias informações.');
    }
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @UsuarioAtual() usuarioAtual: UsuarioPayLoad) {
    if (id.toString() !== usuarioAtual.sub) {
      throw new UnauthorizedException('Você só pode atualizar suas próprias informações.');
    }
    return this.usuarioService.remove(+id);
  }
}