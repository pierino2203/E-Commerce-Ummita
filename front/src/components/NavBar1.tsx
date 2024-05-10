import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAppDispatch } from "../shared/hooks";
import { getProductByName } from "../redux/slice/productSlice";
import { logOut } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar1() {
  const [name, setName] = useState('')
  const dispatch = useAppDispatch();
  const token: any = localStorage.getItem('token');
  const navigate = useNavigate();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }
  function handleLogOut(e: any) {
    dispatch(logOut(navigate))
    localStorage.setItem('token', JSON.stringify([]))
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(getProductByName(name, JSON.parse(token)))
    setName('')
  }
  return (
    <>
      {
        JSON.parse(token).token ?
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
              <Navbar.Brand href="/home"><strong>Ummita en Chala</strong></Navbar.Brand>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <button className="border" onClick={handleLogOut}>Cerrar Sesion</button>
              </Nav>
              <Form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={name}
                  onChange={handleChange}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Container>
          </Navbar>
          : <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
              <Navbar.Brand href="/home">Ummita en Chala</Navbar.Brand>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
              </Nav>
            </Container>
          </Navbar>
      }
    </>
  )
}