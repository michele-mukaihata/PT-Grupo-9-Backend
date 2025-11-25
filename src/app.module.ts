import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { ImagensProdutoModule } from './imagens_produto/imagens_produto.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LojasModule } from './lojas/lojas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';
import { PrismaService } from './database/prisma.service';
import { ComentariosModule } from './comentarios/comentarios.module';

@Module({
  imports: [ProdutoModule, ImagensProdutoModule, UsuariosModule, LojasModule, CategoriasModule, AvaliacoesModule, ComentariosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
  