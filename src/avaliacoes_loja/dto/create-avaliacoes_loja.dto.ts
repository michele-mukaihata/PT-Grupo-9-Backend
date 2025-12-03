import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
//Tive que adicionar esses decorators porque minha integração com o front estava
// dando alguns problemas de conexão
export class CreateAvaliacoesLojaDto {
    @IsInt()
    usuarioId : number;

    @IsInt()
    lojaId : number;

    @IsInt()
    nota : number;

    @IsOptional()
    @IsString()
    comentario? : string;
}
