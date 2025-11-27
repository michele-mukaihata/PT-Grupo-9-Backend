import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dados: CreateUsuarioDto) {
    const existingUsuario = await this.prisma.usuarios.findUnique({ where: { email: dados.email } });
    if (existingUsuario) {
      throw new ConflictException('Este e-mail já está sendo usado.');
    }

    const hashedPassword = await bcrypt.hash(dados.senha, 10);
    
    return await this.prisma.usuarios.create({
      data: {
        email: dados.email,
        username: dados.username,
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

  async findByUsername(username: string) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { username },
      select: {
        id: true,
        nome: true,
        email: true,
        username: true,
        foto_perfil_url: true,
        
        Lojas: { 
          select: {
            id: true,
            nome: true,
            Produtos: { 
              select: {
                id: true,
                nome: true,
                preco: true,
                estoque: true, 
                Imagens_produto: { 
                  select: {
                    url_imagem: true,
                    ordem: true
                  },
                  orderBy: { ordem: 'asc' },
                  take: 1
                }
              }
            }
          }
        }
      }
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário ${username} não encontrado`);
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

    let hashedPassword = usuario.senha_hash;
    if (dados.senha) { 
          // 3. Se sim, crie um *novo* hash para a *nova* senha
      hashedPassword = await bcrypt.hash(dados.senha, 10);
    }


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

  async updatePassword(id: number, dados: ChangePasswordDto) {
    const usuario = await this.prisma.usuarios.findUnique({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(dados.senhaAntiga, usuario.senha_hash);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('A senha antiga está incorreta.');
    }

    const newHashedPassword = await bcrypt.hash(dados.novaSenha, 10);

    return await this.prisma.usuarios.update({
      where: { id },
      data: {
        senha_hash: newHashedPassword,
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