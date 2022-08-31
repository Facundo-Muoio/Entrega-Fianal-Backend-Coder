import { Producto } from "../models/products.js";
export const daoProducts = {};

daoProducts.getProducts = async () => await Producto.find({});

daoProducts.getProduct = async (id) => await Producto.findById(id);

daoProducts.updateProduct = async (id, cantidad) =>{
 let product = await daoProducts.getProduct(id)
 let newStock = product.stock - cantidad
 await Producto.findByIdAndUpdate({ _id : id }, { stock: newStock }) 
  console.log("producto actualizado")
}

