import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import FormRegister from './components/FormRegister'
import ProductDetail from './components/ProductDetail';

function App() {
  return (
     <div className="App">
      <Router>
        <Routes>
          <Route  path='/home' element={<Home/>}/>
          <Route  path='/register' element={<FormRegister/>}/>
          <Route  path='/home/:id' element={<ProductDetail/>}/>
        </Routes>
      </Router>  
        
     </div>
    
  );
}

export default App;
