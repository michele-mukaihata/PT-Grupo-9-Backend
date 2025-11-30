import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    senhaAntiga: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'A nova senha deve ter pelo menos 6 caracteres' })
    novaSenha: string;
}