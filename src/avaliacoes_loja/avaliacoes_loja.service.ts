import { Injectable } from '@nestjs/common';
import { CreateAvaliacoesLojaDto } from './dto/create-avaliacoes_loja.dto';
import { UpdateAvaliacoesLojaDto } from './dto/update-avaliacoes_loja.dto';

@Injectable()
export class AvaliacoesLojaService {
  create(createAvaliacoesLojaDto: CreateAvaliacoesLojaDto) {
    return 'This action adds a new avaliacoesLoja';
  }

  findAll() {
    return `This action returns all avaliacoesLoja`;
  }

  findOne(id: number) {
    return `This action returns a #${id} avaliacoesLoja`;
  }

  update(id: number, updateAvaliacoesLojaDto: UpdateAvaliacoesLojaDto) {
    return `This action updates a #${id} avaliacoesLoja`;
  }

  remove(id: number) {
    return `This action removes a #${id} avaliacoesLoja`;
  }
}
