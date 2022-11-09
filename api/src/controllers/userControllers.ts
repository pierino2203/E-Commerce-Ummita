import { RequestHandler } from "express";
import User from "../models/User";
import dotenv from 'dotenv'
import { user } from "./interfaces/interfaces";
import bcrypt from 'bcryptjs'
import { isValidObjectId } from "mongoose";
const jwt = require('jsonwebtoken')
dotenv.config()

export const getUser: RequestHandler = async (req,res)  =>  {
  try {
    const users = await User.find()
    if(users){
      return res.status(200).json(users)
    }else{
      return res.status(404).send("No hay usuarios cargados")
    }
  } catch (error) {
    console.log("Error en GET USER",error)
  }  
}

export const getUserById: RequestHandler = async (req,res)  =>  {
  try {
    const {id} = req.params
    if(isValidObjectId(id)){
      const user = await User.findById(id)
      if(user){
        return res.status(200).json(user)
      }else{
        return res.status(404).send(`Usuario de id ${id} no se encuentra`)
      }
    }else{
      return res.status(404).send("El ID no es valido")
    }

  } catch (error) {
    console.log("Error en GET USER ID",error)
  }
}

export const register: RequestHandler = async (req,res) =>  {
  try {
    const {name,lastName,mail,password,adress} = req.body
    if(!name || !lastName || !mail || !password || !adress){
      return res.status(404).send("Faltan datos, ingrese datos requeridos")
    }
    const find = await User.findOne({mail:mail})
    if(find){
      return res.status(202).send("Usuario con ese mail ya existe")
    }else{
      const user : any = new User(req.body)
      user.password = await user.encryptPassword(user.password)
      await user.save()
      const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE,
      })
      res.status(200).json({auth: true,token})
    }
  } catch (error) {
    console.log("Error en registrar",error)
  }
}

export const login : RequestHandler = async (req,res) =>  {
  const {mail,password} = req.body
  if(!mail || !password){
    return res.status(400).send("Ingrese los datos")
  }
  const find : any = await User.findOne({mail: mail})
  if(!find){
    res.status(404).send("No se encuentra el Email")
  }else{
    const comparePassword = await find.validatePassword(password)
    if(!comparePassword){
      return res.status(404).send('Contrasenia incorrecta')
    }else{
      const token= await jwt.sign({id: find._id},process.env.SECRET_KEY,{
        expiresIn:  process.env.JWT_EXPIRE,
      })
      res.status(200).json({auth: true,token})
    }
  }
}

export const deleteUser: RequestHandler = async (req,res) =>  {
  try {
    const {id} = req.params
    if(isValidObjectId(id)){
      const del = await User.findByIdAndDelete(id)
      if(del){
        return res.status(200).json(del)
      }else{
        return res.status(404).send("No se encontro un usario con ese ID")
      }
      
    }else{
      return res.status(404).send("No es un ID valido")
    }
  } catch (error) {
    console.log("Error en borrar USER",error)
  }
}

export const editUser : RequestHandler = async (req,res)  =>  {
  try {
    const {id} = req.params
    if(isValidObjectId(id)){
      if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password,salt)
        req.body.password = hash
        const find = await User.findByIdAndUpdate()
      }
      const user = await User.findByIdAndUpdate(id,req.body)
      user 
      ? res.status(200).json(user)
      : res.status(404).send('Usuario no encontrado')
    }else{
      return res.status(404).send('Ingrese un id valido')
    }
  }
  catch(error){
    console.log('Error en modificar usuario',error)
  }
}