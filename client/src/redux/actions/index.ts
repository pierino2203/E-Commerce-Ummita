import axios from 'axios'
import { Dispatch } from 'react'
import {Action, product} from '../../interfaces/interfaces'
import {useAppDispatch} from '../../config'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_BY_NAME= 'GET_PRODUCTS_BY_NAME'
export const POST_USER='POST_USER'
export const GET_PRODUCTS_BY_ID='GET_PRODUCTS_BY_ID'
export function getProducts(){
  try {
    return async function(dispath: Dispatch<Action>){
      const products: Array<product> = (await axios.get('http://localhost:3001/product')).data
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
      dispath({
        type: GET_PRODUCTS_BY_NAME,
        payload: product
      })
    }
  } catch (error) {
    console.log("error en get By Name",error)
  }
}

export function getProductById(id: string){
  try {
    return async function (dispatch: Dispatch<Action>){
      const product : product = (await axios.get('http://localhost:3001/product/'+id)).data
      dispatch({
        type: GET_PRODUCTS_BY_ID,
        payload: product
      })
    }
  } catch (error) {
    console.log('Error en get By Id',error)
  }
}

export function registerUser(payload: any){
  return async function(dispatch: Dispatch<Action>){
    try {
      const user = await axios.post('http://localhost:3001/user/register',payload)
      return user
    } catch (error) {
      console.log('Error en Agregar user',error)
    }
  }
}

