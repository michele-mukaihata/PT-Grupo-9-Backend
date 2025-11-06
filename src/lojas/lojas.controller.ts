import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LojasService } from './lojas.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';

@Controller('lojas')
export class LojasController {
  constructor(private readonly lojasService: LojasService) {}

  @Post()
  async create(@Body() createLojaDto: CreateLojaDto) {
    return this.lojasService.create(createLojaDto);
  }

  @Get()
  async findAll() {
    return this.lojasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.lojasService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateLojaDto: UpdateLojaDto) {
    return this.lojasService.update(Number(id), updateLojaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.lojasService.remove(Number(id));
  }
}
