import { z } from "zod";

export const criarAbrigoValidator = z.object ({
    nome: z.string().min(1, "O nome do abrigo deve ter pelo menos 1 caractere."),
    endereco: z.object({
        rua: z.string().min(1),
        bairro: z.string().min(1),
        numero: z.number().int(),
        complemento: z.string().optional(),
}),
    avaliacao: z.number().int().min(0).max(5),
})

export const atualizarAbrigoValidator = criarAbrigoValidator.partial();