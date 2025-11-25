import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ComentariosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateComentarioDto) {
    return await this.prisma.comentarios_avaliacao.create({
      data: {
        usuarioId: data.usuarioId,
        avaliacaoLojaId: data.avaliacaoLojaId,
        texto: data.texto,
      },
      select: {
        id: true,
        texto: true,
        usuarioId: true,
        avaliacaoLojaId: true,
      },
    });
  }

  async findAll() {
    return this.prisma.comentarios_avaliacao.findMany();
  }

  async findOne(id: number) {
    const comentario = await this.prisma.comentarios_avaliacao.findUnique({
      where: { id },
      select: { // E aqui também!
        id: true,
        texto: true,
        usuarioId: true,
        avaliacaoLojaId: true,
      },
    });

    if (!comentario) {
      throw new Error('Comentário não encontrado');
    }

    return comentario;
  }

  async update(id: number, data: UpdateComentarioDto) {
    const comentario = await this.prisma.comentarios_avaliacao.findUnique({
      where: { id },
    });

    if (!comentario) {
      throw new Error('Comentário não encontrado');
    }

    return this.prisma.comentarios_avaliacao.update({
      where: { id },
      data: {
        texto: data.texto
      }
      
    });
  }

  async remove(id: number) {
    const comentario = await this.prisma.comentarios_avaliacao.findUnique({
      where: { id },
    });

    if (!comentario) {
      throw new Error('Comentário não encontrado');
    }
    return this.prisma.comentarios_avaliacao.delete({
      where: { id },
    });
  }
  }
