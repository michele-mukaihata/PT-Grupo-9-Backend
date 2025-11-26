import { Module } from '@nestjs/common';
import { AvaliacoesLojaService } from './avaliacoes_loja.service';
import { AvaliacoesLojaController } from './avaliacoes_loja.controller';

@Module({
  controllers: [AvaliacoesLojaController],
  providers: [AvaliacoesLojaService],
})
export class AvaliacoesLojaModule {}
