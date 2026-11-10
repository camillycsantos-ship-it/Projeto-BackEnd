import app from './src/app.js';
import 'dotenv/config';
import conectaNaDatabase from './src/config/dbConnect.js';

const port = 8080

async function inicializarServidor(){

    try{
        const conexao = await conectaNaDatabase();

    console.log("Conexão com o Banco de Dados realizada com sucesso!");

    conexao.on("error", (erro) => {
    console.error("Erro ao conectar com Banco de Dados: ", erro);
    });

    app.listen(port, () => {
    console.log('Executando o servidor...')
    });
} catch (erro) {
    console.error("Falha ao inicializar o servidor ou Banco de Dados: ", erro);
}
}

inicializarServidor();