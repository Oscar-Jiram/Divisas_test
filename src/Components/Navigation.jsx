import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <div className='nav'>
      <NavLink 
       className={({isActive})=>(isActive ? "active"
        : null)} to="/">Conversiones</NavLink>  
      <NavLink className={({isActive})=>(isActive ? "active"
        : null)}to="/graficos">Graficos</NavLink>
      <NavLink className={({isActive})=>(isActive ? "active"
        : null)} to="/alertas">Alertas</NavLink>    
    </div>
  )
}

export default Navigation
