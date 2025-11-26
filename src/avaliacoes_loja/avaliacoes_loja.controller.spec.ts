import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacoesLojaController } from './avaliacoes_loja.controller';
import { AvaliacoesLojaService } from './avaliacoes_loja.service';

describe('AvaliacoesLojaController', () => {
  let controller: AvaliacoesLojaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvaliacoesLojaController],
      providers: [AvaliacoesLojaService],
    }).compile();

    controller = module.get<AvaliacoesLojaController>(AvaliacoesLojaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
