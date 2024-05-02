import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { getAllUsers } from "../redux/slice/userSlice";
import { NavLink, useNavigate } from "react-router-dom";

const TablaUsers = () => {
    const dispatch = useAppDispatch();
    const { user, loading } = useAppSelector((state) => state.user);
    const token: any = localStorage.getItem('token');
    const navigate = useNavigate();

    setTimeout(() => {
        console.log("Retrasado por 1 segundo.");
    }, 1000);
    useEffect(() => {
        // Llama a getAllUsers para obtener la lista de usuarios al montar el componente
        dispatch(getAllUsers(JSON.parse(token)));
    }, []); // dispatch es una dependencia para asegurar que se actualice si cambia

    // Renderiza condicionalmente según el estado de carga y error
    return (
        <div>
            {
                JSON.parse(token).token ?
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.length>0 ?
                                    user.map((user, index) => (
                                        <tr >
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.mail}</td>
                                        </tr>
                                    )) : <p>Loading</p>}

                        </tbody>
                    </Table>
                    : <NavLink to='/loggin'><p>Inicia Sesion Aqui</p></NavLink>
            }
        </div>
    );
};

export default TablaUsers;
