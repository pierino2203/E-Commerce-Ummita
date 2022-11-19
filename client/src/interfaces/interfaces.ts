
export type Action ={
    type: string,
    payload? : any
}

export interface user {
    _id: string,
    name: string,
    lastName: string,
    mail: string,
    password: string,
    adress: string,
    img: string,
    admin: boolean

}

export interface product{
    _id: string
    name: string
    precio_compra: number
    precio_venta: number
    description: string
    img: string
    stock: number
    on: boolean
    category: string
    CategoryProduct: object
  }

export type stateTypes = {
    product: [] | []
    allProduct : [] | []
    user: any
    detail: [] | []
    cart: [] | []
    error: string | ''
    userDetail: [] | []
    
}