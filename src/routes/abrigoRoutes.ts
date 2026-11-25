import { Router } from "express";
import AbrigoController from "../controllers/abrigoControler.js";
import { exigirAdmin } from "../middlewares/exigirAdmin.js";

const router = Router();

router.get("/api/abrigos", AbrigoController.listar);
router.post("/abrigos", AbrigoController.cadastrar);
router.put("/api/abrigos/:id", AbrigoController.atualizar);
router.patch("/api/abrigos/:id", exigirAdmin, AbrigoController.atualizarParcialmente);
router.delete("/abrigos/:id", exigirAdmin, AbrigoController.deletar);

export default router;