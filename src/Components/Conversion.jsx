import {Link,Route ,Routes,Navigate } from "react-router-dom";
import ReactDOM from "react-dom"
import React, { useState, useEffect } from "react";
import Select from "react-select";

function Conversion() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [currency1, setCurrency1] = useState({ value: "USD", label: "United States Dollar",image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png' });
  const [currency2, setCurrency2] = useState({ value: "MXN", label: "Mexican Peso",image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg' });
  const [rates, setRates] = useState({});

  useEffect(() => {
   
    const url = `https://api.frankfurter.app/latest?from=${currency1.value}&to=${currency2.value}`;
    
    const fetchRates = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error('Error al obtener las tarifas de cambio:', error);
      }
    };

    fetchRates();
  }, [currency1, currency2]);

  useEffect(() => {
    if (rates[currency2.value]) {
      const rate1to2 = rates[currency2.value];
      const rate2to1 = 1 / rate1to2;
      if (document.activeElement.name === 'value1') {
        const convertedValue = (value1 * rate1to2).toFixed(2);
        setValue2(convertedValue);
      } else if (document.activeElement.name === 'value2') {
        const convertedValue = (value2 * rate2to1).toFixed(2);
        setValue1(convertedValue);
      }
    }
  }, [value1, value2, currency1, currency2, rates]);

  const options = [
    { value: 'AUD', label: 'Australian Dollar', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg' },
    { value: 'BGN', label: 'Bulgarian Lev', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg' },
    { value: 'BRL', label: 'Brazilian Real', image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg' },
    { value: 'CAD', label: 'Canadian Dollar', image: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg' },
    { value: 'CHF', label: 'Swiss Franc', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg' },
    { value: 'CNY', label: 'Chinese Yuan', image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" },
    { value: 'CZK', label: 'Czech Koruna', image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg' },
    { value: 'USD', label: 'United States Dollar', image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png' },
    { value: 'DKK', label: 'Danish Krone', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg' },
    { value: 'EUR', label: 'Euro', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg' },
    { value: 'GBP', label: 'British Pound', image: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg' },
    { value: 'HUF', label: 'Hungarian Forint', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg' },
    { value: 'IDR', label: 'Indonesian Rupiah', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg' },
    { value: 'ILS', label: 'Israeli Shekel', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg' },
    { value: 'INR', label: 'Indian Rupee', image: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg' },
    { value: 'ISK', label: 'Icelandic Króna', image: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg' },
    { value: 'JPY', label: 'Japanese Yen', image: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg' },
    { value: 'KRW', label: 'South Korean Won', image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg' },
    { value: 'MXN', label: 'Mexican Peso', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg' },
    { value: 'MYR', label: 'Malaysian Ringgit', image: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg' },
    { value: 'NOK', label: 'Norwegian Krone', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg' },
    { value: 'NZD', label: 'New Zealand Dollar', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg' },
    { value: 'PHP', label: 'Philippine Peso', image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg' },
    { value: 'PLN', label: 'Polish Zloty', image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg' },
    { value: 'RON', label: 'Romanian Leu', image: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg' },
    { value: 'SEK', label: 'Swedish Krona', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg' },
    { value: 'SGD', label: 'Singapore Dollar', image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg' },
    { value: 'THB', label: 'Thai Baht', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg' },
    { value: 'TRY', label: 'Turkish Lira', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg' },
    { value: 'ZAR', label: 'South African Rand', image: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg' },
  ];

  const deleteContent = (e) => {
    e.target.value = "";
  };

  const handleCurrency1Change = (selectedOption) => {
    setCurrency1(selectedOption);
  };

  const handleCurrency2Change = (selectedOption) => {
    setCurrency2(selectedOption);
  };

  const handleValue1Change = (e) => {
    const value = e.target.value;
    setValue1(value);
    handleConversion(value, setValue2, currency1.value, currency2.value);
  };

  const handleValue2Change = (e) => {
    const value = e.target.value;
    setValue2(value);
    handleConversion(value, setValue1, currency2.value, currency1.value);
  };

  const handleConversion = (value, setValue, fromCurrency, toCurrency) => {
    if (rates[toCurrency]) {
      const rate = rates[toCurrency];
      const convertedValue = (value * rate).toFixed(2);
      setValue(convertedValue);
    }
  };

  const imprimir = () => {
    console.log("currency1:", currency1);
    console.log("currency2:", currency2);
    console.log("rates:", rates);
  };

  return (
    <div>
      
        <div className="menu-contenedor">
          <Select
            value={currency1}
            onChange={handleCurrency1Change}
            options={options}
            formatOptionLabel={({ label, image }) => (
              <div style={{ display: "block", color: "black", alignItems: "center" }}>
                <img src={image} alt={label} style={{ width: 30, height: 22, marginRight: 10 }} />
                <span>{label}</span>
              </div>
            )}
            className="selection"
          />
          <input
            onClick={deleteContent}
            name="value1"
            type="number"
            value={value1 !== "" ? value1 : ""}
            onChange={handleValue1Change}
          />
          <br />
          <div className="flechas">↑ ↓</div>
          <Select
            value={currency2}
            onChange={handleCurrency2Change}
            options={options}
            formatOptionLabel={({ label, image }) => (
              <div style={{ display: "block", color: "black", alignItems: "center" }}>
                <img src={image} alt={label} style={{ width: 30, height: 22, marginRight: 10 }} />
                <span>{label}</span>
              </div>
            )}
            className="selection"
          />
          <input
            onClick={deleteContent}
            name="value2"
            type="number"
            value={value2 !== "" ? value2 : ""}
            onChange={handleValue2Change}
          />
          <button onClick={imprimir}>Print</button>
        </div>
      </div>
    
  );
}

export default Conversion
