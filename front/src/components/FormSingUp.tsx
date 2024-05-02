import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { User, createUser } from '../redux/slice/userSlice';
import { useAppDispatch } from "../shared/hooks";

export default function FormSignUp() {
  const [input, setInput] = useState<User>({
    _id: '',
    name: '',
    lastName: '',
    password: '',
    mail: '',
    adress: '',
    img: '',
    admin: true
  });

  const dispatch = useAppDispatch();
  console.log(input)
  // Función para manejar cambios en los campos del formulario
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  // Función para manejar el envío del formulario
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Evita que se recargue la página al enviar el formulario
    dispatch(createUser(input)); // Llama a la acción createUser con los datos del usuario
  }

  return (
    <Row className="justify-content-center">
      <Col className="border border-4" xs={12} md={6} xl={4}>
        <h1 className="text-center">CREAR CUENTA</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={input.name}
              onChange={handleChange}
              name="name"
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              value={input.lastName}
              onChange={handleChange}
              name="lastName"
            />
          </Form.Group>
          <Form.Group controlId="mail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={input.mail}
              onChange={handleChange}
              name="mail"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={input.password}
              onChange={handleChange}
              name="password"
            />
          </Form.Group>
          <div className="text-center">
            <Button className="mt-3 mb-3" variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
        <a href="/loggin">regresar</a>
      </Col>
    </Row>
  );
}
