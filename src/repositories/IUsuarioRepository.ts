export interface UsuarioDTO {
    id?: string;
    nome: string;
    email: string;
    senha: string;
    adocoes: Adocao[];
}

export interface Adocao{
    adocao: UsuarioDTO
}