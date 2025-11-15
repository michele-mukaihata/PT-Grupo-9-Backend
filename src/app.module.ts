/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { ImagensProdutoModule } from './imagens_produto/imagens_produto.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LojasModule } from './lojas/lojas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';

@Module({
  imports: [ProdutoModule, ImagensProdutoModule, UsuariosModule, LojasModule, CategoriasModule, AuthModule, JwtModule, ConfigModule.forRoot({isGlobal: true,}),],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard, },],
})
export class AppModule {}