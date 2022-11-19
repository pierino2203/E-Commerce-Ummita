import { Action, product, stateTypes } from "../../interfaces/interfaces"
import { ACTUALIZAR_CART, ADD_CART, CLEAN_ERROR, DELETE_CART, ERROR_HANDLER, GET_PRODUCTS, GET_PRODUCTS_BY_ID, GET_PRODUCTS_BY_NAME, GET_USER_DATA, LOGGIN_USER, LOG_OUT, POST_USER } from "../actions"

const inicialState: stateTypes = {
  allProduct : [],
  product : [],
  user: '',
  detail: [],
  error: '',
  cart: [],
  userDetail: []
  
}

type ReducerAction ={
  type: "change-value",
  payload:  any
}

export default function rootReducer(state = inicialState,action: Action){
  switch(action.type){
    case GET_PRODUCTS:
      return{
        ...state,
        allProduct: action.payload
      }
    case GET_PRODUCTS_BY_NAME:
      return{
        ...state,
        allProduct: action.payload
      }
    case GET_PRODUCTS_BY_ID:
      return{
        ...state,
        detail: action.payload                                                                                                                                                                                                                                                                                                                                                                                                              
      }
    case POST_USER:
      return{
        ...state
      }
    case LOGGIN_USER:
      return{
        ...state
      }
    case ERROR_HANDLER:
      return{
      ...state,
      error: action.payload
      }
    case CLEAN_ERROR:
      return {
       ...state,
        error: ''
      }
    case ACTUALIZAR_CART:
      let item: any = localStorage.getItem('carrito')
      let it: any= JSON.parse(item)
      localStorage.setItem('carrito', JSON.stringify([]))
      console.log(localStorage.getItem('carrito'))
      const final =it.filter((e: any) => e.product._id!==action.payload )
      console.log(final)
      localStorage.setItem('carrito', JSON.stringify(final))
      return {
          ...state,
          cart: action.payload,
      }
    case ADD_CART:
      let itemsLocal: any = localStorage.getItem('carrito')
      let items: any= JSON.parse(itemsLocal)
      items.push(action.payload)
      localStorage.setItem('carrito', JSON.stringify(items))
      return {
        ...state,
        cart: [...state.cart,action.payload]
      }
    case DELETE_CART:
      if(action.payload==='All'){
        return{
          ...state,
          cart: [...state.cart, action.payload]
        }
      }else{
        return{
          ...state,
          cart: state.cart.filter((e:product)=> e._id!== action.payload)
        }
      }
    case LOG_OUT:
      return {
        ...state,
        user: ''
      } 
    case GET_USER_DATA:
      return{
        ...state,
        userDetail: action.payload
      }      
    default:
      return state
  }
}