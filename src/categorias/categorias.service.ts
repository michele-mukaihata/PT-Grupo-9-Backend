import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class CategoriasService {

    constructor(private prisma: PrismaService){};

  async create(data: CreateCategoriaDto) {
    const categoria = await this.prisma.categorias.create({
      data:{
      nome: data.nome,
      categoriaPaiId: data.categoriaPaiId || null, //Existe categoria pai somente se for uma subcategoria
      }
    })
    return categoria;
  }

  async findAll() {
    return this.prisma.findMany();
  }

  async findOne(id: number) {
    const categoriaExists = await this.prisma.categorias.findUnique({
      where: {id}
    });
    if (!categoriaExists) {
      throw new Error("Essa categoria nao existe.") 
    }
    return categoriaExists;
  }

  async update(id: number, data: UpdateCategoriaDto) {
    const categoriaExists = await this.prisma.categorias.findUnique({
      where: {id}
    });
    if (!categoriaExists) {
      throw new Error("Essa categoria nao existe.") 
    }
    return await this.prisma.categorias.update({
      data,
      where: {id}
    }); 
  }

  async remove(id: number) {
    const lojaExists = await this.prisma.categorias.findUnique({
      where: {id}
    });
    if (!lojaExists){
      throw new Error("Essa loja não existe");
    }
    return await this.prisma.lojas.delete({
      where: {id},
    });
  }
}
