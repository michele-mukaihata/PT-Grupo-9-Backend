import { Module } from '@nestjs/common';
import { AvaliacoesLojaService } from './avaliacoes_loja.service';
import { AvaliacoesLojaController } from './avaliacoes_loja.controller';
import { prismaVersion } from 'generated/prisma/internal/prismaNamespace';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from 'generated/prisma/browser';

@Module({
  controllers: [AvaliacoesLojaController],
  providers: [AvaliacoesLojaService, PrismaService],
})
export class AvaliacoesLojaModule {}
