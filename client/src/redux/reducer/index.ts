import { Action, stateTypes } from "../../interfaces/interfaces"
import { GET_PRODUCTS, GET_PRODUCTS_BY_ID, GET_PRODUCTS_BY_NAME, POST_USER } from "../actions"

const inicialState: stateTypes = {
  allProduct : [],
  product : [],
  user: [],
  detail: []
  
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
        default:
      return state
  }
}