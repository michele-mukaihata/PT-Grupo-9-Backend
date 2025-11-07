import { Injectable } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LojasService {
  
  constructor(private prisma: PrismaService) {};

  async create(data: CreateLojaDto) {
    const loja = await this.prisma.lojas.create({
      data: {
        nome: data.nome,
        usuarioId: data.usuarioId,
        descricao: data.descricao,
        logo_url: data.logo_url,
        banner_url: data.banner_url,
        sticker_url: data.sticker_url,
      }
    });
    return loja;
  }

  async findAll() {
    return this.prisma.lojas.findMany();
  }

  async findOne(id: number) {
    const lojasexists = await this.prisma.lojas.findUnique({
      where: {id}
    });
    if (!lojasexists){
      throw new Error("Não existe essa loja")
    }
    return lojasexists;
  }

  async update(id: number, data: UpdateLojaDto) {
    const lojaexists = await this.prisma.lojas.findUnique({
      where: {id}
    });
    if (!lojaexists){
      throw new Error ("Essa loja não existe");
    }
    return await this.prisma.lojas.update({
      data,
      where: {id}
    });
  }

  async remove(id: number) {
    const lojaexists = await this.prisma.lojas.findUnique({
      where: {id}
    });
    if (!lojaexists){
      throw new Error ("Essa loja não existe");
    }
    return await this.prisma.lojas.delete({
      where: {id},
    });
  }
}
