import './App.css';
import React, { useState } from "react";

function App() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [currency1, setCurrency1] = useState("Dollar");
  const [currency2, setCurrency2] = useState("Euro");

  const array = [
    { moneda: "Dollar", cambio: 1 },
    { moneda: "Euro", cambio: 0.92 },
    { moneda: "MexPes", cambio: 18.66 },
    { moneda: "Soles", cambio: 3.74 },
    { moneda: "Pounds", cambio: 0.78 }
  ];

  const findCambio = (moneda) => {
    const found = array.find(item => item.moneda === moneda);
    return found ? found.cambio : 1;
  };

  const handleCurrency1Change = (e) => {
    const newCurrency1 = e.target.value;
    setCurrency1(newCurrency1);
    handleConversion(newCurrency1, currency2, value1, setValue2);
  };

  const handleCurrency2Change = (e) => {
    const newCurrency2 = e.target.value;
    setCurrency2(newCurrency2);
    handleConversion(currency1, newCurrency2, value2, setValue1);
  };

  const handleValue1Change = (e) => {
    const value = e.target.value;
    setValue1(value);
    handleConversion(currency1, currency2, value, setValue2);
  };

  const handleValue2Change = (e) => {
    const value = e.target.value;
    setValue2(value);
    handleConversion(currency2, currency1, value, setValue1);
  };

  const handleConversion = (from, to, value, setValue) => {
    const fromCambio = findCambio(from);
    const toCambio = findCambio(to);
    const convertedValue = (value * toCambio / fromCambio).toFixed(2);
    setValue(convertedValue);
  };

  const imprimir = () => {
    window.print();
  };

  return (
    <div>
      <h1>Divisa calculator</h1>
      <div className='contenedor'>
        <select className='selection' value={currency1} onChange={handleCurrency1Change}>
          {array.map((item, index) => (
            <option value={item.moneda} key={index}>{item.moneda}</option>
          ))}
        </select>
        <input type="Number" value={value1} onChange={handleValue1Change} /><br />
        <div className='flechas'>↑ ↓</div>
        <select className='selection' value={currency2} onChange={handleCurrency2Change}>
          {array.map((item, index) => (
            <option value={item.moneda} key={index}>{item.moneda}</option>
          ))}
        </select>
        <input type="Number" value={value2} onChange={handleValue2Change} /><br />
        <button onClick={imprimir}>Print</button>
      </div>
    </div>
  );
}

export default App;

