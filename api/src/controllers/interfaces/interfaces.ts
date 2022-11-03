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
  precio_compra: number,
  precio_venta: number,
  description: string,
  img: string,
  stock: number,
  on: boolean
}
export interface category{
  name: string
}
export interface proveedor{
  name: string
}