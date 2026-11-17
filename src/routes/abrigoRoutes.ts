import { Router } from "express";
import AbrigoController from "../controllers/abrigoControler.js";

const router = Router();

router.get("/api/abrigos", AbrigoController.listar);
router.post("/abrigos", AbrigoController.cadastrar);
router.put("/api/abrigos/:id", AbrigoController.atualizar);
router.patch("/api/abrigos", AbrigoController.atualizarParcialmente);
router.delete("/abrigos/:id", AbrigoController.deletar);

export default router;