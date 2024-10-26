import React, { useState, useEffect } from "react";

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
  }, []);

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

  const editAlarm = async (iD, currency1, currency2, value1, value2) => {
    if (value2 === "") {
      value2 = 0;
    }
    if (value1 === "") {
      value1 = 0;
    }
    const data = {
      id: iD,
      divisaBase: currency1.label,
      divisaContraparte: currency2.label,
      minimo: value2,
      maximo: value1,
      limiteMinimoAlcanzado: limiteMinimoAlcanzado,
      limiteMaximoAlcanzado: limiteMaximoAlcanzado,
    };

    if (parseFloat(value1) < parseFloat(value2)) {
      console.log("El valor máximo tiene que ser mayor al mínimo.");
    } else {
      try {
        const response = await fetch(
          `https://proyectodivisasapi-production.up.railway.app/api/AlertasDivisas/Update/${iD}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("Datos enviados correctamente:", result);
        } else {
          console.error("Error en la solicitud:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

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
          {rates &&
            rates.map((rate, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{rate.divisaBase}</td>
                <td>{rate.divisaContraparte}</td>
                <td>{rate.minimo}</td>
                <td>{rate.maximo}</td>
                <td>
                  {rate.limiteMinimoAlcanzado || rate.limiteMaximoAlcanzado
                    ? "SI"
                    : "NO"}
                </td>
                <td>
                  <button
                    onClick={() =>
                      editAlarm(rate.id, rate.divisaBase, rate.divisaContraparte, rate.minimo, rate.maximo) }
                    className="edit"
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => eliminateAlarm(rate.id)}
                    className="elim"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;
