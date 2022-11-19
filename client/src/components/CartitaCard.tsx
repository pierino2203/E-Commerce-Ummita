import React from 'react'
interface Props {
    _id?: string
    name: string
    precio_venta: number
    img: string
    

  
}
export default function CartitaCard({_id,name,precio_venta,img}: Props){
  return(
    <div>
      <img src={img} alt="Foto de producto" width='60px' height='65px'/>
      <h1>{name}</h1>
      <h2>$ {precio_venta}</h2>
    </div>
  )
}