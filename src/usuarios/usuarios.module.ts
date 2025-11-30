import { Module } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { UsuarioController } from './usuarios.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService],
  exports: [UsuarioService],
})
export class UsuariosModule {}
