
export type Action ={
    type: string,
    payload? : any
}

export interface product{
    name: string
    precio_compra: number
    precio_venta: number
    description: string
    img: string
    stock: number
    on: boolean
  }

export type stateTypes = {
    product: [] | []
    allProduct : [] | []
}