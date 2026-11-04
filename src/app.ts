import express from "express";
import type {Request, Response } from "express";
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

app.get("/cadastro", (req, res) => {
    res.status(200).sendFile('cadastro.html', { root: 'public'});
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

app.post("/cadastro", async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const usuario = await Usuario.create({
            nome,
            email,
            senha
        });

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario
        });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return res.status(400).json({
            mensagem: "Não foi possível cadastrar o usuário."
        });
    }
});

app.post("/login", async (req: Request, res: Response) => {
    const { email, senha } = req.body;

try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    if (usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        usuario
    });
} catch (error) {
    return res.status(500).json({
        mensagem: "Erro ao fazer login."
    });
}
});

app.put("/animais/:id", async (req: Request, res: Response) => {
    try {
        const animalAtualizado = await Animal.findByIdAndUpdate(
            req.params.id,
            { situacao: req.body.situacao },
            { new: true }
        );

        if (!animalAtualizado) {
            return res.status(404).json({ erro: "Animal não encontrado." });
        }

        return res.status(200).json(animalAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar animal:", error);
        return res.status(500).json({ erro: "Não foi possível atualizar o animal." });
    }
});

//app.delete("/animais/:id", (req: Request, res: Response) => {
//    const index = buscaAnimal(req.params.id);
//
//    if(index === -1){
//        res.status(404).json({mensagem:"Animal não encontrado"})
//        return;
//    }
//
//    animais.splice(index,1);
//    res.status(200).json({mensagem:"Animal deletado com sucesso!"});
//});

export default app;