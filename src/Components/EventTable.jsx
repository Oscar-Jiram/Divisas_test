import React, { useState, useEffect } from "react";
import EditModal from './EditModal.jsx';
import EliminateModal from "./EliminateModal.jsx";


function EventTable() {
  const [rates, setRates] = useState([]); // Inicializa el estado como un arreglo vacío
  const [limiteMinimoAlcanzado, setLimiteMinimoAlcanzado] = useState(false); // Estado para el límite mínimo alcanzado
  const [limiteMaximoAlcanzado, setLimiteMaximoAlcanzado] = useState(false); // Estado para el límite máximo alcanzado

  useEffect(() => {
    const url = `https://proyectodivisasapi-production.up.railway.app/api/AlertasDivisas/ReadAll`;

    const fetchRates = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRates(data.data); // Establece los datos en el estado rates
      } catch (error) {
        console.error("Error al obtener las tarifas de cambio:", error);
      }
    };

    fetchRates();
  }, [rates]);


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
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {rates &&
            rates.map((rate, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{rate.divisaBase}</td>
                <td>{rate.divisaContraparte}</td>
                <td>{rate.minimo}</td>
                <td>{rate.maximo}</td>
                <td>
                  {rate.limiteMinimoAlcanzado || rate.limiteMaximoAlcanzado
                    ? "SI"
                    : "NO"}
                </td>
                <td><EditModal id={rate.id}/></td>
                <td><EliminateModal id={rate.id}/></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;
