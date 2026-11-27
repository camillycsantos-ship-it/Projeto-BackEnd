import { prisma } from "../config/dbConnectPostgres.js";
import type { IAnimalRepository, AnimalDTO, FiltroAnimalDTO } from "./IAnimalRepository.js";
import type { Prisma } from "../generated/prisma/client.js";

const PRISMA_RECORD_NOT_FOUND = "P2025";

function registroNaoEncontrado(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        (error as { code?: string }).code === PRISMA_RECORD_NOT_FOUND
    );
}

function limparDados(dados: Partial<AnimalDTO>): Prisma.AnimalUpdateInput {
    const { id: _id, ...resto } = dados;
    return Object.fromEntries(
        Object.entries(resto).filter(([, valor]) => valor !== undefined)
    ) as Prisma.AnimalUpdateInput;
}

export class PostgresAnimalRepository implements IAnimalRepository {

    async listar() {
        return await prisma.animal.findMany();
    }

    async buscaPorId(id: string) {
        return await prisma.animal.findUnique({ where: { id } });
    }

    async buscaPorFiltro(filtros: FiltroAnimalDTO) {
        const where: {
            situacao?: string;
            idade?: number;
            especie?: { contains: string; mode: "insensitive" };
        } = {};

        if (filtros.disponibilidade) where.situacao = filtros.disponibilidade;
        if (filtros.anos) where.idade = filtros.anos;
        if (filtros.animal) {
            where.especie = { contains: filtros.animal, mode: "insensitive" };
        }

        return await prisma.animal.findMany({ where });
    }

    async cadastrar(dados: AnimalDTO) {
        return await prisma.animal.create({
            data: {
                nome: dados.nome,
                especie: dados.especie,
                idade: dados.idade,
                situacao: dados.situacao,
                ...(dados.cover !== undefined ? { cover: dados.cover } : {}),
            },
        });
    }

    async atualizar(id: string, dados: AnimalDTO) {
        try {
            return await prisma.animal.update({
                where: { id },
                data: limparDados(dados),
            });
        } catch (error) {
            if (registroNaoEncontrado(error)) return null;
            throw error;
        }
    }

    async atualizarParcialmente(id: string, dados: Partial<AnimalDTO>) {
        try {
            return await prisma.animal.update({
                where: { id },
                data: limparDados(dados),
            });
        } catch (error) {
            if (registroNaoEncontrado(error)) return null;
            throw error;
        }
    }

    async deletar(id: string) {
        try {
            await prisma.animal.delete({ where: { id } });
            return true;
        } catch (error) {
            if (registroNaoEncontrado(error)) return false;
            throw error;
        }
    }
}