import { Router } from "express";
import UsuarioController from "../controllers/usuarioControler.js";

const router = Router();

router.get("/api/minha-conta", UsuarioController.listarConta);
router.get("/api/usuarios/:id", UsuarioController.buscarConta);