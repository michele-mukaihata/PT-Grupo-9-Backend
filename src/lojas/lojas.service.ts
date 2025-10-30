import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Loja } from './entities/loja.entity';

@Injectable()
export class LojasService{
  private lojas: Loja[] = [];
  private ultimoId = 0;

create(createLojaDto: CreateLojaDto): Loja{
    this.ultimoId++;
    const novaLoja: Loja = { id: this.ultimoId, ...createLojaDto, };
    this.lojas.push(novaLoja);
    return novaLoja;
  }

  findAll(): Loja[]{
    return this.lojas;
  }

  findOne(id: number): Loja{
    const loja = this.lojas.find((loja) => loja.id === id);
    if(!loja){
      throw new NotFoundException(`Loja com o ID ${id} não encontrada.`);
    }
    return loja;
  }

  update(id: number, updateLojaDto: UpdateLojaDto): Loja{
    const loja = this.findOne(id);
    const index = this.lojas.findIndex((l) => l.id === id);
    const lojaAtualizada = { ...loja, ...updateLojaDto };
    this.lojas[index] = lojaAtualizada;
    return lojaAtualizada;
  }

  remove(id: number): Loja{
    this.findOne(id);
    const index = this.lojas.findIndex((l) => l.id === id);
    const [lojaRemovida] = this.lojas.splice(index, 1);
    return lojaRemovida;
  }
}
