import { z } from "zod";

export const criarAnimalValidator = z.object ({
    nome: z.string().min(1, "O nome do animal deve ter pelo menos 1 caractere."),
    especie: z.string().min(3, "A especie do animal deve te pelo menos 3 caracteres."),
    idade: z.number().int("A idade do animal deve ser um número inteiro."),
    situacao: z.string().min(3, "A situação do animal deve ter mais de 3 caracteres."),
    cover: z
        .string()
        .url("A foto do animal deve ser uma URL válida.")
        .optional()
        .or (z.literal(""))
        .transform((val) => (val === "" ? undefined:val)),
})

export const atualizarAnimalValidator = criarAnimalValidator.partial();