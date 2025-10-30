export class Loja {
    id: number;
    nome: string;
    endereco: string;
    descricao: string | null; // Pode ser preenchido ou não
    telefone: string | null; // Pode ser preenchido ou não

    // FKs -> Para futuro no BD
    idProprietario: number;
    idCategoria: number;
}
