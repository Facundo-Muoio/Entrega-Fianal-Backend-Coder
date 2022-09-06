import { Cart } from "../models/cart.js"

export const daoCart = {}

daoCart.postCart = async (email, dataTime, products, address ) => {
    const newCart = new Cart({
        email,
        dataTime, 
        products, 
        address
    })
    await newCart.save()
}