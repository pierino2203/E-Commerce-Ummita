import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { formLoggin, logginUser } from "../redux/slice/userSlice";
import { useAppDispatch } from "../shared/hooks";
import { useNavigate } from "react-router-dom";
import Navbar1 from "./NavBar1";

export default function Loggin() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [input,setInput] = useState<formLoggin>({
        mail:'',
        password: ''
    }) 
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita que se recargue la página al enviar el formulario
        if(input.password!='' || input.password!=''){
            dispatch(logginUser(input,navigate));
            navigate('/productos')
        }
        else{
            alert('Ingrese los datos')
        }
        
         // Llama a la acción createUser con los datos del usuario
      }
    return (
        <div className="container">
            <Navbar1/>
            <Row className="justify-content-center mt-3">
                <Col className="border border-4" xs={12} md={6} xl={4}>
                    <Form onSubmit={(e)=> handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='mail' value={input.mail} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' value={input.password} onChange={handleChange} />
                        </Form.Group>
                        <Button className="mb-3" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>

            <p>No esta Registrado?<a href="/registrar">Registrarse</a></p>
        </div>
    )
}