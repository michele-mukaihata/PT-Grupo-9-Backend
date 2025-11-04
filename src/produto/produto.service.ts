import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class ProdutoService {
  // vamos criar o prisma e nesse prisma vamos chamar o prisma service

  constructor(private prisma: PrismaService) {}

async create(data: CreateProdutoDto) {
  const produto = await this.prisma.produtos.create({
    data: {
      lojaId: data.lojaId,
      categoriaId: data.categoriaId,
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
      estoque: data.estoque,
    },
  });
  return produto;
}

  async findAll() {
    return this.prisma.produtos.findMany();
  }

  async findOne(id: number) {
    const produtoexists =  this.prisma.produtos.findUnique({ where: { id } });
    if(!produtoexists){
      throw new Error("Produto não encontrado");
    }
    return produtoexists;
  }

  async update(id: number, data: UpdateProdutoDto) {
    // vamos ver se existe
    const produtoexists = await this.prisma.produtos.findUnique({where: {id}})
    if (!produtoexists){
      //abrir um novo erro
      throw new Error("Produto não encontrado");
    }
    return await this.prisma.produtos.update({
      data,
      where: {id}
    });

  }

  async delete(id: number) {
    const produtoexists = await this.prisma.produtos.findUnique({where: {id}});
    if(!produtoexists){
      throw new Error("Produto não encontrado");
    }
    return await this.prisma.produtos.delete({
      where: {id}
    });
  }

}
