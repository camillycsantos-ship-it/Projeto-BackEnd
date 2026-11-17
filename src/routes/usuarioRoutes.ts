import { Router } from "express";
import UsuarioController from "../controllers/usuarioControler.js";

const router = Router();

router.get("/api/sessao", UsuarioController.sessao);
router.get("/api/minha-conta", UsuarioController.listarConta);
router.get("/api/usuarios/:id", UsuarioController.buscarConta);
router.post("/cadastro", UsuarioController.cadastro);
router.post("/login", UsuarioController.login);
router.post("/logout", UsuarioController.logout);
router.post("/api/adocoes", UsuarioController.adocaoUsuario);
router.put("/api/minha-conta", UsuarioController.atualizarPerfil);
router.patch("/api/usuarios/:id/email", UsuarioController.atualizarEmail);
router.delete("/minha-conta/:id", UsuarioController.deletarUsuario);

export default router;