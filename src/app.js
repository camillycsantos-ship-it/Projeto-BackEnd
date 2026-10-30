import express from "express";
import Animal from "./models/Animal.js";

const app = express();
app.use(express.json());

function buscaAnimal(id){
    return Animal.findIndex(Animal => {
        return Animal.id === Number(id);
    })
}

//-----------GET---------//

app.get("/", (req, res) => {
    res.status(200).sendFile('index.html', { root: 'public'});
});

//app.get("/animais", (req, res) => {
//    res.status(200).json(animais);
//});

app.get("/animais", async (req, res) => {
    const animais = await Animal.find();
    res.status(200).json(animais);
});

//app.get("/animais", (req, res) => {
//    res.status(200).sendFile('animais.html', { root: 'public'});
//});

app.get("/contact", (req, res) => {
    res.status(200).sendFile('contact.html', { root: 'public'});
});

//-----------POST---------//

//app.post("/animais", (req, res) => {
//    const { nome, especie, idade, situacao } = req.body;
//
//    const novoAnimal = {
//        id: animais.length + 1,
//        nome,
//        especie,
//        idade,
//        situacao: situacao || "Disponivel"
//    };
//
//    animais.push(novoAnimal);
//    res.status(201).json(novoAnimal);
//});

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

app.put("/animais/:id", (req, res) => {
    const index = buscaAnimal(req.params.id);
    Animal[index].situacao = req.body.situacao;
    res.status(200).json(Animal);
})

export default app;

