import { Injectable, NotFoundException } from '@nestjs/common';
//NotFoundException é usado quando uma informação não é existente no sistema. Error é utilizado para falhas críticas
import { CreateAvaliacoesProdutoDto } from './dto/create-avaliacoes_produto.dto';
import { UpdateAvaliacoesProdutoDto } from './dto/update-avaliacoes_produto.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AvaliacoesProdutoService {

  constructor(private prisma: PrismaService){}
  
  async create(data: CreateAvaliacoesProdutoDto) {
    const avaliacao = await this.prisma.avaliacoes_produto.create({
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
    return this.prisma.avaliacoes_produto.findMany();
  }

  async findOne(id: number) {
    const avaliacaoExists = await this.prisma.avaliacoes_produto.findUnique({
      where: {id}
    });
    if (!avaliacaoExists) {
      throw new NotFoundException("Essa avaliação nao existe.") 
    }
    return avaliacaoExists;
  }

  async update(id: number, data: UpdateAvaliacoesProdutoDto) {
    const avaliacaoExists = await this.prisma.avaliacoes_produto.findUnique({
      where: {id}
    });
    if (!avaliacaoExists) {
      throw new NotFoundException("Essa avaliação não existe.") 
    }
    return await this.prisma.avaliacoes_produto.update({
      data,
      where: {id}
    }); 
  }


  async remove(id: number) {
    const avaliacaoExists = await this.prisma.avaliacoes_produto.findUnique({
      where: {id}
    });
    if (!avaliacaoExists){
      throw new NotFoundException('Essa avaliação não existe');
    }
    return await this.prisma.avaliacoes_produto.delete({
      where: {id},
    });
  }
}
