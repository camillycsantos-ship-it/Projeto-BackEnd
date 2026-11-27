import type { Request, Response } from "express";
import type { IAnimalRepository, AnimalDTO, FiltroAnimalDTO } from "../repositories/IAnimalRepository.js";

class AnimalController{

    private animalRepository: IAnimalRepository;

    constructor(animalRepository: IAnimalRepository){
        this.animalRepository = animalRepository;
    }

    async listar (req: Request, res: Response) {
        try{
                const listaAnimais = await this.animalRepository.listar();
                res.status(201).json(listaAnimais);
                }catch(error){
                    res.status(404).json({ mensagem: "Erro ao buscar animal."});
                }
    }

    async buscarPorId (req: Request<{ id: string }>, res: Response) {
            try{
                const { id } = req.params;
                const animalEncontrado = await this.animalRepository.buscaPorId(id);

                if(!animalEncontrado) {
                    res.status(404).json({mensagem: "Animal não encontrado."});
                    return;
                }
                res.status(201).json(animalEncontrado);
            }catch(error){
                res.status(500).json({mensagem: "Erro ao encontrar animal por id."});
            }
        }

    async buscaPorFiltro ( req: Request, res: Response) {
        try{
            const { animal, anos, disponibilidade } = req.query;
            const filtro: Record<string, any> = {};

            if(animal) {
                filtro.especie = {$regex: String(animal), $options: "i"}
            }
            if(anos) {
                filtro.idade = String(anos);
            }
            if(disponibilidade) {
                filtro.situacao = String(disponibilidade);
            }

            const animaisFiltrados = await this.animalRepository.buscaPorFiltro(filtro);

            res.status(201).json(animaisFiltrados);

        }catch(error){
            res.status(400).json({mensagem: "Erro ao encontrar animal por filtro."})
        }
}

    async cadastrar (req: Request, res: Response) {
        try{
        const novoAnimal = await this.animalRepository.cadastrar(req.body);
        
        res.status(201).json(novoAnimal);
    }catch (error) {
        console.error("Erro ao salvar animal:", error);
        res.status(500).json({ erro: "Não foi possível salvar o animal." });
        }
    }

    async atualizar (req: Request<{id: string},{}>, res: Response) {
        try {
            const { id } = req.params;
            const animalAtualizado = await this.animalRepository.atualizar(id, req.body);
        if (!animalAtualizado) {
            return res.status(404).json({ erro: "Animal não encontrado." });
        }
        return res.status(200).json(animalAtualizado);
        }catch (error) {
            console.error("Erro ao atualizar animal:", error);
            return res.status(500).json({ erro: "Não foi possível atualizar o animal." });
    }
    }

    async atualizarParcialmente (req: Request<{ id: string }>, res: Response) {
        try{
            const { id } = req.params;
            const animalAtualizado = await this.animalRepository.atualizarParcialmente(id, req.body);
        if(!animalAtualizado){
            res.status(404).json({mensagem: "Animal não encontrado!"});
            return;
        }
            res.status(200).json({
                mensagem: "Animal atualizado parcialmente com sucesso!",
                animal: animalAtualizado,
    });
        }catch(error){
            res.status(500).json({mensagem: "Erro ao atualizar parcialmente o animal."})
        }
    }

    async deletar (req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;
            const animalDeletado = await this.animalRepository.deletar(id);

            if (!animalDeletado) {
            return res.status(404).json({ erro: "Animal não encontrado." });
        }

        return res.status(200).json({
            mensagem: "Animal deletado com sucesso.",
            animal: animalDeletado
        });
        }catch(error){
            console.error("Erro ao deletar animal:", error);
            return res.status(500).json({ erro: "Não foi possível deletar o animal." });
        }
    }
};

export default AnimalController;