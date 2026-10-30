import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    especie: {
        type: String,
        required: true,
        trim: true
    },
    idade: {
        type: Number,
        required: true,
        min: 0
    },
    situacao: {
        type: String,
        default: "Disponivel"
    }
});

const Animal = mongoose.model("Animal", animalSchema);

export default Animal;
