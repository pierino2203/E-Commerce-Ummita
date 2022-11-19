import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import FormRegister from './components/FormRegister'
import ProductDetail from './components/ProductDetail';
import FormLoggin from './components/FormLoggin';
import { PanelUser } from './components/PanelUser';
import { Cart } from './components/Cart';

function App() {
  //  localStorage.setItem('token',JSON.stringify([]))
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
          <Route  path='/home' element={<Home/>}/>
          <Route  path='/register' element={<FormRegister/>}/>
          <Route  path='/home/:id' element={<ProductDetail/>}/>
          <Route path='/loggin' element={<FormLoggin/>}/>
          <Route path='/user' element={<PanelUser/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </Router>  
        
     </div>
    
  );
}

export default App;
