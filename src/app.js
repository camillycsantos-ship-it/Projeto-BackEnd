import express from "express";

const app = express();
app.use(express.json());

const animais = [
    {
        id: 1,
        nome: "Rex",
        especie: "Cachorro",
        idade: 5,
        situacao: "Disponivel"
    },

    {
        id: 2,
        nome: "Luna",
        especie: "Gato",
        idade: 3,
        situacao: "Disponivel"
    }
]

//-----------GET---------//

app.get("/", (req, res) => {
    res.status(200).sendFile('index.html', { root: 'public'});
});

app.get("/animais", (req, res) => {
    res.status(200).json(animais);
});

app.get("/contact", (req, res) => {
    res.status(200).sendFile('contact.html', { root: 'public'});
});

//-----------POST---------//

app.post("/animais", (req, res) => {
    const { nome, especie, idade, situacao } = req.body;

    const novoAnimal = {
        id: animais.length + 1,
        nome,
        especie,
        idade,
        situacao: situacao || "Disponivel"
    };

    animais.push(novoAnimal);
    res.status(201).json(novoAnimal);
});

app.put("/animais/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = animais.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Animal não encontrado!" });
    }

    const { nome, especie, idade, situacao } = req.body;

    animais[index] = {
        id,
        nome,
        especie,
        idade,
        situacao
    };

    res.status(200).json(animais[index]);
});

//-----------PATCH---------//

app.patch("/animais/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const animal = animais.find(a => a.id === id);

    if (!animal) {
        return res.status(404).json({ mensagem: "Animal não encontrado!" });
    }

    const { nome, especie, idade, situacao } = req.body;

    if (nome !== undefined) animal.nome = nome;
    if (especie !== undefined) animal.especie = especie;
    if (idade !== undefined) animal.idade = idade;
    if (situacao !== undefined) animal.situacao = situacao;

    res.status(200).json(animal);
});

//-----------DELETE---------//

app.delete("/animais/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = animais.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Animal não encontrado!" });
    }

    animais.splice(index, 1);

    res.status(200).json({ mensagem: "Animal removido com sucesso!" });
});

export default app;

