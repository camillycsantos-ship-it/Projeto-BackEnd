import { Router } from "express";
import AnimalController from "../controllers/animalControler.js";
import { validarDados } from "../middlewares/dataValidator.js";
import { exigirAdmin } from "../middlewares/exigirAdmin.js";
import { criarAnimalValidator, atualizarAnimalValidator } from "../validators/animalValidator.js";

const router = Router();

router.get("/api/animais", AnimalController.buscaPorFiltro);
router.get("/api/animais/busca", AnimalController.buscaPorFiltro);
router.get("/api/animais/:id", AnimalController.buscarPorId);

router.post("/animais", validarDados(criarAnimalValidator), AnimalController.cadastrar);
router.put("/api/animais/:id", exigirAdmin, validarDados(atualizarAnimalValidator), AnimalController.atualizar);
router.patch("/api/animais/:id", exigirAdmin, validarDados(atualizarAnimalValidator), AnimalController.atualizarParcialmente);

router.delete("/api/animais/:id", exigirAdmin, AnimalController.deletar);

export default router;
