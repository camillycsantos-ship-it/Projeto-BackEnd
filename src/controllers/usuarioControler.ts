import type { Request, Response } from "express";
import Usuario from "../models/Usuario.js";
import mongoose from "mongoose";
import Animal from "../models/Animal.js";

class UsuarioController{
    static async listarConta (req: Request, res: Response) {
        if (!req.session.userId) {
            return res.status(404).json({ mensagem: "Faça login para acessar sua conta." });
        }
        try {
            const usuario = await Usuario.findById(req.session.userId);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
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
        return res.status(200).json({ nome: usuario.nome, email: usuario.email, adocoes });
        }catch (error) {
            console.error("Erro ao carregar conta:", error);
            return res.status(404).json({ mensagem: "Não foi possível carregar sua conta." });
        }
    }

    static async sessao (req: Request, res: Response) {
        if (!req.session.userId) {
            return res.status(404).json({ mensagem: "Nenhum usuário autenticado." });
        }

        try {
            const usuario = await Usuario.findById(req.session.userId).select("nome");
            if (!usuario) {
                return res.status(404).json({ mensagem: "Usuário não encontrado." });
            }

            return res.status(200).json({ nome: usuario.nome });
        } catch (error) {
            console.error("Erro ao verificar sessão:", error);
            return res.status(404).json({ mensagem: "Não foi possível verificar a sessão." });
        }
    }

    static async buscarConta (req: Request<{id: string}>, res: Response) {
            const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
                return res.status(404).json({ mensagem: "ID inválido." });
            }
        try {
            const usuario = await Usuario.findById(id).select("nome email");
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }
            return res.status(200).json(usuario);
        }catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return res.status(404).json({ mensagem: "Erro ao buscar usuário." });
        }
    }

    static async cadastro (req: Request, res: Response) {
        try {
            const { nome, email, senha } = req.body;
            const usuario = await Usuario.create({
                nome,
                email,
                senha
            });
        return res.status(200).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario
        });
        }catch(error){
            console.error("Erro ao cadastrar usuário:", error);
            return res.status(404).json({
                mensagem: "Não foi possível cadastrar o usuário."
            });
        }
    }

    static async login (req: Request, res: Response) {
        try {
            const { email, senha } = req.body;
            const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }
        if (usuario.senha !== senha) {
            return res.status(404).json({ mensagem: "Senha incorreta." });
        }
            req.session.userId = usuario._id.toString();
            return res.status(200).json({
                mensagem: "Login realizado com sucesso!",
                usuario: {
                    nome: usuario.nome,
                    email: usuario.email
                }
            });
        }catch (error) {
            return res.status(404).json({
                mensagem: "Erro ao fazer login."
            });
        }
    }

    static async logout (req: Request, res: Response) {
        req.session.destroy((error) => {
        if (error) {
            return res.status(404).json({ mensagem: "Não foi possível sair da conta." });
        }
            res.clearCookie("connect.sid");
            return res.status(200).json({ mensagem: "Sessão encerrada." });
        });
    }

    static async adocaoUsuario (req: Request, res: Response) {
        if (!req.session.userId) {
                return res.status(404).json({ mensagem: "Faça login para demonstrar interesse." });
            }
            const { animalId } = req.body;
        if (typeof animalId !== "string" || !mongoose.isValidObjectId(animalId)) {
            return res.status(404).json({ mensagem: "Animal informado é inválido." });
        }
        try {
            const usuario = await Usuario.findById(req.session.userId);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }
        if (usuario.adocoes.some((adocao) => adocao.animal.toString() === animalId)) {
            return res.status(404).json({ mensagem: "Você já demonstrou interesse neste animal." });
        }
        const animal = await Animal.findOneAndUpdate(
            { _id: animalId, situacao: "Disponivel" },
            { situacao: "Em processo" },
            { new: true }
        );
        
        if (!animal) {
            return res.status(404).json({ mensagem: "Este animal não está mais disponível." });
        }
            usuario.adocoes.push({ animal: animal._id, status: "Em processo" });
                await usuario.save();
                return res.status(200).json({ mensagem: "Interesse registrado. A adoção está em processo." });
        }catch (error) {
                console.error("Erro ao registrar adoção:", error);
                return res.status(404).json({ mensagem: "Não foi possível registrar seu interesse." });
        }
    }

    static async atualizarPerfil (req: Request, res: Response) {
        if (!req.session.userId) {
            return res.status(404).json({ mensagem: "Faça login para atualizar sua conta." });
        }

        const { nome, email } = req.body;
        if (
            typeof nome !== "string" || !nome.trim() ||
            typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            return res.status(404).json({ mensagem: "Informe um nome e um e-mail válidos." });
        }

        try {
            const usuario = await Usuario.findByIdAndUpdate(
                req.session.userId,
                { $set: { nome: nome.trim(), email: email.trim().toLowerCase() } },
                { new: true, runValidators: true }
            ).select("nome email");

            if (!usuario) {
                return res.status(404).json({ mensagem: "Usuário não encontrado." });
            }

            return res.status(200).json({
                mensagem: "Perfil atualizado com sucesso.",
                usuario
            });
        } catch (error) {
            if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
                return res.status(404).json({ mensagem: "Este e-mail já está cadastrado." });
            }

            console.error("Erro ao atualizar perfil:", error);
            return res.status(404).json({ mensagem: "Não foi possível atualizar o perfil." });
        }
    }

    static async atualizarEmail (req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;
        const email = req.body.email;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ mensagem: "ID inválido." });
    }

        if (typeof email !== "string" || !email.trim()) {
            return res.status(404).json({ mensagem: "Informe um e-mail válido." });
    }

        try {
            const usuario = await Usuario.findByIdAndUpdate(
                id,
                { $set: { email: email.trim() } },
                { new: true, runValidators: true }
        ).select("nome email");

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        return res.status(200).json({
            mensagem: "E-mail atualizado com sucesso.",
            usuario
        });
        }catch (error) {
            return res.status(404).json({ mensagem: "Não foi possível atualizar o e-mail." });
    }
}

    static async deletarUsuario (req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ erro: "ID informado possui formato inválido." });
    }
        try {
            const usuarioRemovido = await Usuario.findByIdAndDelete(id);
            if (!usuarioRemovido) {
            return res.status(404).json({ erro: "Usuario não encontrado." });
        }
        return res.status(200).json({
            mensagem: "Usuario deletado com sucesso.",
            usuario: usuarioRemovido
        });
        }catch(error){
            console.error("Erro ao deletar usuario:", error);
            return res.status(404).json({ erro: "Não foi possível deletar o usuario." });
        }
    }
}

export default UsuarioController;