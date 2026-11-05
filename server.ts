import express from 'express';
import app from './src/app.js';
import mongoose from "mongoose";
import 'dotenv/config';

const port = 8080
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    throw new Error("A variável MONGODB_URI não está configurada.");
}

mongoose.connect(mongoURI)
    .then(() => console.log('Conectado ao MongoDB Atlas!'))
    .catch((error) => console.error('Erro ao conectar:', error));

app.use(express.static('public'));

app.listen(port, () => {
    console.log('Executando o servidor...')
});