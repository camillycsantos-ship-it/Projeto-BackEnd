import express from 'express';

const app = express();
const port = 8080

app.get('/',(req, res) => {
    res.type('html').send('<h1>HOMEPAGE</h1>');
});

app.get('/sobre',(req, res) => {
    res.type('html').send('<h1>QUEM SOMOS</h1>');
});

app.post('/animais',(req, res) => {
    res.type('html').send('<h1>ANIMAIS DISPONIVEIS</h1>');
});

app.listen(port, () => {
    console.log('Executando o servidor...')
})