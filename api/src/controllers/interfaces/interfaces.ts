import { ObjectId } from "mongoose"

export interface user {
  // _id: ObjectId,
  name: string,
  lastName: string,
  mail: string,
  password: string,
  img: string,
  adress: string,
  admin: boolean
}

export interface product{
  name: string,
  tipo: string,
  precio_compra: number,
  precio_venta: number,
  precio_D: number,
  precio_C: number,
  description: string,
  img: string,
  stock: number,
  on: boolean,
  category: string
}
export interface category{
  name: string
}
export interface proveedor{
  name: string
}


export interface order{
  user_id: ObjectId,
  date: Date,
  payment: boolean,
  productos: Array<product>
  total: number
  _id: ObjectId,
  cart: []

}