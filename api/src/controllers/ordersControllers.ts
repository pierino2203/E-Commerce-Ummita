import { RequestHandler } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import User from "../models/User";
import { order } from "./interfaces/interfaces";


export const getOrder: RequestHandler = async (req,res) =>  {
  try {
    const order: Array<order> = await Order.find()
    res.status(200).json(order)
  } catch (error) {
    console.log('Error en get Orders',error)
  }
}

export const postOrder: RequestHandler = async (req,res)  =>  {
  try {
    const {user_id,date,total,productos,payment,cantidad} =req.body
    const user: any = await User.findById(user_id)
    // console.log(user)
    const order = new Order({
      user_id : user?._id,
      date: date,
      total: total,
      productos: productos,
      payment: payment
    }) 
    // console.log(order)
    
    const saveOrder: any = await order.save()
    const orderId = saveOrder._id
    
    // console.log(cantidad)
    user.orders = user.orders.concat(orderId)
    await user.save()
    res.status(200).json(order)
  } catch (error) {
    console.log('Error en post Order',error)
  }
}