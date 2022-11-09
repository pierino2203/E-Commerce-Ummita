import axios from 'axios'
import { Dispatch } from 'react'
import {Action, product} from '../../interfaces/interfaces'
import {useAppDispatch} from '../../config'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_BY_NAME= 'GET_PRODUCTS_BY_NAME'
export function getProducts(){
  try {
    return async function(dispath: Dispatch<Action>){
      const products: Array<product> = (await axios.get('http://localhost:3001/product')).data
      // console.log(products)
      dispath({
        type: GET_PRODUCTS,
        payload: products
      })
    }    
  // eslint-disable-next-line no-unreachable
  }catch (error) {
    console.log("Error en obtener productos",error) 
  }  
}

export function getProductByName(name: string){
  try {
    return async function (dispath: Dispatch<Action>){
      const product : Array<product> = (await axios.get('http://localhost:3001/product?name='+ name)).data
      console.log(product)
      dispath({
        type: GET_PRODUCTS_BY_NAME,
        payload: product
      })
    }
  } catch (error) {
    console.log("error en get By Name",error)
  }
}