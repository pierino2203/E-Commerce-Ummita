import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import Proveedor from "../models/Proveedor";


export const getProveedores : RequestHandler = async (req,res) =>  {
  try {
    const proveedor = await Proveedor.find()
    return res.status(200).json(proveedor)  
  } catch (error) {
    console.log('Error en GET PROVEEDORES',error)
  }
}
export const addProveedores : RequestHandler = async(req,res) =>  {
  try {
    const {name} = req.body
    const find = await Proveedor.findOne({name:name})
    if(find){
      return res.status(404).send("El proveedor ya existe")
    }else{
      const proveedor = new Proveedor({
        name:name
      })
      await proveedor.save()
      return res.status(200).json(proveedor)
    }
  } catch (error) {
    console.log('Error en agregar PROVEEDOR',error)
  }
}

export const deleteProveedor : RequestHandler = async (req,res) =>  {
  try {
    const {id} = req.params
    if(isValidObjectId(id)){
      const find = await Proveedor.findByIdAndDelete(id)
      if(find){
        return res.status(200).json(find)
      }else{
        return res.status(404).send("No se encontro un porveedor")
      }
    }else{
      return res.status(404).send("Id de proveedor invalido")
    }
  } catch (error) {
    console.log("Error en borrar PROVEEDOR",error)
  }
}