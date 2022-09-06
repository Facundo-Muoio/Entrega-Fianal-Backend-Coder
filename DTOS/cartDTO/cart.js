import { daoCart } from "../../DAO/cart.js"

export const dtoCart = {}

dtoCart.postCart = async (email, dataTime, products, address) => {
    await daoCart.postCart(email, dataTime, products, address)
}