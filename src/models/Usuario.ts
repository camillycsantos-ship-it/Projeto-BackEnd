import mongoose from "mongoose";

const adocaoSchema = new mongoose.Schema({
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
        required: true
    },
    status: {
        type: String,
        enum: ["Em processo", "Adotado"],
        default: "Em processo",
        required: true
    }
}, { _id: false });

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    senha: {
        type: String,
        required: true
    },

    adocoes: {
        type: [adocaoSchema],
        default: []
    }

});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;