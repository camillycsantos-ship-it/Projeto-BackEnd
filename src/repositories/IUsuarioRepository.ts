export interface UsuarioDTO {
    id?: string;
    nome: string;
    email: string;
    semha: string;
    adocoes: Adocao[];
}

export interface Adocao{
    adocao: UsuarioDTO
}