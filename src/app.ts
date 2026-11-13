import mongoose from "mongoose";
import express, { response } from "express";
import session from "express-session";
import type {Request, Response } from "express";
import Animal from  "./models/Animal.js";
import type { Animal as AnimalDocument } from "./models/Animal.js";
import Usuario from "./models/Usuario.js";
import Abrigo from "./models/Abrigo.js";

declare module "express-session" {
    interface SessionData {
        userId?: string;
    }
}


const app = express();

app.use(express.static("public"));
app.use(express.json());
app.set("json spaces", 2);
app.use(session({
    secret: process.env.SESSION_SECRET || "dev-session-secret-change-before-deploy",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.get("/conta", (req: Request, res: Response) => {
    res.status(200).sendFile('conta.html', { root: 'public'});
});

app.get("/minha-conta", (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }

    return res.sendFile("minha-conta.html", { root: "public" });
});

app.get("/cadastro", (req: Request, res: Response) => {
    res.status(200).sendFile('cadastro.html', { root: 'public'});
});

app.get("/login", (req: Request, res: Response) => {
    res.status(200).sendFile('login.html', { root: 'public'});
});

app.get("/abrigos", (req: Request, res: Response) => {
    res.status(200).sendFile('abrigos.html', { root: 'public'});
});

app.get("/contact", (req, res) => {
    res.status(200).sendFile('contact.html', { root: 'public'});
});

app.get("/api/abrigos", async (req: Request, res: Response) => {
    try {
        const abrigos = await Abrigo.find().sort({ nome: 1 });
        return res.status(200).json(abrigos);
    } catch (error) {
        console.error("Erro ao buscar abrigos:", error);
        return res.status(500).json({ mensagem: "Não foi possível carregar os abrigos." });
    }
});

app.get("/animais", (req: Request, res: Response) => {
    return res.sendFile("animais.html", { root: "public" });
});

app.get("/api/animais", async (req: Request, res: Response) => {
        try{
        const animais = await Animal.find();
        res.status(200).json(animais);
        }catch(error){
            res.status(500).json({ mensagem: "Erro ao buscar animal."});
        }
});

app.post("/animais", async (req: Request, res: Response) => {
    
    try{

        const { nome, especie, idade, situacao } = req.body;

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

app.post("/abrigos", async (req: Request, res: Response) => {
    try {

        const {nome , endereco, avaliacao } = req.body;

        const novoAbrigo = await Abrigo.create({
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

app.post("/cadastro", async (req: Request, res: Response) => {

    try {

        const { nome, email, senha } = req.body;
        
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

try {

    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    if (usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    req.session.userId = usuario._id.toString();

    return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        usuario: {
            nome: usuario.nome,
            email: usuario.email
        }
    });
} catch (error) {
    return res.status(500).json({
        mensagem: "Erro ao fazer login."
    });
}
});

app.post("/logout", (req: Request, res: Response) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({ mensagem: "Não foi possível sair da conta." });
        }

        res.clearCookie("connect.sid");
        return res.status(200).json({ mensagem: "Sessão encerrada." });
    });
});


app.get("/api/minha-conta", async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).json({ mensagem: "Faça login para acessar sua conta." });
    }

    try {
        const usuario = await Usuario.findById(req.session.userId);

        if (!usuario) {
            return res.status(401).json({ mensagem: "Usuário não encontrado." });
        }

        const animais = await Animal.find({
            _id: { $in: usuario.adocoes.map((adocao) => adocao.animal) }
        }).select("nome especie idade situacao").lean();

        const adocoes = usuario.adocoes.flatMap((adocao) => {
            const animal = animais.find((item) => item._id.toString() === adocao.animal.toString());

            if (!animal) {
                return [];
            }

            return [{
                status: animal.situacao === "Adotado" ? "Adotado" : adocao.status,
                animal: {
                    nome: animal.nome,
                    especie: animal.especie,
                    idade: animal.idade
                }
            }];
        });

        return res.status(200).json({ nome: usuario.nome, adocoes });
    } catch (error) {
        console.error("Erro ao carregar conta:", error);
        return res.status(500).json({ mensagem: "Não foi possível carregar sua conta." });
    }
});

app.get("/api/usuarios/:id", async (req: Request<{id: string}>, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ mensagem: "ID inválido." });
    }

    try {
        const usuario = await Usuario.findById(id).select("nome email");

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return res.status(500).json({ mensagem: "Erro ao buscar usuário." });
    }
});

app.post("/api/adocoes", async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).json({ mensagem: "Faça login para demonstrar interesse." });
    }

    const { animalId } = req.body;

    if (typeof animalId !== "string" || !mongoose.Types.ObjectId.isValid(animalId)) {
        return res.status(400).json({ mensagem: "Animal informado é inválido." });
    }

    try {
        const usuario = await Usuario.findById(req.session.userId);

        if (!usuario) {
            return res.status(401).json({ mensagem: "Usuário não encontrado." });
        }

        if (usuario.adocoes.some((adocao) => adocao.animal.toString() === animalId)) {
            return res.status(409).json({ mensagem: "Você já demonstrou interesse neste animal." });
        }

        const animal = await Animal.findOneAndUpdate(
            { _id: animalId, situacao: "Disponivel" },
            { situacao: "Em processo" },
            { new: true }
        );

        if (!animal) {
            return res.status(409).json({ mensagem: "Este animal não está mais disponível." });
        }

        usuario.adocoes.push({ animal: animal._id, status: "Em processo" });
        await usuario.save();

        return res.status(201).json({ mensagem: "Interesse registrado. A adoção está em processo." });
    } catch (error) {
        console.error("Erro ao registrar adoção:", error);
        return res.status(500).json({ mensagem: "Não foi possível registrar seu interesse." });
    }
});

app.put("/api/animais/:id", async (req: Request, res: Response) => {
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

app.put("/api/abrigos/:id", async (req: Request, res: Response) => {
    try {
        const abrigoAtualizado = await Abrigo.findByIdAndUpdate(
            req.params.id,
            { avaliacao: req.body.avaliacao },
            { new: true }
        );

        if (!abrigoAtualizado) {
            return res.status(404).json({ erro: "Abrigo não encontrado." });
        }

        return res.status(200).json(abrigoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar abrigo:", error);
        return res.status(500).json({ erro: "Não foi possível atualizar o abrigo." });
    }
});

app.delete("/api/animais/:id", async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ erro: "ID informado possui formato inválido." });
    }

    try {
        const animalRemovido = await Animal.findByIdAndDelete(id);

        if (!animalRemovido) {
            return res.status(404).json({ erro: "Animal não encontrado." });
        }

        return res.status(200).json({
            mensagem: "Animal deletado com sucesso.",
            animal: animalRemovido
        });
    } catch (error) {
        console.error("Erro ao deletar animal:", error);
        return res.status(500).json({ erro: "Não foi possível deletar o animal." });
    }
});

app.delete("/abrigos/:id", async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ erro: "ID informado possui formato inválido." });
    }

    try {
        const abrigoRemovido = await Abrigo.findByIdAndDelete(id);

        if (!abrigoRemovido) {
            return res.status(404).json({ erro: "Abrigo não encontrado." });
        }

        return res.status(200).json({
            mensagem: "Abrigo deletado com sucesso.",
            abrigo: abrigoRemovido
        });
    } catch (error) {
        console.error("Erro ao deletar abrigo:", error);
        return res.status(500).json({ erro: "Não foi possível deletar o abrigo." });
    }
});

app.delete("/minha-conta/:id", async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ erro: "ID informado possui formato inválido." });
    }

    try {
        const usuarioRemovido = await Usuario.findByIdAndDelete(id);

        if (!usuarioRemovido) {
            return res.status(404).json({ erro: "Usuario não encontrado." });
        }

        return res.status(200).json({
            mensagem: "Usuario deletado com sucesso.",
            usuario: usuarioRemovido
        });
    } catch (error) {
        console.error("Erro ao deletar usuario:", error);
        return res.status(500).json({ erro: "Não foi possível deletar o usuario." });
    }
});

app.patch("/api/animais/:id", async (req: Request<{ id: string }>, res: Response) => {
    try{
        const { id } = req.params;

        const animalAtualizado = await Animal.findByIdAndUpdate(
            id,
            {$set: req.body},
            { new: true}
);

    if(!animalAtualizado){
        res.status(404).json({mensagem: "Animal não encontrado!"});
        return;
    }

    res.status(200).json({
        mensagem: "Animal atualizado parcialmente com sucesso!",
        animal: animalAtualizado,
    });
    }catch(error){
    res.status(500).json({mensagem: "Erro ao atualizar parcialmente o livro."})
}
});

export default app;