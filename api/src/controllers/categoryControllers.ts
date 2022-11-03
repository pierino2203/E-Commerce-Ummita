import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import Category from '../models/Category'



export const getCategory : RequestHandler= async (req,res) =>  {
  try {
    const category= await Category.find();
    return res.status(200).json(category)
  } catch (error) {
    console.log('Error en GET CATEGORY',error)
  }
  
}

export const addCategory : RequestHandler = async (req,res) => {
  try {
    const {name} =req.body
    const find = await Category.findOne({name: name})
    if(find){
      return res.status(404).send('Una categoria con ese nombre ya existe')
    }else{
      const category = new Category({name: name})
      await category.save()
      return res.status(200).json(category)
    }
    
     
  } catch (error) {
    console.log('Error en AGREGAR CATEGORIA', error)
  }
}

export const deleteCategory : RequestHandler = async (req,res)  =>  {
  try {
    const {id} =req.params
    console.log(id)
    if(isValidObjectId(id)){
      const find = await Category.findByIdAndDelete(id)
      console.log(find)
      if(find){
        return res.status(200).json(find)
      }else{
        return res.status(404).send('No existe la categoria con ese nombre')
      }
    }else{
      return res.status(404).send("Id invalido")
    }
  } catch (error) {
    console.log('Error en DELETE CATEGORY', error)
  }
}