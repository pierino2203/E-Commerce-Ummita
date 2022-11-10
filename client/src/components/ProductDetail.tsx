import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../config'
import { product, stateTypes } from '../interfaces/interfaces'
import { getProductById } from '../redux/actions'

export default function ProductDetail(props: any){
  const {id}: any = useParams()
  const dispatch: any = useAppDispatch()
  const product: Array<product>= useAppSelector((state: stateTypes)=> state.detail)
  useEffect(()=>{
    dispatch(getProductById(id))
  },[id])
  return(
    <div>
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
            <div><p>Precio: {product[0].precio_venta}</p></div>
          </div>
        : <p>loading</p>
    }
    </div>
  )
}