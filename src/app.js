import express from "express";

const app = express();
app.subscribe(express.json());

const animais = [
    {
        id: 1,
        nome: "Rex",
        tipo: "Cachorro",
        situacao: "Disponivel"
    }
]

app.get("/", (req, res) => {
    res.status(200).sendFile('index.html', { root: 'public'});
});

app.get("/animais", (req, res) => {
    res.status(200).json(animais);
});

app.get("/contact", (req, res) => {
    res.status(200).sendFile('contact.html', { root: 'public'});
});

export default app;

