import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar1 from "./NavBar1";
import { Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { Product, getAllProducts, getProductById } from "../redux/slice/productSlice";
import { ProductCart, addPro, addProduct, cleanCart } from "../redux/slice/cartSlice";
import { getUserById, getUserId } from "../redux/slice/userSlice";

export default function Venta() {
  const natigate = useNavigate()
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.product);
  const { cart } = useAppSelector((state) => state.cart)
  const { user } = useAppSelector((state) => state.user)
  const token: any = localStorage.getItem('token');
  let sub = 0
        cart.map((e) => {
        sub = sub + e.cantidad * e.precio_venta
      })

  const [order, setOrder] = useState({
    _id: '',
    total: 0,
    payment: '',
    productos: []
  })

  useEffect(() => {
    dispatch(getAllProducts(JSON.parse(token)));
    dispatch(getUserById(JSON.parse(token)))
  }, []);

  function handleAdd(e: any) {
    e.preventDefault()
    let id = e.target.value
    const prod: any = list.find((e) => e._id === id)
    let prodCart = { ...prod, cantidad: 1 }
    dispatch(addPro(prodCart))

  }
  function handleClean() {
    dispatch(cleanCart())
  }
  function handleChange(e: any) {
    order.payment = e.target.value
    console.log(order.payment)
    // if (order.payment === 'efectivo') {
    //   console.log('hola')
    //   sub=0
    //   cart.map((e) => {
    //     sub = sub + e.cantidad * e.precio_venta
    //   })
    //   console.log(sub)
    // }
    // if (order.payment === 'debito') {
    //   sub = 0
    //   cart.map((e) => {
    //     sub = sub + e.cantidad * e.precio_venta
        
    //   })
    //   sub = sub * 1.1
    //   console.log(sub)
    // }
    // if (order.payment === 'credito') {
    //   sub = 0
    //   cart.map((e) => {
    //     sub = sub + e.cantidad * e.precio_venta
    //   })
    //   sub = sub * 1.15
    //   console.log(sub)
    // }

  }
  function handleSubmit() {
  }
  return (
    <>

      {
        JSON.parse(token).token ?

          <div className="container">
            <Navbar1 />
            <div className="row">
              <div className="col">
                <div className="text-left"><button type="button" className="btn btn-primary mt-3 mb-3" onClick={handleClean}>Vaciar Venta</button></div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Img</th>
                      <th>Nombre</th>
                      <th>Precio Unitatio</th>
                      <th>Cantidad</th>
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
                            <td>{prod.cantidad}</td>
                            <td>${ order.payment === 'efectivo' ? prod.precio_venta * prod.cantidad : order.payment === 'debito' ?(prod.precio_venta * prod.cantidad)*1.1 : (prod.precio_venta * prod.cantidad)*1.5 }</td>
                          </tr>
                        ))
                        : <p>Carrito Vacio</p>}
                  </tbody>

                </Table>
                <select className="form-select" aria-label="Default select example" onChange={handleChange}>
                  <option selected value="efectivo">Efectivo</option>
                  <option value="debito">Debito</option>
                  <option value="credito">Credito</option>
                </select>
                <div className="row">
                  <h3>Subtotal: ${sub}</h3>
                </div>
                <div className="text-left">
                  <button type="button" className="btn btn-primary mt-3 mb-3" onClick={handleSubmit}>
                    Realizar Venta
                  </button>
                </div>
              </div>
              <div className="col mt-3">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Img</th>
                      <th>Nombre</th>
                      <th>Precio Venta</th>
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
                            <td>{product.stock}</td>
                            <td><button onClick={handleAdd} value={product._id}>Add</button></td>
                          </tr>
                        )) : <p>Loading</p>}

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