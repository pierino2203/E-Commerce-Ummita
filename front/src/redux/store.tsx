import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice'
import productReducer from './slice/productSlice'
import cartReducer from './slice/cartSlice'
import orderReducer from './slice/orderSlice'
import cloudinarySlice from "./slice/cloudinarySlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        cloudinary: cloudinarySlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


