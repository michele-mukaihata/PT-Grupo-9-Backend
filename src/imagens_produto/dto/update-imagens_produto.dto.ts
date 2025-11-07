import { PartialType } from '@nestjs/mapped-types';
import { CreateImagensProdutoDto } from './create-imagens_produto.dto';

export class UpdateImagensProdutoDto extends PartialType(CreateImagensProdutoDto) {}
