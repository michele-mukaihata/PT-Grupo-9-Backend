import { Module } from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesController } from './avaliacoes.controller';
import { prismaVersion } from 'generated/prisma/internal/prismaNamespace';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AvaliacoesController],
  providers: [AvaliacoesService, PrismaService],
})
export class AvaliacoesModule {}
