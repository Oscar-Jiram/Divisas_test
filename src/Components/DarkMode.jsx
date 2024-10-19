import React, { useState } from 'react'; 
import { DarkModeSwitch } from 'react-toggle-dark-mode';

function Switch() {
    const [isDarkMode, setDarkMode] = useState(false); 
    const [darkModeState, setDarkModeState] = useState("dark");
    
    const addAttributeId = () => {
        document.body.id = darkModeState;
    };
    
    const addAttributeClass = () => {
        // Obtén el elemento con la clase 'menu'
        const menuElement = document.querySelector('.menu');
        const menuContainerElement = document.querySelector('.menu-contenedor');
        const alarmContainerElement = document.querySelector('.alarm-container');
        const linkElement = document.querySelector('.nav'); // Selecciona el enlace

        if (menuElement) {
            // Cambia la clase según el estado del modo oscuro
            if (isDarkMode) {
                menuElement.classList.add('light-mode');
                menuElement.classList.remove('dark-mode');
                
                // Cambia la clase del enlace si existe
                if (linkElement) {
                    linkElement.classList.add('light-mode');
                    linkElement.classList.remove('dark-mode');
                }

                if (menuContainerElement) {
                    menuContainerElement.classList.add('light-mode');
                    menuContainerElement.classList.remove('dark-mode');
                }
                
                if (alarmContainerElement) {
                    alarmContainerElement.classList.add('light-mode');
                    alarmContainerElement.classList.remove('dark-mode');
                }
            } else {
                menuElement.classList.add('dark-mode');
                menuElement.classList.remove('light-mode');
                
                // Cambia la clase del enlace si existe
                if (linkElement) {
                    linkElement.classList.add('dark-mode');
                    linkElement.classList.remove('light-mode');
                }

                if (menuContainerElement) {
                    menuContainerElement.classList.add('dark-mode');
                    menuContainerElement.classList.remove('light-mode');
                }
                
                if (alarmContainerElement) {
                    alarmContainerElement.classList.add('dark-mode');
                    alarmContainerElement.classList.remove('light-mode');
                }
            }
        }
    };

    const toggleDarkMode = (checked) => { 
        setDarkMode(checked);
        setDarkModeState(checked ? "light" : "dark");
        addAttributeId();
        addAttributeClass();
        
    };

    return (
        <DarkModeSwitch
            style={{ marginBottom: '1rem'}}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={45}
        />
    );
}

export default Switch;
