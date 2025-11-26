import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { ImagensProdutoModule } from './imagens_produto/imagens_produto.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LojasModule } from './lojas/lojas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { AvaliacoesProdutoModule } from './avaliacoes_produto/avaliacoes_produto.module';
import { PrismaService } from './database/prisma.service';
import { AvaliacoesLojaModule } from './avaliacoes_loja/avaliacoes_loja.module';

@Module({
  imports: [ProdutoModule, ImagensProdutoModule, UsuariosModule, LojasModule, CategoriasModule, AvaliacoesProdutoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
  