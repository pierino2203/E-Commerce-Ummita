import React from "react"

interface Props {
    _id?: string
    name: string
    precio_venta: number
    img: string

  
}

export default function Card ({_id,name, img, precio_venta}: Props){
  return(
    <div>
      <img src= {img}  width='200px' height='250px'/>
      <h3>{name}</h3>
      <h3>$ {precio_venta}</h3>
    </div>
  )
}