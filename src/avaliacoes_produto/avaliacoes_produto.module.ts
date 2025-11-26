import { Module } from '@nestjs/common';
import { AvaliacoesProdutoService } from './avaliacoes_produto.service';
import { AvaliacoesProdutoController } from './avaliacoes_produto.controller';
import { prismaVersion } from 'generated/prisma/internal/prismaNamespace';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AvaliacoesProdutoController],
  providers: [AvaliacoesProdutoService, PrismaService],
})
export class AvaliacoesProdutoModule {}
