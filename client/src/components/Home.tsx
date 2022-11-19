import { Action, product, stateTypes, user } from "../interfaces/interfaces"
import { Dispatch, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "../config"
import { getProducts, getUserData } from "../redux/actions"
import React from "react"
import Card from "./Card"
import NavBar from '../components/NavBar'
import Paginado from "./Paginado"
import { NavLink } from "react-router-dom"


export default function Home(){
  const dispatch: any = useAppDispatch()
  const product: product | [] = useAppSelector((state: stateTypes) => state.allProduct)
  const carrito = useAppSelector((state: stateTypes)=> state.cart)
  const [currentPage,setCurrentPage] = useState(1)
  const [productPerPage,setProductPerPage] = useState(4)
  const indexOfLastProduct = currentPage*productPerPage
  const indexOfFirstProduct = indexOfLastProduct-productPerPage
  const currentProduct = product.slice(indexOfFirstProduct,indexOfLastProduct)

  const paginado = (numberPage: number)=>{
    setCurrentPage(numberPage)
  }
  let token: any= localStorage.getItem('token')
  
  useEffect(()=>  {
    dispatch(getProducts())
    
  },[dispatch])
  
  return(
    <div>
      <NavBar/>
      <div>
        <Paginado
          productPerPage ={productPerPage}
          product = {product.length}
          paginado = {paginado}
        />
      </div>
      <div>
        <ul>
          {
            currentProduct?.map((e: product) =>  {
              return(
                <div key={e._id}>
                  <Card
                      _id={e._id}
                      img ={e.img}
                      name= {e.name}
                      precio_venta={e.precio_venta}
                      key={e._id}
                      product={e}
                    />
                </div>
              )
            })
          }
        </ul>
      </div>
      
    </div>
  )
}