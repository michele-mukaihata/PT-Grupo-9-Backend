import { Module } from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesController } from './avaliacoes.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AvaliacoesController],
  providers: [AvaliacoesService, PrismaService],
})
export class AvaliacoesModule {}
