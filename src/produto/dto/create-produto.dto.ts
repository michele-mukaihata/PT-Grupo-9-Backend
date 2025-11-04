export class CreateProdutoDto {
    lojaId: number;
    categoriaId: number;
    nome: string;
    descricao?: string;
    preco: number;
    estoque: number;
}

