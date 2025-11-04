import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import type { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() data: CreateProdutoDto) {
    return this.produtoService.create(data);
  }

  @Get()
  async findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.produtoService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateProdutoDto) {
    return this.produtoService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.produtoService.delete(Number(id));
  }
}