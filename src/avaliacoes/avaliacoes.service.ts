import { Injectable, NotFoundException } from '@nestjs/common';
//NotFoundException é usado quando uma informação não é existente no sistema. Error é utilizado para falhas críticas
import { CreateAvaliacoeDto } from './dto/create-avaliacoe.dto';
import { UpdateAvaliacoeDto } from './dto/update-avaliacoe.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AvaliacoesService {

  constructor(private prisma: PrismaService){}
  
  async create(data: CreateAvaliacoeDto) {
    const avaliacao = await this.prisma.avaliacao_produto.create({
      data:{
        usuarioId : data.usuarioId,
        produtoId : data.produtoId,
        nota : data.nota, 
        comentario : data.comentario,
      }
    })
    return avaliacao;
  }

  async findAll() {
    return this.prisma.avaliacao_produto.findMany();
  }

  async findOne(id: number) {
    const avaliacaoExists = await this.prisma.avaliacao_produto.findUnique({
      where: {id}
    });
    if (!avaliacaoExists) {
      throw new NotFoundException("Essa avaliação nao existe.") 
    }
    return avaliacaoExists;
  }

  async update(id: number, data: UpdateAvaliacoeDto) {
    const avaliacaoExists = await this.prisma.avaliacao_produto.findUnique({
      where: {id}
    });
    if (!avaliacaoExists) {
      throw new NotFoundException("Essa avaliação não existe.") 
    }
    return await this.prisma.avaliacao_produto.update({
      data,
      where: {id}
    }); 
  }


  async remove(id: number) {
    const avaliacaoExists = await this.prisma.avaliacao_produto.findUnique({
      where: {id}
    });
    if (!avaliacaoExists){
      throw new NotFoundException('Essa avaliação não existe');
    }
    return await this.prisma.avaliacao_produto.delete({
      where: {id},
    });
  }
}
