import { Module } from '@nestjs/common';
import { ImagensProdutoService } from './imagens_produto.service';
import { ImagensProdutoController } from './imagens_produto.controller';
import { PrismaService } from 'src/database/prisma.service'


@Module({
  controllers: [ImagensProdutoController],
  providers: [ImagensProdutoService, PrismaService],
})
export class ImagensProdutoModule {}
