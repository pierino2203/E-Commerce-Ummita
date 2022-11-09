import { Action, product, stateTypes } from "../interfaces/interfaces"
import { Dispatch, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "../config"
import { getProducts } from "../redux/actions"
import React from "react"
import Card from "./Card"
import NavBar from '../components/NavBar'
import Paginado from "./Paginado"


export default function Home(){
  const dispatch: any = useAppDispatch()
  const product: product | [] = useAppSelector((state: stateTypes) => state.allProduct)
  const [currentPage,setCurrentPage] = useState(1)
  const [productPerPage,setProductPerPage] = useState(4)
  const indexOfLastProduct = currentPage*productPerPage
  const indexOfFirstProduct = indexOfLastProduct-productPerPage
  const currentProduct = product.slice(indexOfFirstProduct,indexOfLastProduct)

  const paginado = (numberPage: number)=>{
    setCurrentPage(numberPage)
  }

  useEffect(()=>  {
    dispatch(getProducts())
  },[dispatch])
  console.log(product)
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
                <div>
                 <Card
                  img ={e.img}
                  name= {e.name}
                 precio_venta={e.precio_venta}
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