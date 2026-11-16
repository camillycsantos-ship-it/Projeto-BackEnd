import type { Request, Response } from "express";
import Usuario from "../models/Usuario.js";
import mongoose from "mongoose";
import Animal from "../models/Animal.js";

class UsuarioController{
    static async listarConta (req: Request, res: Response) {
        if (!req.session.userId) {
            return res.status(401).json({ mensagem: "Faça login para acessar sua conta." });
        }
        try {
            const usuario = await Usuario.findById(req.session.userId);
        if (!usuario) {
            return res.status(401).json({ mensagem: "Usuário não encontrado." });
        }
            const animais = await Animal.find({
                _id: { $in: usuario.adocoes.map((adocao) => adocao.animal) }
        }).select("nome especie idade situacao").lean();
            const adocoes = usuario.adocoes.flatMap((adocao) => {
            const animal = animais.find((item) => item._id.toString() === adocao.animal.toString());
        if (!animal) {
            return [];
        }
            return [{
                status: animal.situacao === "Adotado" ? "Adotado" : adocao.status,
                animal: {
                    nome: animal.nome,
                    especie: animal.especie,
                    idade: animal.idade
                }
            }];
        });
        return res.status(200).json({ nome: usuario.nome, adocoes });
        }catch (error) {
            console.error("Erro ao carregar conta:", error);
            return res.status(500).json({ mensagem: "Não foi possível carregar sua conta." });
        }
    }

    static async buscarConta (req: Request, res: Response) {
            const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ mensagem: "ID inválido." });
            }
        try {
            const usuario = await Usuario.findById(id).select("nome email");
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }
            return res.status(200).json(usuario);
        }catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return res.status(500).json({ mensagem: "Erro ao buscar usuário." });
        }
    }
}

export default UsuarioController;