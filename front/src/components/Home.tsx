import React, { useEffect } from "react";
import Navbar1 from "./NavBar1";
import { NavLink, useNavigate } from "react-router-dom";

export default function Home() {
  const token: any = localStorage.getItem('token');
  const navigate = useNavigate()
  useEffect(()=>{
    if(!JSON.parse(token).token){
      navigate('/loggin')
    }
  })
  return (
    <div className="container">
      <div className="row mb-5">
      <Navbar1 />
      </div>

                <div className="row mt-5 border d-flex justify-content-evenly bg-body-tertiary">
                <div className="col-6 p-5 border">
                  <img src='https://res.cloudinary.com/dvij9robe/image/upload/v1715047491/Control-Negocio/468BAA57-6A3F-4A7D-B3C9-6808DD9928D1_srbtda.png' alt="" width='450px' height='450px'/>
                </div>
                <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                  <div className="row">
                    <NavLink to='/productos'><button type="button" className="btn btn-warning mt-3 mb-3">Productos</button></NavLink>
                  </div>
                  <div className="row">
                    <NavLink to='/caja'><button type="button" className="btn btn-warning mt-3 mb-3">Ventas</button></NavLink>
                  </div>
                  <div className="row">
                    <NavLink to='/productos'><button type="button" className="btn btn-warning mt-3 mb-3">Caja</button></NavLink>
                  </div>
                </div>
              </div>

    </div>
  )
}