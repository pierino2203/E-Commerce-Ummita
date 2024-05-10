import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormSignUp from './components/FormSingUp';
import Loggin from './components/Loogin';
import TablaProductos from './components/TablaProductos';
import Venta from './components/Venta';
import Home from './components/Home';
import TablaVentas from './components/TablaVentas';

function App() {
  const token = JSON.parse(localStorage.getItem('token')!)
  const carrito = JSON.parse(localStorage.getItem('carrito')!)

  useEffect(()=>  {
    if(!token){
      localStorage.setItem('token',JSON.stringify([]))
      
    }
    if(!carrito){
      localStorage.setItem('carrito',JSON.stringify([]))
    }
  },[token,carrito])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/registrar' element={<FormSignUp/>}/>
          <Route path='/loggin' element={<Loggin/>}/>   
          <Route path='/productos' element={<TablaProductos/>}/>   
          <Route path='/venta' element={<Venta/>}/>    
          <Route path='/home' element={<Home/>}/> 
          <Route path='/caja' element={<TablaVentas/>}/>     
        </Routes>
      </Router>
    </div>
  );
}

export default App;
