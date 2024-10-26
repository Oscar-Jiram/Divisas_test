
import ReactDOM from "react-dom"
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Notifications from "./Notificaciones";
import CreateModal from "./CrearModal";
import EventTable from "./EventTable";


function Alertas() {


  return (
    <div className='menu-contenedor'>
      Tus alarmas activas
      <div className='alarm-container'><br />
        <EventTable/>
        <CreateModal/>
      </div>
    </div>
  );
};


export default Alertas;