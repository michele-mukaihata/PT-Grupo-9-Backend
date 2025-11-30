import { IsOptional, IsString } from "class-validator";

export class UsuariosEntity {
    @IsString()
    id: number;

    @IsString()
    email: string;

    @IsString()
    senha: string;

    @IsString()
    @IsOptional()    
    nome?: string;

    createdAt?: Date; //não é necessário colocar
    updatedAt?: Date; //não é necessário colocar
}