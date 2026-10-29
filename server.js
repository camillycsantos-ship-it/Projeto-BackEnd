import express from 'express';

const app = express();
const port = 8080

app.use(express.static('public'));

app.get('/contact', (req, res) => {
    res.sendFile('contact.html', { root: 'public' });
});

app.get('/animais', (req, res) => {
    res.sendFile('animais.html', { root: 'public' });
});
app.listen(port, () => {
    console.log('Executando o servidor...')
})