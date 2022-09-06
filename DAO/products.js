import { Producto } from "../models/products.js";
export const daoProducts = {};

daoProducts.getProducts = async () => await Producto.find({});

daoProducts.getProduct = async (id) => await Producto.findById(id);

daoProducts.getProductByName = async (name) => await Producto.findOne({name})

daoProducts.updateProduct = async (nombre, cantidad) =>{
 let product = await daoProducts.getProductByName({nombre})
 let newStock = product.stock - cantidad
 await Producto.findOneAndUpdate({ nombre : nombre }, { stock: newStock }) 
}

