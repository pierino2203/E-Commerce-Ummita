import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

export interface Product {
    _id: string;
    name: string;
    precio_compra: number;
    precio_venta: number;
    precio_D: number;
    precio_C: number;
    description: string;
    img: string;
    tipo: string;
    stock: number;
    on: boolean;
    category: string;
    CategoryProduct: object;
}
export interface formProduct{

}

export interface ProductState {
    list: Product[];
    productDetail: Product[];
}

const initialState: ProductState = {
    list: [],
    productDetail: []
};


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProduct(state, action: PayloadAction<ProductState>) {
            state.list = action.payload.list;
        },
        getProductName(state, action: PayloadAction<ProductState>) {
            state.list = action.payload.list;
        },
        getProductId(state , action: PayloadAction<ProductState>){
            state.productDetail = action.payload.productDetail
        }
    }
});

export const { getProduct, getProductName ,getProductId} = productSlice.actions;

export const getAllProducts = (token: {auth: boolean, token: string}) => async (dispatch: AppDispatch) => {
    try {
        dispatch(getProduct({ list: [], productDetail: [] }));
        const products = await axios.get('http://localhost:4000/product',{
            headers: {
                "x-access-token": token.token,
            }
        });
        dispatch(getProduct({ list: products.data, productDetail: [] }));
    } catch (error) {
        console.log(error);
    }
};

export const getProductByName = (name: string,token : {auth:boolean,token: string}) => async (dispatch: AppDispatch) => {
    try {
        dispatch(getProductName({ list: [],productDetail: [] }));
        const res = await axios.get(`http://localhost:4000/product?name=${name}`,{
            headers: {
                "x-access-token": token.token,
            }
        });
        dispatch(getProduct({ list: res.data, productDetail: [] }));
    } catch (error) {
        console.log(error);
    }
};

export const getProductById =(id : string,token : {auth:boolean,token: string})=> async (dispatch: AppDispatch)=> {
    try {
        const res = await axios.get(`http://localhost:4000/product/`+id,{
            headers: {
                "x-access-token": token.token,
            }
        });
        dispatch(getProduct({ list: [],productDetail: res.data}));
    } catch (error) {
        console.log(error);
    }
}
export const createProduct= (data: Product)=> async (dispatch: AppDispatch)=>{
    try {
        await axios.post('http://localhost:4000/product/',data)
    } catch (error) {
        console.log('Error al agregar producto',error)
    }
}
export default productSlice.reducer;
