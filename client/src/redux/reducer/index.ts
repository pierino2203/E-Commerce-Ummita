import { Action, stateTypes } from "../../interfaces/interfaces"
import { GET_PRODUCTS, GET_PRODUCTS_BY_NAME } from "../actions"

const inicialState: stateTypes = {
  allProduct : [],
  product : []
  
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
    default:
      return state
  }
}