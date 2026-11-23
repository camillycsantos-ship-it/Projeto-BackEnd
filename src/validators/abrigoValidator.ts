import { z } from "zod";

export const criarAbrigoValidator = z.object ({
    nome: z.string().min(1, "O nome do abrigo deve ter pelo menos 1 caractere."),
    endereco: z.string().min(3, "O endereçp deve ter pelo menos 3 caracteres."),
    avaliacao: z.number().int("A avaliação do abrigo deve ser um número inteiro.")
})

export const atualizarAbrigoValidator = criarAbrigoValidator.partial();