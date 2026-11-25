import { Router } from "express";
import AbrigoController from "../controllers/abrigoControler.js";
import { exigirAdmin } from "../middlewares/exigirAdmin.js";
import { validarDados } from "../middlewares/dataValidator.js";
import { criarAbrigoValidator, atualizarAbrigoValidator } from "../validators/abrigoValidator.js";

const router = Router();

router.get("/api/abrigos", AbrigoController.listar);
router.post("/api/abrigos", exigirAdmin, validarDados(criarAbrigoValidator), AbrigoController.cadastrar);
router.put("/api/abrigos/:id", exigirAdmin, validarDados(atualizarAbrigoValidator), AbrigoController.atualizar);
router.patch("/api/abrigos/:id", exigirAdmin, validarDados(atualizarAbrigoValidator), AbrigoController.atualizarParcialmente);
router.delete("/api/abrigos/:id", exigirAdmin, AbrigoController.deletar);

export default router;