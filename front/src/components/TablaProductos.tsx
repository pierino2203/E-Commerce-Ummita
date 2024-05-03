import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllProducts } from "../redux/slice/productSlice";
import Navbar1 from "./NavBar1";
import ModalAgreProd from "./ModalAgreProd";

const TablaProductos = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.product);
  const token: any = localStorage.getItem('token');
  const [modalShow, setModalShow] = useState(false);
  
  useEffect(() => {
    dispatch(getAllProducts(JSON.parse(token)));
  }, []);
  return (
    <div className="container">
      <Navbar1 />
      <div className="d-flex justify-content-evenly">
      <button type="button" className="btn btn-primary mt-3 mb-3" onClick={() => setModalShow(true)}>Agregar producto</button>
      <ModalAgreProd show={modalShow} onHide={() => setModalShow(false)} />
      <NavLink to='/venta'><button type="button" className="btn btn-primary mt-3 mb-3">Realizar Venta</button></NavLink>
      <NavLink to='/venta'><button type="button" className="btn btn-primary mt-3 mb-3">Modificar Producto</button></NavLink>
      </div>
      {
        JSON.parse(token).token ?
          <Row className="justify-content-center">
            <Col xl={10} md={10} xs={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Img</th>
                    <th>Nombre</th>
                    <th>Precio Costo</th>
                    <th>Precio E</th>
                    <th>Precio D</th>
                    <th>Precio C</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    list.length > 0 ?
                      list.map((product, index) => (
                        <tr >
                          <td>{index + 1}</td>
                          <td><img className="img-fluid" width='30px' height='40px' src={product.img} /></td>
                          <td>{product.name}</td>
                          <td>{product.precio_compra}</td>
                          <td>{product.precio_venta}</td>
                          <td>{product.precio_D}</td>
                          <td>{product.precio_C}</td>
                          <td>{product.stock}</td>
                        </tr>
                      )) : <p>Loading</p>}

                </tbody>
              </Table>
            </Col>
          </Row>
          : <NavLink to='/loggin'><p>Inicia Sesion Aqui</p></NavLink>
      }
    </div>
  );
};

export default TablaProductos;
