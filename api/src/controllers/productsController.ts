import { RequestHandler, Request } from "express";
import { isValidObjectId } from "mongoose";
import Product from "../models/Product";
import { product } from "./interfaces/interfaces";
import mongoose from 'mongoose'
type ReqQuery = { name ?: string }
type ReqDictionary = {}
type ReqBody = { foo1 ?: string }
type ResBody = { foo3 ?: string }
type SomeHandlerRequest = Request<ReqDictionary, ResBody, ReqBody, ReqQuery>
const ObjectId = mongoose.Types.ObjectId

export const getProduct: RequestHandler = async (req:SomeHandlerRequest,res) =>  {
  try {
    const {name}  = req.query
    
    const product : Array<product> = await Product.aggregate([
      {
        $lookup:
        {
          from: 'categories',
          localField: 'category',
          foreignField: 'name',
          as: 'CategoryProduct'
        }
      },{ $unwind: "$CategoryProduct"}
    ]);
    
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

export const GetProductById : RequestHandler = async (req,res)  =>  {
  try {
    const {id} = req.params
    if(isValidObjectId(id)){
      const product = await Product.aggregate([
        {
          $lookup:
          {
            from: 'categories',
            localField: 'category',
            foreignField: 'name',
            as: 'CategoryProduct'
          }
        },{ $unwind: "$CategoryProduct"}
        ,{$match: {_id: new ObjectId(id)}} 
      ]);
      if(product){
        return res.status(200).json(product)
      }else{
        return res.status(404).send('No se encuentra el producto con ese id')
      }
    }else{
      return res.status(404).send('Id no es valido')
    }
    
  } catch (error) {
    console.log('Error en GET PRODUCT BY ID',error)
  }
}

export const postProduct : RequestHandler = async (req,res) => {
  try {
    const {name,precio_compra,precio_venta,description,img,stock} = req.body
    if(!name || !precio_compra || !precio_venta || !stock){
      return res.status(404).send('Faltan datos requeridos') 
    }else{
      const find = await Product.findOne({name: name})
      if(find){
        return res.status(404).send("Ya existe un producto con ese nombre")
      }else{
        const product = new Product(req.body)
        product.precio_D = precio_venta*1.1
        product.precio_C = precio_venta*1.17
        console.log(product)
        await product.save()
        return res.status(200).json(product)
      }
    }
  } catch (error) {
    console.log('Error en POST PRODUCT',error)
  }
  
}
export const deleteProduct : RequestHandler = async (req,res) =>  {
  try {
    const {id} = req.params
    if(isValidObjectId(id)){
      const find = await Product.findByIdAndDelete(id)
      if(find){
        return res.status(200).json("Producto eliminado con exito")
      }else{
        return res.status(404).send("No exite el producto")
      }
    }else{
      return res.status(404).send("Id no valido")
    }
  } catch (error) {
    console.log('Error en BORRAR PRODUCTO',error)
  }
}

export const updateProduct :RequestHandler = async (req,res) => {
  try {
    const {id} = req.params
    
    if(isValidObjectId(id)){
      const find = await Product.findByIdAndUpdate(id,req.body)
      if(find){
        return res.status(200).json(find)
      }else{
        return res.status(404).send("No exite el producto")
      }
    }else{
      return res.status(404).send("Id no valido")
    }
  } catch (error) {
    console.log('Error en ACTUALIZAR PRODUCTO',error)
  }
}