import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../config'
import { product, stateTypes } from '../interfaces/interfaces'
import { actualizarCart, addCart, getProductById } from '../redux/actions'

export default function ProductDetail(props: any){
  const {id}: any = useParams()
  const dispatch: any = useAppDispatch()
  const product: Array<product>= useAppSelector((state: stateTypes)=> state.detail)
  
 
  const cart = useAppSelector((state: stateTypes)=> state.cart)
  function addLocalCart( elemento: any ){
    const itemsLocal: any = localStorage.getItem('carrito')
    const items: any= JSON.parse(itemsLocal)
    items.push(elemento)
    localStorage.setItem('carrito', JSON.stringify(items))
  }
  function deleteCart(elemento:any){
    const itemsLocal: any = localStorage.getItem('carrito')
    // console.log(itemsLocal)
    const items: any= JSON.parse(itemsLocal)
    localStorage.setItem('carrito', JSON.stringify([]))
    // console.log(items)
    // localStorage.setItem('carrito', JSON.stringify([]))
    const find = items.map((e: any)=>  {
      if(e.product._id === elemento.product._id){
        // console.log('hola')
        e.cantidad = e.cantidad +1
        
      }
      return e
    })
    // console.log(find)
    localStorage.setItem('carrito', JSON.stringify(find))
    alert(`Se actializo cantidad en el Carrito`)
  }
  function handleClick(){
    const itemsLocal: any = localStorage.getItem('carrito')
    const items: any= JSON.parse(itemsLocal)
    const find = items.find((e: any) => e.product._id ===product[0]._id)
    console.log(find)
    if(find){
      if(find.product.stock>=find.cantidad){
        deleteCart(find)
      }else{
        alert('No hay mas Stock para agregar')
      }
      
         
    }else{
      let prod ={
        product: product[0],
        cantidad: 1
      }
      addLocalCart(prod)
      alert('Agregado al carrito')
    }
  }
  useEffect(()=>{
    dispatch(getProductById(id))
  },[id])
  
  return(
    <div>
      <NavLink to='/home'><button>Atras</button></NavLink>
      {
        product.length>0 ?
          <div>
            
            <div>
              <h1>{product[0].name}</h1>
              <img src={product[0].img}/>
            </div>
            <div>
              <h3>{product[0].description}</h3>
            </div>
            <div>
              <h3>Categoria: {product[0].category}</h3>
            </div>
            <div><p><strong>Precio: ${product[0].precio_venta}</strong></p></div>
            <button onClick={()=> handleClick()}>Agregar al Carrito</button>
          </div>
        : <p>loading</p>
    }
    </div>
  )
}