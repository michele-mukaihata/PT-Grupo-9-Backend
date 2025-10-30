export class CreateLojaDto {
    nome: string;
    endereco: string;
    descricao: string;
    telefone: string;
    categoriaId: number;    // Isso seria para o banco de dados, como FK
    idUsuario: number; // <-- usado para testes
}
