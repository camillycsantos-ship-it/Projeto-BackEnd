import { Router } from "express";
import AnimalController from "../controllers/animalControler.js";

const router = Router();

router.get("/api/animais", AnimalController.buscaPorFiltro);
router.get("/api/animais/filtro", AnimalController.buscaPorFiltro);
router.get("/api/animais/:id", AnimalController.buscarPorId);
router.post("/animais", AnimalController.cadastrar);
router.put("/api/animais/:id", AnimalController.atualizar);
router.patch("/api/animais/:id", AnimalController.atualizarParcialmente);
router.delete("/api/animais/:id", AnimalController.deletar);

export default router;
