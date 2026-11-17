import type { Request, Response } from "express";
import Animal from "../models/Animal.js";
import mongoose from "mongoose";

class AnimalController{
    static async listar (req: Request, res: Response) {
        try{
                const animais = await Animal.find();
                res.status(200).json(animais);
                }catch(error){
                    res.status(500).json({ mensagem: "Erro ao buscar animal."});
                }
    }

    static async cadastrar (req: Request, res: Response) {
        try{
        const { nome, especie, idade, situacao, cover } = req.body;
        const novoAnimal = await Animal.create({
            nome,
            especie,
            idade,
            cover,
            situacao: situacao || "Disponivel"
        });
        res.status(201).json(novoAnimal);
    }catch (error) {
        console.error("Erro ao salvar animal:", error);
        res.status(500).json({ erro: "Não foi possível salvar o animal." });
        }
    }

    static async atualizar (req: Request, res: Response) {
        try {
            const animalAtualizado = await Animal.findByIdAndUpdate(
                req.params.id,
                { situacao: req.body.situacao },
                { new: true }
            );
        if (!animalAtualizado) {
            return res.status(404).json({ erro: "Animal não encontrado." });
        }
        return res.status(200).json(animalAtualizado);
        }catch (error) {
            console.error("Erro ao atualizar animal:", error);
            return res.status(500).json({ erro: "Não foi possível atualizar o animal." });
    }
    }

    static async atualizarParcialmente (req: Request<{ id: string }>, res: Response) {
        try{
            const { id } = req.params;
            const animalAtualizado = await Animal.findByIdAndUpdate(
                id,
                {$set: req.body},
                { new: true}
            );
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

    static async deletar (req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ erro: "ID informado possui formato inválido." });
    }
        try {
            const animalRemovido = await Animal.findByIdAndDelete(id);
        if (!animalRemovido) {
            return res.status(404).json({ erro: "Animal não encontrado." });
        }
        return res.status(200).json({
            mensagem: "Animal deletado com sucesso.",
            animal: animalRemovido
        });
        }catch(error){
            console.error("Erro ao deletar animal:", error);
            return res.status(500).json({ erro: "Não foi possível deletar o animal." });
        }
    }
}

export default AnimalController;