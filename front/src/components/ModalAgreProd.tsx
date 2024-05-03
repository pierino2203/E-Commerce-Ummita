import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { postCloudinary } from "../redux/slice/cloudinarySlice";
import { Product, createProduct } from "../redux/slice/productSlice";
import axios from "axios";

export default function ModalAgreProd(props: any) {
  const dispatch = useAppDispatch();
  const { cloudinary } = useAppSelector((state) => state.cloudinary);
  const [input, setInput] = useState<Product>({
    _id: '',
    name: "",
    precio_compra: 0,
    precio_venta: 0,
    precio_D: 0,
    precio_C: 0,
    stock: 0,
    tipo: "",
    img: '',
    on: true,
    description: '',
    category: '',
    CategoryProduct: {}

  });
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file : any= e.target.files?.[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Ummita-control");
    const response = await axios.post("https://api.cloudinary.com/v1_1/dvij9robe/image/upload",data)
    setInput((prevInput) => ({
      ...prevInput,
      img: response.data.secure_url
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
      dispatch(createProduct(input));
      setInput({
        _id: '',
        name: "",
        precio_compra: 0,
        precio_venta: 0,
        precio_D: 0,
        precio_C: 0,
        stock: 0,
        tipo: "",
        img: '',
        on: true,
        description: '',
        category: '',
        CategoryProduct: {}
      })
    props.onHide();
    alert('Producto Agregado')
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group className="mb-3">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              placeholder="nombre"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>Precio costo:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="precio de costo"
                  value={input.precio_compra}
                  name="precio_compra"
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Precio venta:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="precio de venta"
                  value={input.precio_venta}
                  name="precio_venta"
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form.Group>
          <Row>
            <Col>
              <Form.Label>Stock:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Stock"
                value={input.stock}
                name="stock"
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Tipo:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={input.tipo}
                name="tipo"
                onChange={handleChange}
              >
                <option>---</option>
                <option value="ummita">Ummita</option>
                <option value="meraki">Meraki</option>
                <option value="ummita-meraki">Ummita-Meraki</option>
              </Form.Select>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Imagen:</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cerrar
        </Button>
        {
          input.img === '' ? <Button variant="primary" disabled={true}>Agregar</Button>
          :
          <Button variant="primary" onClick={handleSubmit}>
          Agregar
          </Button>
        }

      </Modal.Footer>
    </Modal>
  );
}
