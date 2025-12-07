import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly produtos = [
    {
      id: 1,
      name: 'Brownie Tradicional',
      price: 3.78,
      image: '/produtos/brownie.png',
      discount: 'NOVO',
      color: 'bg-amber-900',
      description: 'Delicioso brownie de chocolate com casquinha crocante por fora e macio por dentro. Feito com chocolate nobre.',
    },
    {
      id: 2,
      name: 'Brownie de Doce de Leite',
      price: 3.99,
      image: '/produtos/brownie_amarelo.png',
      discount: 'FAMOSO',
      color: 'bg-yellow-400',
      description: 'Delicioso brownie de doce de leite mineiro. Macio e suculento.',
    },
    {
      id: 3,
      name: 'Cookie com Gotas de Chocolate',
      price: 2.33,
      image: '/produtos/cookie.png',
      discount: '-10%',
      color: 'bg-orange-200',
      description: 'Cookie artesanal crocante com pedaços generosos de chocolate ao leite e meio amargo.',
    },
    {
      id: 4,
      name: 'Limão Taiti',
      price: 1.99,
      image: '/produtos/limao.png',
      discount: 'OFERTA',
      color: 'bg-lime-500',
      description: 'Limões verdes frescos, com casca verde e vibrante e aroma inconfundível.',
    },
  ];

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('produtos')
  getProdutos() {
    return this.produtos;
  }

  @Get('produtos/:id')
  getProdutoById(@Param('id') id: string) {
    const produtoId = parseInt(id, 10);
    const produto = this.produtos.find((p) => p.id === produtoId);

    if (!produto) {
      throw new NotFoundException(`Produto não encontrado.`);
    }

    return produto;
  }
}