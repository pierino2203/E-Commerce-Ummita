import React from 'react'
import { product } from '../interfaces/interfaces'
import CartitaCard from './CartitaCard'
import Style from '../styles/Cart.module.css';

export function Cart(){
  const item: any = localStorage.getItem('carrito')
  const productCart = JSON.parse(item)
  console.log(productCart)
  function totalSaldo(){
    let total = 0
    const mapear = productCart.map((e: any)=>  {
      total = total + (e.product.precio_venta*e.cantidad)
      
    })
    return total
  }
  function cambiarCantidad(event: any, product: any){
    const itemsLocal: any = localStorage.getItem('carrito')
    const items: any= JSON.parse(itemsLocal)
    const find = items.map((ele: any)=> {
      if(ele.product._id === product._id){
        ele.cantidad = event.target.value
      }
      return ele
    })
    localStorage.setItem('carrito', JSON.stringify(find))
    window.location.reload()
    
  }
  function vaciarCarrito(){
    localStorage.setItem('carrito', JSON.stringify([]))
    window.location.reload()
  }
  return(
    <div className='card'>
      <h1>Carrito de Compras</h1>
      <div className='box'>
      {
        productCart?
        productCart.map((e: any)  =>  {
          return(
            <div className={Style.card}>
              <img src={e.product.img} width='40px' height='40px'/>
              <h3>{e.product.name}</h3>
              <h3>Cantidad:</h3>
              <input 
              className="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
              type='number'
              value={e.cantidad}
              name='cantidad'
              min={1} max={e.product.stock}
              onChange={(event)=> cambiarCantidad(event,e.product)}
              />
              <h3> Precio total: {e.product.precio_venta*e.cantidad}</h3>
            </div>
          )
        })
        
        :<h1>Carrito vacio</h1>
      }
      </div>
      <div>
        {
          productCart.length>0?
          <div>
            <h3>Total: ${totalSaldo()}</h3>
            <button onClick={()=>vaciarCarrito()}>Limpiar Carrito</button>
          </div>
          : <h1>Carrito Vacio</h1> 
      }
      </div>
    </div>
  )
}