import { email, z } from "zod";

export const criarUsuarioValidator = z.object ({
    nome: z.string().min(1, "O nome do usuario deve ter pelo menos 1 caractere."),
    email: z.email().min(3, "O email do usuario deve conter @ como caractere."),
    senha: z.number().int("A senha do usuario deve ser um número inteiro."),
    adocoes: z.string().min(3, "As adoções do usuario deve ter mais de 2 caracteres."),
})

export const atualizarUsuarioValidator = criarUsuarioValidator.partial();