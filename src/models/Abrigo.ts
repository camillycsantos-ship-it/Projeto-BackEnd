import mongoose from "mongoose";

const abrigoSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true,
        trim: true
    },

    endereco: {
        rua: { type: String, required: true, trim: true },
        bairro: { type: String, required: true, trim: true },
        numero: { type: Number, required: true },
        complemento: { type: String, trim: true }
},

    avaliacao: {
        type: Number,
        required: true,
        min: 0
    }

});

const Abrigo = mongoose.model("Abrigo", abrigoSchema);

export default Abrigo;