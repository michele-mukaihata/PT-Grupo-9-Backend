import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateComentarioDto {
  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @IsInt()
  @IsNotEmpty()
  avaliacaoLojaId: number;

  @IsString()
  @IsNotEmpty()
  texto: string;
}