import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TrashIcon from './TrashCan';

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
        width: 600,
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
  };

    return (
    <div>
    <Button onClick={handleOpen}>
      <TrashIcon/>
    </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
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
