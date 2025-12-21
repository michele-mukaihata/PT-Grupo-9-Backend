import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';

export class UpdateAvaliacoesLojaDto {

  @IsOptional()
  @IsInt()
  nota?: number;

  @IsOptional()
  @IsString()
  comentario?: string;

}
