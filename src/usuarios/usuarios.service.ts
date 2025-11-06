import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUsuariosDto } from './dto/create-usuario.dto';
import { UpdateUsuariosDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuariosDto) {
    const existingUsuario = await this.prisma.usuarios.findUnique({ where: { email: createUsuarioDto.email } });
    if (existingUsuario) {
      throw new ConflictException('Este e-mail já está sendo usado.');
    }

    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);
    
    return await this.prisma.usuarios.create({
      data: {
        ...createUsuarioDto,
        senha_hash: hashedPassword,
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

  async findOne(id: string) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        nome: true,
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

  async update(id: number, updateUsuarioDto: UpdateUsuariosDto) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${id} not found`);
    }

    const hashedPassword = await bcrypt.hash(updateUsuarioDto.senha, 10);

    return await this.prisma.usuarios.update({
      where: { id },
      data: {
        ...updateUsuarioDto,
        senha_hash: hashedPassword,
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