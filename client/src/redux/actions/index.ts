import axios from 'axios'
import { Dispatch } from 'react'
import {Action, product, user} from '../../interfaces/interfaces'
import {useAppDispatch} from '../../config'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_BY_NAME= 'GET_PRODUCTS_BY_NAME'
export const GET_PRODUCTS_BY_ID='GET_PRODUCTS_BY_ID'
export const POST_USER='POST_USER'
export const LOGGIN_USER='LOGGIN_USER'
export const ERROR_HANDLER='ERROR_HANDLER'
export const CLEAN_ERROR ='CLEAN_ERROR'
export const ADD_CART ='ADD_CART'
export const DELETE_CART='DELETE_CART'
export const ACTUALIZAR_CART='ACTUALIZAR_CART'
export const LOG_OUT = 'LOG_OUT'
export const GET_USER_DATA ='GET_USER_DATA'

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

export function logginUser(navigate: any,payload: any){
  return async function(dispatch: Dispatch<Action>){
    try {
      const user = ((await axios.post('http://localhost:3001/user/login',payload)).data)
      localStorage.setItem('token',JSON.stringify(user))
      navigate('/home')
      // window.location.reload()
    } catch (error: any ) {
      // console.log('Error en Loggin User',error)
      return dispatch({
        type: ERROR_HANDLER,
        payload: error.response.data
      })
    }
  }
}

export function logOut(){
  return function(dispatch: Dispatch<Action>){
    return dispatch({
      type: LOG_OUT
    })
  }
}

export function getUserData(token: {auth: boolean, token: string}){
  return async function(dispatch: Dispatch<Action>){
    try {
      const user: user = (await axios.get('http://localhost:3001/user/token',{
        headers: {
          'x-access-token': token.token
        }
      })).data
      return dispatch({
        type: GET_USER_DATA,
        payload: [user]
     })
    } catch (error: any) {
      // console.log('Error en User Data',error)
      return dispatch({
        type: ERROR_HANDLER,
        payload: error.response.data
      })
    }
  }
}
export const cleanError = () => {
  return function (dispatch: Dispatch<Action>) {
      dispatch({
          type: CLEAN_ERROR
      })
  }
}

export function addCart(product: any){
  return {
    type: ADD_CART,
    payload: product
  }
}

export function deleteCart(id:any){
  return {
    type: DELETE_CART,
    payload: id
  }
}

export function actualizarCart(id:any){
  return {
    type: ACTUALIZAR_CART,
    payload: id
  }
}
