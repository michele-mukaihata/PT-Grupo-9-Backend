import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { ImagensProdutoModule } from './imagens_produto/imagens_produto.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [ProdutoModule, ImagensProdutoModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
