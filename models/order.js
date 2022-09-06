import mongoose from "mongoose"
const { Schema, model } = mongoose

const ordenSchema = new Schema({
    email: {type: String, required: true},
    dataTime: {type: String, required: true},
    numberOrder: {type: Number, required: true},
    products: {type: Array, required: true},
    state: {type: String, required: true}
})

export const Order = model("order", ordenSchema)

