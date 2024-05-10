import React from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { ProductCart } from "../redux/slice/cartSlice";

export default function ModalOrderProducts(props: any) {
  console.log(props)
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Productos en la Venta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          {/* <>
                    <Row className="mb-3">
                                    <Col xl={2}>
                                        <p>Img</p>
                                    </Col>
                                    <Col xl={6}>
                                    <p>Nombre</p>
                                    </Col>
                                    <Col xl={2}>
                                    <p>Cantidad</p>
                                    </Col>
                                    <Col xl={2}>
                                    <p>Precio</p>
                                    </Col>
                                </Row>
                    </>
                    {
                        props.orderCart?.map((e: ProductCart) => {
                            return (
                                <Row className="mb-3">
                                    <Col xl={2}>
                                        <img className="img-fluid" src={e.img} width='30px' height='40px'/>
                                    </Col>
                                    <Col xl={6}>
                                    <p>{e.name}</p>
                                    </Col>
                                    <Col xl={2}>
                                    <p>x{e.cantidad}</p>
                                    </Col>
                                    <Col xl={2}>
                                    <p>${e.precio_venta}</p>
                                    </Col>
                                </Row>
                            )
                        })
                    } */}
          <Row className="justify-content-center">
            <Col xl={10} md={10} xs={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Img</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    props.orderCart?.length > 0 ?
                    props.orderCart.map((e: any) => (
                      <tr>
                        <td><img className="img-fluid" src={e.img} width='30px' height='40px' /></td>
                        <td>{e.name}</td>
                        <td>{e.tipo}</td>
                        <td>x {e.cantidad}</td>
                        <td>${e.precio_venta * e.cantidad}</td>
                      </tr>
                    ))
                    : <p>Loading</p>}
                </tbody> 
              </Table>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
