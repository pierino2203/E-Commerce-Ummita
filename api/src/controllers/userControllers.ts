import { RequestHandler } from "express";
import User from "../models/User";
import dotenv from 'dotenv'
import { user } from "./interfaces/interfaces";
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
      const token: any = await jwt.sign({id: find._id},process.env.SECRET_KEY,{
        expiresIn:  process.env.JWT_EXPIRE,
      })
      res.status(200).json({auth: true,token})
    }
  }
}