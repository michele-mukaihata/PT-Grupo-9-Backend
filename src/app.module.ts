import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { ImagensProdutoModule } from './imagens_produto/imagens_produto.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LojasModule } from './lojas/lojas.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [ProdutoModule, ImagensProdutoModule, UsuariosModule, LojasModule, CategoriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  