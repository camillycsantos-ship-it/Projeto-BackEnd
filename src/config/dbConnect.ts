import mongoose from "mongoose";

async function conectaNaDatabase(): Promise<typeof mongoose.connection> {

    const dbURI = process.env.MONGODB_URL;

    if(!dbURI){
        throw new Error(
            "Variável não encontrada no arquivo .env",
        );
    }

    await mongoose.connect(dbURI)

    return mongoose.connection;
};

export default conectaNaDatabase;

