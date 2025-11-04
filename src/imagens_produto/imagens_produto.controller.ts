import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagensProdutoService } from './imagens_produto.service';
import { CreateImagensProdutoDto } from './dto/create-imagens_produto.dto';
import { UpdateImagensProdutoDto } from './dto/update-imagens_produto.dto';


@Controller('imagens-produto')
export class ImagensProdutoController {
  constructor(private readonly imagensProdutoService: ImagensProdutoService) {}

  @Post()
  async create(@Body() data: CreateImagensProdutoDto) {
    return this.imagensProdutoService.create(data);
  }

  @Get()
  async findAll() {
    return this.imagensProdutoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.imagensProdutoService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateImagensProdutoDto) {
    return this.imagensProdutoService.update(Number(id), data);
  }

  @Delete(':id')
  async delete (@Param('id') id: number) {
    return this.imagensProdutoService.delete(Number(id));
  }
}
