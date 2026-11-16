import type { Request, Response } from "express";
import Abrigo from "../models/Abrigo.js";
import mongoose from "mongoose";

class AbrigoController{
    static async listar (req: Request, res: Response) {
        try {
            const abrigos = await Abrigo.find().sort({ nome: 1 });
            return res.status(200).json(abrigos);
        }catch(error) {
            console.error("Erro ao buscar abrigos:", error);
            return res.status(500).json({ mensagem: "Não foi possível carregar os abrigos." });
        }
    }

    static async cadastrar (req: Request, res: Response) {
        try {
            const {nome , endereco, avaliacao } = req.body;
            const novoAbrigo = await Abrigo.create({
                nome,
                endereco: {
                    rua: req.body.endereco.rua,
                    bairro: req.body.endereco.bairro,
                    numero: req.body.endereco.numero,
                    complemento: req.body.endereco.complemento
                },
                    avaliacao
                });
                res.status(201).json(novoAbrigo);
        }catch(error) {
            console.error("Erro ao salvar abrigo: ", error);
            res.status(500).json({ erro: "Não foi possível salvar o abrigo." });
        }
    }

    static async atualizar (req: Request, res: Response) {
        try {
            const abrigoAtualizado = await Abrigo.findByIdAndUpdate(
                req.params.id,
                { avaliacao: req.body.avaliacao },
                { new: true }
            );
        if (!abrigoAtualizado) {
            return res.status(404).json({ erro: "Abrigo não encontrado." });
        }
            return res.status(200).json(abrigoAtualizado);
        }catch(error) {
            console.error("Erro ao atualizar abrigo:", error);
            return res.status(500).json({ erro: "Não foi possível atualizar o abrigo." });
        }
    }

    static async atualizarParcialmente (req: Request<{ id: string }>, res: Response) {
    }

    static async deletar (req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ erro: "ID informado possui formato inválido." });
        }
        try {
            const abrigoRemovido = await Abrigo.findByIdAndDelete(id);
        if (!abrigoRemovido) {
            return res.status(404).json({ erro: "Abrigo não encontrado." });
        }
        return res.status(200).json({
            mensagem: "Abrigo deletado com sucesso.",
            abrigo: abrigoRemovido
        });
    }catch(error) {
        console.error("Erro ao deletar abrigo:", error);
        return res.status(500).json({ erro: "Não foi possível deletar o abrigo." });
        }
    }
}

export default AbrigoController;