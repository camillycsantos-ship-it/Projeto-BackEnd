import { Router } from "express";
import type { Request } from "express";
import AnimalController from "../controllers/animalControler.js";
import { validarDados } from "../middlewares/dataValidator.js";
import { exigirAdmin } from "../middlewares/exigirAdmin.js";
import { criarAnimalValidator, atualizarAnimalValidator } from "../validators/animalValidator.js";
import { PostgresAnimalRepository } from "../repositories/PostgresAnimalRepository.js";

const router = Router();
const animalController = new AnimalController(new PostgresAnimalRepository());

router.get("/api/animais", (req, res) => animalController.buscaPorFiltro(req, res));
router.get("/api/animais/busca", (req, res) => animalController.buscaPorFiltro(req, res));
router.get("/api/animais/:id", (req: Request<{ id: string }>, res) => animalController.buscarPorId(req, res));

router.post("/api/animais", exigirAdmin, validarDados(criarAnimalValidator), (req, res) => animalController.cadastrar(req, res));
router.put("/api/animais/:id", exigirAdmin, validarDados(atualizarAnimalValidator), (req: Request<{ id: string }>, res) => animalController.atualizar(req, res));
router.patch("/api/animais/:id", exigirAdmin, validarDados(atualizarAnimalValidator), (req: Request<{ id: string }>, res) => animalController.atualizarParcialmente(req, res));

router.delete("/api/animais/:id", exigirAdmin, (req: Request<{ id: string }>, res) => animalController.deletar(req, res));

export default router;
