import type { Request, Response, NextFunction } from "express";
import Usuario from "../models/Usuario.js";

export async function exigirAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userId) {
        return res.status(401).json({ mensagem: "Faça login para continuar." });
    }

    try {
        const usuario = await Usuario.findById(req.session.userId).select("admin").lean();

        if (!usuario?.admin) {
            return res.status(403).json({ mensagem: "Apenas administradores podem realizar esta ação." });
        }

        return next();
    } catch (error) {
        console.error("Erro ao verificar permissão de administrador:", error);
        return res.status(500).json({ mensagem: "Não foi possível verificar suas permissões." });
    }
}

export async function exigirAdminOuProprio(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userId) {
        return res.status(401).json({ mensagem: "Faça login para continuar." });
    }

    if (String(req.params.id) === req.session.userId) {
        return next();
    }

    return exigirAdmin(req, res, next);
}
