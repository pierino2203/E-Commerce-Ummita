import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { AppDispatch } from "../store";
import axios, { AxiosResponse } from "axios";


interface CloudState {
    cloudinary: string;

}
const initialState: CloudState = {
    cloudinary: ''
}
export const cloudinarySlice = createSlice({
    name: 'cloudinary',
    initialState,
    reducers:{
        postImg(state, action: PayloadAction<string>){
            state.cloudinary = action.payload
        }
    }
})
 export const {postImg} = cloudinarySlice.actions
export const postCloudinary = (data: FormData) => async (dispatch: AppDispatch) =>{
    try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dvij9robe/image/upload",data)
        dispatch(postImg(response.data.secure_url))
    } catch (error) {
        console.log("Error al cargar la imagen",error)
    }
}

export default cloudinarySlice.reducer 