import { Order } from "../models/order.js"

export const daoOrder = {}

daoOrder.postOrder = async (email, dataTime, products, state) => {
    const orders = await Order.find({})
    let numberOrder
    orders ? numberOrder = orders.length + 1 : numberOrder = 1
    const newOrder = new Order({
        email, 
        dataTime, 
        numberOrder,
        products,
        state: "generada"
    })
    await newOrder.save()
}

