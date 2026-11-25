export interface AbrigoDTO {
    id?: string;
    nome: string;
    endereco: {
        rua: { type: String, required: true, trim: true },
        bairro: { type: String, required: true, trim: true },
        numero: { type: Number, required: true },
        complemento: { type: String, trim: true }
    };
    avaliacao: number;
}