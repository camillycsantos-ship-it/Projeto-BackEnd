import Animal from "../models/Animal.js";
import type { IAnimalRepository, AnimalDTO, FiltroAnimalDTO } from "./IAnimalRepository.js";

export class MongoAnimalRepository implements IAnimalRepository{

    static async buscaPorId(id: string){
        return await Animal.findById(id);
    }

    static async buscaPorFiltro(filtros: FiltroAnimalDTO){
        const filtro: Record<string, any> = {};
        if(filtros.disponibilidade) filtro.situacao = filtros.disponibilidade;
        if(filtros.anos) filtro.idade = filtros.anos;
        if(filtros.animal){
            filtro.especie = {$regex: filtros.animal, $options: "id"};
        }
        return await Animal.find(filtro);
    }

    async cadastrar(dados: AnimalDTO): {
        return await Animal.create({
            nome: dados.nome,
            especie: dados.especie,
            idade: dados.idade,
            ...(dados.cover !== undefined ? { cover: dados.cover}: {}),
            situacao: dados.situacao
        });
    }

    async atualizar(id: string, dados: AnimalDTO):{
        return await Animal.findByIdAndUpdate(
            id,
            {$set: dados },
            {new: true }
        )
    }

    async deletar (id: string){
        const animalDeletado = await Animal.findByIdAndDelete(id);
        return Boolean(animalDeletado);
    }
}