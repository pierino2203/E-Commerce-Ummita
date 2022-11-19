const jwt =require('jsonwebtoken')
import dotenv from 'dotenv'
import { RequestHandler } from 'express'
dotenv.config()

export const verifyToken: RequestHandler = async (req: any , res, next) => {
  try {
    const token= req.headers['x-access-token']
    if(!token){
      return res.status(200).json({auth: false,message:'No se encuentra el Token'})
    }
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    req.userId = decoded.id
    console.log(req.userId)
    next()
  } catch (error) {
    console.log('Error en para el token',error)
  }
}