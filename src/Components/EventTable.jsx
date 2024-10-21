import React, { useState, useEffect } from "react";

function EventTable() {
  const [rates, setRates] = useState([]); // Inicializa el estado como un arreglo vacío

  useEffect(() => {
    const url = `https://proyectodivisasapi-production.up.railway.app/api/AlertasDivisas/ReadAll`;

    const fetchRates = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRates(data.data); // Establece los datos en el estado rates
      } catch (error) {
        console.error('Error al obtener las tarifas de cambio:', error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead className="table-head">
          <tr>
            <th>Id</th>
            <th>Divisa base</th>
            <th>Divisa comparada</th>
            <th>Valor mínimo</th>
            <th>Valor máximo</th>
            <th>Alerta activa</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {rates && rates.map((rate, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{rate.divisaBase}</td>
              <td>{rate.divisaContraparte}</td>
              <td>{rate.minimo}</td>
              <td>{rate.maximo}</td>
              <td>{rate.limiteMinimoAlcanzado || rate.limiteMaximoAlcanzado ? 'SI' : 'NO'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Crear nueva alarma</h3>
      <form className="create">
      <input 
      type="text"
      label="Divisa base"
      required="required"
      placeholder="USD"
      />
      <input 
      type="text"
      name="Divisa comparada"
      required="required"
      placeholder="MXN"
      />
      <input 
      type="number"
      name="Valor mínimo"
      required="required"
      placeholder="16.33"
      />
      <input 
      type="number"
      name="Valor máximo"
      required="required"
      placeholder="20.00"
      />
      <button>Crear alarma</button>
      </form>
    </div>
  );
}

export default EventTable;
