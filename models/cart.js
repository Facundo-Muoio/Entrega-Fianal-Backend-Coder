import mongoose from "mongoose"
const { Schema, model } = mongoose

const cartSchema = new Schema({
    email: {type: String, required: true},
    dataTime: {type: String, required: true},
    products: {type: Array, required: true},
    address: {type:  Map, required: true},
})

export const Cart = model("cart", cartSchema)

