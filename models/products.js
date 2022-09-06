import { mongoose } from "mongoose"
const { Schema, model } = mongoose

const productosSchema = new Schema({
    nombre: {type: String, required: true},
    autor: {type: String, required: true},
    genero: {type: String, required: true},
    precio: {type: String, required: true},
    imagen: {type: String, required: true},
    stock: {type: Number, required: true},
    biografia: {type: String, required: true},
    sinopsis: {type: String, required: true},
})

export const Producto = model("product", productosSchema)

