import { stringify } from "querystring"
import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../config"
import { product, stateTypes } from "../interfaces/interfaces"
import { addCart, getProductById } from "../redux/actions"

interface Props {
    _id?: string
    name: string
    precio_venta: number
    img: string
    product: product

  
}

export default function Card ({_id,name, img, precio_venta, product}: Props){
  const dispatch: any =useAppDispatch()
  // const cart: any = useAppSelector((state : stateTypes) => state.cart)
  
  
   
  
  function handleClick(){
    
    dispatch(addCart(product))
    
    
  }
  return(
    <div>
      <img src= {img}  width='200px' height='250px'/>
      <h3>{name}</h3>
      <h3>$ {precio_venta}</h3>
      <NavLink  to={`/home/${_id}`} >
        <button>Ver mas</button>
      </NavLink>
      <button onClick={()=>handleClick()}>Agregar al carrito</button>
    </div>
  )
}