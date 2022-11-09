import React from 'react'

interface Props  {
  productPerPage : number
  product: number
  paginado: any

}
export default function({productPerPage, product, paginado}: Props){
  const numberPage: Array<number> = []
  for(let i=1;i<=Math.ceil(product/productPerPage);i++){
    numberPage.push(i)
  }
  return(
    <nav>
      <ul>
        {
          numberPage &&
          numberPage.map((number)=> (
            <li>
              <p onClick={()=> paginado(number)}>{number}</p>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}