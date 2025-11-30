import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Public } from 'src/auth/decorators/isPublic.decorator';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { UsuarioPayLoad } from 'src/auth/types/UsuarioPayLoad';
import { ChangePasswordDto } from './dto/change-password.dto';

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
  @Get('u/:username')
  @Public()
  async findOneByUsername(@Param('username') username: string) {
    return this.usuarioService.findByUsername(username);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto, @UsuarioAtual() usuarioAtual: UsuarioPayLoad) {
    if (Number(id) !== Number(usuarioAtual.sub)) {
      throw new UnauthorizedException('Você só pode atualizar suas próprias informações.');
    }
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Patch(':id/change-password')
  async changePassword(
    @Param('id') id: number, 
    @Body() changePasswordDto: ChangePasswordDto,
    @UsuarioAtual() usuarioAtual: UsuarioPayLoad
  ) {

    if (id !== Number(usuarioAtual.sub)) {
      throw new UnauthorizedException('Você não pode alterar a senha de outro usuário.');
    }

    return this.usuarioService.updatePassword(id, changePasswordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @UsuarioAtual() usuarioAtual: UsuarioPayLoad) {
    if (Number(id) !== Number(usuarioAtual.sub)) {
      throw new UnauthorizedException('Você só pode atualizar suas próprias informações.');
    }
    return this.usuarioService.remove(+id);
  }
}