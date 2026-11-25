import { Router } from "express";
import UsuarioController from "../controllers/usuarioControler.js";
import { exigirAdminOuProprio } from "../middlewares/exigirAdmin.js";

const router = Router();

router.get("/api/sessao", UsuarioController.sessao);
router.get("/api/minha-conta", UsuarioController.listarConta);
router.get("/api/usuarios/:id", UsuarioController.buscarConta);
router.post("/api/cadastro", UsuarioController.cadastro);
router.post("/api/login", UsuarioController.login);
router.post("/api/logout", UsuarioController.logout);
router.post("/api/adocoes", UsuarioController.adocaoUsuario);
router.put("/api/minha-conta", UsuarioController.atualizarPerfil);
router.patch("/api/usuarios/:id/email", exigirAdminOuProprio, UsuarioController.atualizarEmail);
router.delete("/api/minha-conta/:id", exigirAdminOuProprio, UsuarioController.deletarUsuario);

export default router;