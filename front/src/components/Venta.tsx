import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar1 from "./NavBar1";
import { Table } from "react-bootstrap";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { Product, getAllProducts, getProductById } from "../redux/slice/productSlice";
import { ProductCart, addPro, addProduct, cleanCart } from "../redux/slice/cartSlice";
import { getAllUsers, getUserById, getUserId } from "../redux/slice/userSlice";
import { Order, postOrder } from "../redux/slice/orderSlice";

export default function Venta() {
  const natigate = useNavigate()
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.product);
  const { cart } = useAppSelector((state) => state.cart)
  const  {user}  = useAppSelector((state) => state.user)
  const token: any = localStorage.getItem('token');
  const navigate = useNavigate();
  let userID : any = user
  let sub = 0
  let subDeb = 0
  let subCred = 0
  cart.map((e) => {
    sub = sub + e.cantidad * e.precio_venta
    subDeb = subDeb + e.cantidad * e.precio_D
    subCred = subCred + e.cantidad * e.precio_C
  })
  const [order, setOrder] = useState<Order>({
    _id: '',
    user_id: '',
    date: new Date(),
    total: 0,
    payment: '',
    product: [],
    cart : [],
  //   User__: {  _id: '',
  //     name: '',
  //     lastName: '',
  //     mail: '',
  //     password: '',
  //     adress: '',
  //     img: '',
  //     admin: true
  // } 
    User__: []    
}
      )  
  useEffect(() => {
    dispatch(getAllProducts(JSON.parse(token)));
    dispatch(getUserById(JSON.parse(token)))
  }, []);

  function handleAdd(e: any) {
    e.preventDefault()
    let id = e.target.value
    const prod: any = list.find((e) => e._id === id)
    if(prod.stock >0){
      let prodCart = { ...prod, cantidad: 1 }
      dispatch(addPro(prodCart))
    }else{
      alert('No hay stock')
    }


  }

  function handleClean() {
    dispatch(cleanCart())
  }
  function handleChange(e: any) {
    if(e.target.value==='efectivo'){
      setOrder({
        ...order,
        user_id : userID._id,
        payment: 'efectivo',
        date: new Date(),
        total: sub,
        product: cart.map((e: ProductCart)=> {return e._id}),
        cart : cart
      })
    } 
    if(e.target.value==='debito-credito1'){
      console.log(subDeb)
      setOrder({
        ...order,
        user_id : userID._id,
        date: new Date(),
        payment: 'debito-credito1',
        total: subDeb,
        product: cart.map((e: ProductCart)=> {return e._id}),
        cart : cart
      })
    }   
    if(e.target.value==='credito-3'){
      setOrder({
        ...order,
        user_id : userID._id,
        payment: 'credito-3',
        date: new Date(),
        total: subCred,
        product: cart.map((e: ProductCart)=> {return e._id}),
        cart : cart
      })
    }   
  }
  console.log(subDeb)
  function handleSubmit(e: any) {
  e.preventDefault()

  if(order.payment==='efectivo'){
    setOrder({
      ...order,
      user_id : userID._id,
      date: new Date(),
      total: sub,
      product: cart.map((e: ProductCart)=> {return e._id}),
      cart : cart
    })
    dispatch(postOrder(order,navigate))
  } 
  if(order.payment==='debito-credito1'){
    console.log(subDeb)
    setOrder({
      ...order,
      user_id : userID._id,
      date: new Date(),
      total: subDeb,
      product: cart.map((e: ProductCart)=> {return e._id}),
      cart : cart
    })
    dispatch(postOrder(order,navigate))
  }   
  if(order.payment==='credito-3'){
    setOrder({
      ...order,
      user_id : userID._id,
      date: new Date(),
      total: subCred,
      product: cart.map((e: ProductCart)=> {return e._id}),
      cart : cart
    })
    dispatch(postOrder(order,navigate))
  }   

  }
  return (
    <>

      {
        JSON.parse(token).token ?

          <div className="container">
            <Navbar1 />
            <div className="row">
              <div className="col">
                <div className="text-left"><button type="button" className="btn btn-warning mt-3 mb-3" onClick={handleClean}>Vaciar Venta</button></div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Img</th>
                      <th>Nombre</th>
                      <th>Ef</th>
                      <th>Deb</th>
                      <th>Cred</th>
                      <th>Cant</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cart.length > 0 ?
                        cart.map((prod: ProductCart) => (
                          <tr >
                            <td><img className="img-fluid" width='30px' height='40px' src={prod.img} /></td>
                            <td>{prod.name}</td>
                            <td>${prod.precio_venta}</td>
                            <td>${prod.precio_D}</td>
                            <td>${prod.precio_C}</td>
                            <td>{prod.cantidad}</td>
                            <td>${prod.precio_venta*prod.cantidad}</td>
                          </tr>
                        ))
                        : <div><strong><p>Carrito vacio</p></strong></div>}
                  </tbody>
                </Table>
                <div className="row mb-2">
                  <div className="col">
                    <h5>Total Efectivo: ${sub}</h5>
                  </div>
                  <div className="col">
                  <h5>Total Debito: ${subDeb}</h5>
                  </div>
                  <div className="col">
                  <h5>Total Credito: ${subCred}</h5>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                    <select name="" id="" onChange={handleChange}>
                    <option>---</option>
                      <option value="efectivo">Efectivo</option>
                      <option value="debito-credito1">Debito-Credito 1 Pago</option>
                      <option value="credito-3">Credito 3 cuotas</option>
                    </select>
                    <div className="text-center">
                        {
                          order.payment === '' ?                       <Button disabled className="mt-3 mb-3 btn btn-warning" variant="primary" type="submit">
                          Submit
                        </Button>
                        :                       <Button className="mt-3 mb-3 btn btn-warning" variant="primary" type="submit">
                        Submit
                      </Button>
                        }
                    </div>
                </Form>
              </div>
              <div className="col mt-3">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Img</th>
                      <th>Nombre</th>
                      <th>Ef</th>
                      <th>Deb</th>
                      <th>Cred</th>
                      <th>Stock</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      list.length > 0 ?
                        list.map((product, index) => (
                          <tr >
                            <td><img className="img-fluid" width='30px' height='40px' src={product.img} /></td>
                            <td>{product.name}</td>
                            <td>{product.precio_venta}</td>
                            <td>{product.precio_D}</td>
                            <td>{product.precio_C}</td>
                            <td>{product.stock}</td>
                            <td><button className="btn btn-warning" onClick={handleAdd} value={product._id}>Add</button></td>
                          </tr>
                        )) : <div><strong><p>Loading...</p></strong></div>}

                  </tbody>
                </Table>
              </div>
            </div>
          </div>

          : natigate('/loggin')
      }
    </>
  )
}