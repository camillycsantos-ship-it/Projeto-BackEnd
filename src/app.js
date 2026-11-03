import express from "express";
import Animal from "./models/Animal.js";
import Usuario from "./models/Usuario.js";
import Abrigo from "./models/Abrigo.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).sendFile('index.html', { root: 'public'});
});

app.get("/conta", (req, res) => {
    res.status(200).sendFile('conta.html', { root: 'public'});
});

app.get("/login", (req, res) => {
    res.status(200).sendFile('login.html', { root: 'public'});
});

app.get("/abrigos", (req, res) => {
    res.status(200).sendFile('abrigos.html', { root: 'public'});
});

app.get("/animais", async (req, res) => {
    const animais = await Animal.find();
    res.status(200).json(animais);
});

app.get("/contact", (req, res) => {
    res.status(200).sendFile('contact.html', { root: 'public'});
});

app.post("/animais", async (req, res) => {
    const { nome, especie, idade, situacao } = req.body;

    try {
        const novoAnimal = await Animal.create({
            nome,
            especie,
            idade,
            situacao: situacao || "Disponivel"
        });

        res.status(201).json(novoAnimal);
    } catch (error) {
        console.error("Erro ao salvar animal:", error);
        res.status(500).json({ erro: "Não foi possível salvar o animal." });
    }
});

app.post("/abrigos", async (req, res) => {
    const { abrigoID, nome , endereco, avaliacao } = req.body;

    try {
        const novoAbrigo = await Abrigo.create({
            abrigoID,
            nome,
            endereco: {
                rua: req.body.endereco.rua,
                bairro: req.body.endereco.bairro,
                numero: req.body.endereco.numero,
                complemento: req.body.endereco.complemento
            },
            avaliacao
        });

        res.status(201).json(novoAbrigo);
    } catch (error) {
        console.error("Erro ao salvar abrigo: ", error);
        res.status(500).json({ erro: "Não foi possível salvar o abrigo." });
    }
});

app.put("/animais/:id", async (req, res) => {
    try {
        const animalAtualizado = await Animal.findByIdAndUpdate(
            req.params.id,
            { situacao: req.body.situacao },
            { new: true }
        );

        if (!animalAtualizado) {
            return res.status(404).json({ erro: "Animal não encontrado." });
        }

        res.status(200).json(animalAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar animal:", error);
        res.status(500).json({ erro: "Não foi possível atualizar o animal." });
    }
});

export default app;

