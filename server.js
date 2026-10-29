import express from 'express';

const port = 8080

app.use(express.static('public'));

app.listen(port, () => {
    console.log('Executando o servidor...')
});