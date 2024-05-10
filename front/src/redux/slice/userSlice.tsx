import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { Navigate } from "react-router-dom";

// Define la interfaz para el estado del usuario
export interface User {
  _id: string;
  name: string;
  lastName: string;
  mail: string;
  password: string;
  adress: string;
  img: string;
  admin: boolean;
}
export interface formLoggin {
  mail: string;
  password: string
}


// Define la interfaz para el estado de usuarios
interface UserState {
  user: User[];
  loading: boolean;
}

// Define el estado inicial
const initialState: UserState = {
  user: [],
  loading: false,
};

// Crea un slice de Redux para el estado de usuarios
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers(state, action: PayloadAction<UserState>) {
      state.user = action.payload.user
      state.loading = true;
    },
    getUserId(state, action: PayloadAction<UserState>) {
      state.user = action.payload.user
    },
  },
});

// Exporta las acciones generadas automáticamente por createSlice
export const { getUsers, getUserId } = userSlice.actions;

// Define una acción asincrónica para obtener todos los usuarios
export const getAllUsers = (token: { auth: boolean, token: string }) => async (dispatch: AppDispatch) => {
  try {
    // Indica que se está iniciando la solicitud
    dispatch(getUsers({
      user: [],
      loading: false
    }));

    const response = await axios.get<User[]>("http://localhost:4000/user", {
      headers: {
        "x-access-token": token.token,
      }
    });
    // Actualiza el estado con los usuarios obtenidos correctamente
    dispatch(getUsers({
      user: response.data,
      loading: true
    }));
  } catch (error: any) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.log(error)
  }
};

export const createUser = (data: User) => async (dispatch: AppDispatch) => {
  try {
    await axios.post("http://localhost:4000/user/register", data)
  } catch (error) {
    console.log(error)
  }
}
export const logginUser = (data: formLoggin, navigate: any) => async (dispatch: AppDispatch) => {
  try {
    const user = (await axios.post('http://localhost:4000/user/login', data)).data
    localStorage.setItem('token', JSON.stringify(user))
    navigate('/home')
  } catch (error) {
    console.log('Error en loggin', error)
  }
}
export const logOut = (navigate: any) => (dispatch: AppDispatch) => {
  try {
    localStorage.setItem('token', JSON.stringify([]))
    navigate('/loggin')
  } catch (error) {
    console.log(error)
  }
}
export const getUserById = (token: { auth: boolean, token: string }) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getUserId({
      user: [],
      loading: false
    }))
    const response = await axios.get<User[]>("http://localhost:4000/user/token", {
      headers: {
        "x-access-token": token.token,
      }

    })
    dispatch(getUserId({
      user: response.data,
      loading: true
    }))
  } catch (error) {

  }
}
export default userSlice.reducer;