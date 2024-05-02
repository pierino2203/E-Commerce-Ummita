import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice'
import productReducer from './slice/productSlice'
import cartReducer from './slice/cartSlice'
import orderReducer from './slice/orderSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


