import { RequestHandler } from "express";
import Product from "../models/Product";


export const getProduct : RequestHandler = async (req,res) =>  {
  try {
    const {name} = req.body
    const product = await Product.find();
    if(!name){
      return res.status(200).json(product)
    }
    else{
      const find = product.filter((e)=> e.name.toLowerCase().includes(name.toLowerCase()))
      if(find){
        return res.status(200).json(find)
      }else{
        return res.status(404).send("No se encuentra el producto")
      }
    }
  } catch (error) {
    console.log('Error en Get Products',error)
  }
}