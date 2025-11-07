import { Injectable } from '@nestjs/common';
import { CreateImagensProdutoDto } from './dto/create-imagens_produto.dto';
import { UpdateImagensProdutoDto } from './dto/update-imagens_produto.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ImagensProdutoService {
  constructor(private prisma: PrismaService) {};

  async create(data: CreateImagensProdutoDto) {
    const imagem_produto = await this.prisma.imagens_produto.create({
        data: {
          produtoId: data.produtoId,
          url_imagem: data.url_imagem,
          ordem: data.ordem,
    },
    });
    return imagem_produto;
  }

  async findAll() {
    return this.prisma.imagens_produto.findMany();
  }

  async findOne(id: number) {
    const imagem_produtoexists = this.prisma.imagens_produto.findUnique({
      where : {id}
    });
    if(!imagem_produtoexists){
      throw new Error("Imagem do produto não existe");
    }
    return imagem_produtoexists;
  }

  async update(id: number, data: UpdateImagensProdutoDto) {
    const imagem_produtoexists = await this.prisma.imagens_produto.findUnique({
      where: {id}
    });
    if (!imagem_produtoexists){
      throw new Error("Imagem não encontrada");
    }
    return await this.prisma.imagens_produto.update({
      data,
      where: {id}
    })
  }

  async delete(id: number) {
    const imagem_produtoexists = await this.prisma.imagens_produto.findUnique({
      where: {id}
    });
    if(!imagem_produtoexists){
      throw new Error("Imagem não encontrada");
    }  
    return await this.prisma.imagens_produto.delete({
      where: {id}
    });
  }
}
