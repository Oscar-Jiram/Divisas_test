
import './App.css';
import {BrowserRouter,Route ,Routes,Navigate } from "react-router-dom";
import ReactDOM from "react-dom"
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Conversion from "./Components/Conversion.jsx"
import Graficos from "./Components/Graficos.jsx"
import Alertas from "./Components/Alertas.jsx"
import Error from  "./Components/Error.jsx"
import Navegation from "./Components/Navigation.jsx"
import Notifications from './Components/Notificaciones.jsx';

function App() {
  
  return (
    <div><br/>
    
      <div className="contenedor">
        <div className="menu">
      <Notifications/>
        <BrowserRouter>
      <Navegation/>
        <Routes>
        <Route path="/" element ={<Conversion/>} />
        <Route path="/graficos" element ={<Graficos/>} />
        <Route path="/alertas" element ={<Alertas/>} />
        <Route path="/conversion" element ={<Navigate to="/"/>} />
        <Route path="/Divisas_test" element ={<Navigate to="/"/>} />
        <Route path="*" element ={<Error/>} />
        </Routes>
      </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;