import { daoOrder } from "../../DAO/order.js"

export const dtoOrder = {}

dtoOrder.postOrder = async (email, dataTime, products, state) => {
   await daoOrder.postOrder(email, dataTime, products, state)
}