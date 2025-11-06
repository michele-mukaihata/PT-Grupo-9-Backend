import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dados: CreateUsuarioDto) {
    const existingUsuario = await this.prisma.usuarios.findUnique({ where: { email: dados.email } });
    if (existingUsuario) {
      throw new ConflictException('Este e-mail já está sendo usado.');
    }

    const hashedPassword = await bcrypt.hash(dados.senha_hash, 10);
    
    return await this.prisma.usuarios.create({
      data: {
        email: dados.email,
        username: dados.username, // Adicionando username ao data
        nome: dados.nome,
        senha_hash: hashedPassword,
        foto_perfil_url: dados.foto_perfil_url || null,
      },
    });
  }

  async findAll() {
    return await this.prisma.usuarios.findMany({
      select: {
        id: true,
        email: true,
        nome: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        nome: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${id} not found`);
    }

    return usuario;
  }

  async findByEmail(email: string) {
    const usuario = await this.prisma.usuarios.findUnique({ where: { email } });

    if (!usuario) {
      return null;
    }
    
    return usuario;
  }

  async update(id: number, dados: UpdateUsuarioDto) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${id} not found`);
    }

  const hashedPassword = dados.senha_hash
    ? await bcrypt.hash(dados.senha_hash, 10)
    : usuario.senha_hash; // Caso contrário, mantém o hash da senha existente


    return await this.prisma.usuarios.update({
      where: { id },
      data: {
        email: dados.email,
        username: dados.username, // Atualiza username
        nome: dados.nome,         // Atualiza nome
        senha_hash: hashedPassword,          // Atualiza a senha, se fornecida
        foto_perfil_url: dados.foto_perfil_url || usuario.foto_perfil_url,
      },
      select: {
        id: true,
        email: true,
        nome: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: number) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${id} not found`);
    }

    return await this.prisma.usuarios.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        nome: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}