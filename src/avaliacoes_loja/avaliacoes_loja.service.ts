import { Injectable, NotFoundException } from '@nestjs/common';
//NotFoundException é usado quando uma informação não é existente no sistema. Error é utilizado para falhas críticas
import { CreateAvaliacoesLojaDto } from './dto/create-avaliacoes_loja.dto';
import { UpdateAvaliacoesLojaDto } from './dto/update-avaliacoes_loja.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AvaliacoesLojaService {

  constructor(private prisma: PrismaService){}
  
  async create(data: CreateAvaliacoesLojaDto) {
    const avaliacao = await this.prisma.avaliacoes_loja.create({
      data:{
        lojaId : data.lojaId,
        nota : data.nota, 
        usuarioId: data.usuarioId,
        comentario : data.comentario,
      }
    })
    return avaliacao;
  }

  async findAll() {
    return this.prisma.avaliacoes_loja.findMany();
  }

  async findOne(id: number) {
    const avaliacaoExists = await this.prisma.avaliacoes_loja.findUnique({
      where: {id}
    });
    if (!avaliacaoExists) {
      throw new NotFoundException("Essa avaliação de loja não existe.") 
    }
    return avaliacaoExists;
  }

  async update(id: number, data: UpdateAvaliacoesLojaDto) {
    const avaliacaoExists = await this.prisma.avaliacoes_loja.findUnique({
      where: {id}
    });
    if (!avaliacaoExists) {
      throw new NotFoundException("Essa avaliação de loja não existe.") 
    }
    return await this.prisma.avaliacoes_loja.update({
      data,
      where: {id}
    }); 
  }


  async remove(id: number) {
    const avaliacaoExists = await this.prisma.avaliacoes_loja.findUnique({
      where: {id}
    });
    if (!avaliacaoExists){
      throw new NotFoundException('Essa avaliação de loja não existe');
    }
    return await this.prisma.avaliacoes_loja.delete({
      where: {id},
    });
  }
}
