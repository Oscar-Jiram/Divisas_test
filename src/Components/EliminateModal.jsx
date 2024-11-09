import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TrashIcon from './TrashCan';
import { IoClose } from 'react-icons/io5'; // Importa el icono de cierre


const EliminateModal = ({id}) => {
    
    const [rates, setRates] = useState({});
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80vw', // Ocupa el 90% del ancho de la pantalla
      maxWidth: 600, // El ancho máximo es de 600px
      minWidth: 300, // Ancho mínimo de 300px para pantallas muy pequeñas
      bgcolor: 'background.paper',
      border: '1px solid #000',
      boxShadow: 24,
      p: 4,
    };

  const salirModal= () => {
    handleClose();
  }


  const eliminateAlarm = async (id) => {
    try {
      const response = await fetch(
        `https://proyectodivisasapi-production.up.railway.app/api/AlertasDivisas/Delete/${id}`,
        {
          method: "DELETE", // Usar el método DELETE
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Datos eliminados correctamente:", result);
        // Actualizar la tabla después de eliminar la fila
        setRates((prevRates) => prevRates.filter((rate) => rate.id !== id));
      } else {
        console.error("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    handleClose();
  };

    return (
    <div>
    <button onClick={handleOpen} className='iconoBasura'>
      <TrashIcon/>
    </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
        <button
    onClick={handleClose}
    style={{
      position: 'absolute',
      top: '-2rem', // Usa rem para un mejor escalado
      right: '-8rem',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      zIndex: 1, // Asegúrate de que esté por encima del contenido
    }}
          >
            <IoClose style={{ fontSize: '24px', color: '#333' }} />
          </button>
          <Typography id="modal-title" variant="h6" component="h2">
            Eliminar alarma
          </Typography>
          <div className='alarm-container'>
         <h2>¿Estas seguro de que deseas eliminar esta alarma?</h2>
        <button
          onClick={() => eliminateAlarm(id)}
          className="buttonAlarm">
          Si
          </button>
          <button
          onClick={() => salirModal()}
          className="buttonAlarm">
          No
          </button>
          </div>
        </Box>
      </Modal>
    </div>
        
    );
}

export default EliminateModal;
