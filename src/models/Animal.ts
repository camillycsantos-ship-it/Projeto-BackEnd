import mongoose, { Schema } from "mongoose";

export interface Animal {

    id: number
    nome: string;
    especie: string;
    idade: number;
    situacao: string;
}

const animalSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
        min: 0
    },

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
