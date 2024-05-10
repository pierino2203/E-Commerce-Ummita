import React, { useEffect, useState } from "react";
import Navbar1 from "./NavBar1";
import { Col, Row, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { filterOrder, getOrders, orderFilter } from "../redux/slice/orderSlice";
import { NavLink,useNavigate } from "react-router-dom";
import ModalAgreProd from "./ModalAgreProd";
import ModalOrderProducts from "./ModalOrderProducts";

export default function TablaVentas() {
  const token: any = localStorage.getItem('token');
  const { order } = useAppSelector(state => state.order)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  useEffect(() => {
    if(!JSON.parse(token).token){
      navigate('/loggin')
    }
    dispatch(getOrders(JSON.parse(token)))
  }, [])
  const handleViewOrder = (orderCart: any) => {
    setSelectedOrderId(orderCart); // Almacenar el _id cuando se hace clic en el botón "ver"
  };
  console.log(order)
  function handleFilter(e: any){
    console.log(e.target.value)
    dispatch(orderFilter(e.target.value, token))
  }
  return (
    <div className="container">
      <Navbar1 />
      <div>
      <NavLink to='/venta'><button className="btn btn-warning mt-3 mb-3">Realizar Venta</button></NavLink>
      <div className="mb-3 ">Filtrar:   
                <select onClick={handleFilter} className="m-2" name="" id="">
                  <option value="">----</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="debito-credito1">Debito-Credito1</option>
                  <option value="credito">credito-3 cuotas</option>
                  <option value="total">total</option>
                </select>
</div>
            <Row className="justify-content-center">

              <Col xl={10} md={10} xs={12}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Total</th>
                      <th>Pago</th>
                      <th>Fecha</th>
                      <th>Vendedor</th>
                      <th>Ver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      order.length > 0 ?
                        order.map((order, index) => (
                          <tr >
                            <td>{order._id.slice(-4)}</td>
                            <td>${order.total}</td>
                            <td><strong>{order.payment.toUpperCase()}</strong></td>
                            <td>{new Date(order.date).toLocaleString()}</td>
                            <td><strong>{order.User__[0].name.toUpperCase()}</strong></td>
                            <td><button className="btn btn-warning" onClick={() => handleViewOrder(order.cart)} value={order._id}>ver</button></td>
                          </tr>
                        )) : <p>Loading</p>}
                    <ModalOrderProducts show={selectedOrderId !== null}
                      orderCart={selectedOrderId}
                      onHide={() => setSelectedOrderId(null)} />
                  </tbody>
                </Table>
              </Col>
            </Row>
      </div>
    </div>
  )
}