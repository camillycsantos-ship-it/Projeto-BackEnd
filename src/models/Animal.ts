import mongoose, { Schema, Document } from "mongoose";

export interface Animal extends Document {

    nome: string;
    especie: string;
    idade: number;
    situacao: string;

}

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
    },

    cover: {type: String, default: "https://placehold.co/300x450?text=No+Cover"},

});

const Animal = mongoose.model("Animal", animalSchema);

export default Animal;
