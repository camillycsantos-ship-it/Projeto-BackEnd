import express from 'express';
import app from './src/app.js';

const port = 8080

app.use(express.static('public'));

app.listen(port, () => {
    console.log('Executando o servidor...')
});