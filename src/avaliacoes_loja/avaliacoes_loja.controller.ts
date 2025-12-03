import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvaliacoesLojaService } from './avaliacoes_loja.service';
import { CreateAvaliacoesLojaDto } from './dto/create-avaliacoes_loja.dto';
import { UpdateAvaliacoesLojaDto } from './dto/update-avaliacoes_loja.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Public } from 'src/auth/decorators/isPublic.decorator';

@Controller('avaliacoes-loja')
export class AvaliacoesLojaController {
  constructor(private readonly avaliacoesLojaService: AvaliacoesLojaService) {}
  
  @Public()
  @Post()
  async create(@Body() createAvaliacoesLojaDto: CreateAvaliacoesLojaDto) {
    return this.avaliacoesLojaService.create(createAvaliacoesLojaDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.avaliacoesLojaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avaliacoesLojaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvaliacoesLojaDto: UpdateAvaliacoesLojaDto) {
    return this.avaliacoesLojaService.update(+id, updateAvaliacoesLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avaliacoesLojaService.remove(+id);
  }
}
