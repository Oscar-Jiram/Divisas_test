import React from 'react';
import { IoClose } from 'react-icons/io5'; // Asegúrate de usar la importación correcta según tu icono

const CloseButton = ({ onClose }) => {
  return (
    <button onClick={onClose} style={styles.button}>
      <IoClose style={styles.icon} />
    </button>
  );
};

const styles = {
  button: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  icon: {
    fontSize: '24px',
    color: '#333',
  },
};

export default CloseButton;
