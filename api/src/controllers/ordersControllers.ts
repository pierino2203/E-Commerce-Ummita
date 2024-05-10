import { RequestHandler } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import User from "../models/User";
import { order } from "./interfaces/interfaces";


export const getOrder: RequestHandler = async (req,res) =>  {
  try {
    // const orders = await Order.find().populate('user_id',{
    //   _id: 1,
    //   name: 1,
    //   mail: 1
    // })
    const orders: any = await Order.aggregate([
      {
        $lookup:
        {
          from: "users",
          localField:"user_id",
          foreignField: "_id",
          as:"User__"
        }
      },
      {
        $lookup:
        {
          from:"products",
          let:{
            productsIds: "$products"
          },
          pipeline: [
            {
              $match: {
                $expr:  {
                  $in: ["$_id","$$productsIds"]
                }
              }
            }
          ],
          as: "ListProducts"
        }
      },      {
        $sort: { date: -1 } // Ordenar por fecha (date) en orden descendente (-1)
      }
    ])
    
    res.status(200).json(orders)
  } catch (error) {
    console.log('Error en Get Orders')
  }
}

export const postOrder: RequestHandler = async (req,res)  =>  {
  try {
    const {user_id,date,total,product,payment,cantidad,cart} =req.body
    const user: any = await User.findById(user_id)
    const order = new Order({
      user_id : user?._id,
      date: date,
      total: total,
      products: product,
      payment: payment,
      cart: cart
    }) 
     console.log(order)
    
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