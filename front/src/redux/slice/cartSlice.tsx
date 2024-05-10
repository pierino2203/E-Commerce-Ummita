import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";
import { AppDispatch } from "../store";

export interface ProductCart{
    _id: string;
    name: string;
    precio_venta: number;
    precio_C: number;
    precio_D: number;
    img: string;
    stock: number;
    cantidad: number;
    on: boolean;
    category: string;
    CategoryProduct: object;
}
export interface cartState{
    cart: ProductCart[]
}
const initialState: cartState = {
    cart:[]
}
export const cartSlicer = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addProduct(state,action: PayloadAction<ProductCart>){
            const existingProduct = state.cart.find(product => product._id === action.payload._id);

            if (existingProduct) {
                // Si el producto ya está en el carrito, actualiza la cantidad
                existingProduct.cantidad += action.payload.cantidad;
            } else {
                // Si el producto no está en el carrito, agrégalo
                state.cart.push(action.payload);
            }
        },
        cleanCart(state){
            state.cart = []
        }
    }
})
export const {addProduct,cleanCart} = cartSlicer.actions

export const addPro = (data: ProductCart) => (dispatch : AppDispatch) => {
    try {
        dispatch(addProduct(data))
    } catch (error) {
        console.log(error)
    }
}
export default cartSlicer.reducer