import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { AppDispatch } from "../store";
import { ProductCart } from "./cartSlice";
import axios from "axios";
import userSlice, { User } from "./userSlice";
export interface Order  {
    _id: string
    user_id: string;
    date: Date;
    total: number;
    payment: String;
    product: String[];
    cart: ProductCart[],
    User__: User[] 

}
export interface orderState {
    order: Order[]
}
const initialState: orderState ={
    order: []
} 
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{
        getAllOrders(state, action: PayloadAction<orderState>) {
            state.order = action.payload.order
          },
         filterOrder(state,action : PayloadAction<orderState>) {
            state.order = action.payload.order
         } 
    }
})
export const {getAllOrders, filterOrder} =orderSlice.actions
export default orderSlice.reducer 

export const getOrders = (token: {auth: boolean, token:string}) => async (dispath : AppDispatch)=>{
    try {
        const response = await axios.get<Order[]>("http://localhost:4000/order", {
            headers: {
              "x-access-token": token.token,
            }
          });
          dispath(getAllOrders({
            order : response.data
        }))
    } catch (error) {
        console.log('error en getOrders',error)
    }
}
export const postOrder = (data: Order, navigate: any) => async (dispatch: AppDispatch)=>{
    try {
        console.log(data)
        await axios.post('http://localhost:4000/order',data)
        navigate('/caja')
    } catch (error) {
        console.log('error en agregar Orden',error)
    }
}

export const orderFilter = (data: any ,token: {auth: boolean, token:string}) => async (dispatch: AppDispatch) => {
    try {
        dispatch(filterOrder({
            order: []
        }))
        const response = await axios.get<Order[]>("http://localhost:4000/order", {
            headers: {
              "x-access-token": token.token,
            }
          });
        console.log(data)
         
        if(data === 'debito-credito1'){
            console.log(response.data.filter((e) => e.payment === data))
            dispatch(filterOrder({
                order: response.data.filter((e) => e.payment === data)
            }))
        }  
    } catch (error) {
        console.log('Error en ')
    }
}