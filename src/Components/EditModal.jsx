import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Select from "react-select";
import { useState, useEffect } from "react";

function EditModal() {
  const [open, setOpen] = useState(false);
  const [valorActual, setValorActual] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [currency1, setCurrency1] = useState({ value: "USD", label: "USD", image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png' });
  const [currency2, setCurrency2] = useState({ value: "MXN", label: "MXN", image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg' });
  const [rates, setRates] = useState({});
  const [ratesA, setRatesA] = useState({});
  const [limiteMinimoAlcanzado, setLimiteMinimoAlcanzado] = useState(false);
  const [limiteMaximoAlcanzado, setLimiteMaximoAlcanzado] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  
const options = [
    { value: 'AUD', label: 'AUD', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg' },
    { value: 'BGN', label: 'BGN', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg' },
    { value: 'BRL', label: 'BRL', image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg' },
    { value: 'CAD', label: 'CAD', image: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg' },
    { value: 'CHF', label: 'CHF', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg' },
    { value: 'CNY', label: 'CNY', image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" },
    { value: 'CZK', label: 'CZK', image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg' },
    { value: 'USD', label: 'USD', image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png' },
    { value: 'DKK', label: 'DKK', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg' },
    { value: 'EUR', label: 'EUR', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg' },
    { value: 'GBP', label: 'GBP', image: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg' },
    { value: 'HUF', label: 'HUF', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg' },
    { value: 'IDR', label: 'IDR', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg' },
    { value: 'ILS', label: 'ILS', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg' },
    { value: 'INR', label: 'INR', image: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg' },
    { value: 'ISK', label: 'ISK', image: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg' },
    { value: 'JPY', label: 'JPY', image: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg' },
    { value: 'KRW', label: 'KRW', image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg' },
    { value: 'MXN', label: 'MXN', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg' },
    { value: 'MYR', label: 'MYR', image: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg' },
    { value: 'NOK', label: 'NOK', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg' },
    { value: 'NZD', label: 'NZD', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg' },
    { value: 'PHP', label: 'PHP', image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg' },
    { value: 'PLN', label: 'PLN', image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg' },
    { value: 'RON', label: 'RON', image: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg' },
    { value: 'SEK', label: 'SEK', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg' },
    { value: 'SGD', label: 'SGD', image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg' },
    { value: 'THB', label: 'THB', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg' },
    { value: 'TRY', label: 'TRY', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg' },
    { value: 'ZAR', label: 'ZAR', image: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg' },
  ];

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

  useEffect(() => {
    const urla = `https://proyectodivisasapi-production.up.railway.app/api/AlertasDivisas/ReadAll`;

    const arrayResponse = async () => {
      try {
        const responseA = await fetch(urla);
        const dataA = await responseA.json();
        setRatesA(dataA.data);
      } catch (error) {
        console.error('Error al obtener las tarifas de cambio:', error);
      }
    };

    arrayResponse();
  }, []);

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
    if (ratesA[toCurrency]) {
      const rate = ratesA[toCurrency];
      const convertedValue = (value * rate).toFixed(2);
      setValue(convertedValue);
    }
  };

 
  const createAlarm = async (currency1, currency2,value1,value2) => {
    if (value2 == "") { value2 = 0;
    }
    if (value1 == "") { value1 = 0;
    }
    const data = {
      id: "",
      divisaBase: currency1.label,
      divisaContraparte: currency2.label,
      minimo: value2, 
      maximo: value1,
      valorActual: parseFloat(rates[currency2.value]),
      limiteMinimoAlcanzado: limiteMinimoAlcanzado,
      limiteMaximoAlcanzado: limiteMaximoAlcanzado
    };

    if (parseFloat(value1) < parseFloat(value2)) {
      console.log("El valor máximo tiene que ser mayor al mínimo.");
    } else {
      try {
        const response = await fetch('https://proyectodivisasapi-production.up.railway.app/api/AlertasDivisas/Create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Datos enviados correctamente:', result);
        } else {
          console.error('Error en la solicitud:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
  }
};

  const handleMaxValue = (e) => {
    const valorMax = parseFloat(e.target.value)
    setValue1(valorMax);
    if (rates[currency2.value] >= valorMax) {
      setLimiteMaximoAlcanzado(true)
    }
  };

  const handleMinValue = (e) => {
    const valorMin = parseFloat(e.target.value);
    setValue2(valorMin);
    if (rates[currency2.value] <= valorMin) {
      setLimiteMinimoAlcanzado(true)
    }
  };

  const filteredOptionsForCurrency1 = options.filter(
    (option) => option.value !== (currency2 ? currency2.value : null)
  );

  const filteredOptionsForCurrency2 = options.filter(
    (option) => option.value !== (currency1 ? currency1.value : null)
  );

  return (
    <div>
      <Button onClick={handleOpen}>Crear alarma</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Crear alarma
          </Typography>
          <div className='alarm-container'>
          <Select
          isSearchable={false}
          value={currency1}
          onChange={handleCurrency1Change}
          options={filteredOptionsForCurrency1}
          formatOptionLabel={({ label, image }) => (
            <div style={{ display: "block", color: "black", alignItems: "center" }}>
              <img src={image} alt={label} style={{ width: 30, height: 22, marginRight: 10 }} />
              <span>{label}</span>
            </div>
          )}
          className="selection3"
        />
        <Select
          isSearchable={false}
          value={currency2}
          onChange={handleCurrency2Change}
          options={filteredOptionsForCurrency2}
          formatOptionLabel={({ label, image }) => (
            <div style={{ display: "block", color: "black", alignItems: "center" }}>
              <img src={image} alt={label} style={{ width: 30, height: 22, marginRight: 10 }} />
              <span>{label}</span>
            </div>
          )}
          className="selection3"
        />
        Max value
        <input
        value={value1}
          placeholder="Insert max value"
          onClick={deleteContent}
          type="number"
          onChange={handleMaxValue}
          className="alarmInput"
        /><br/>
        Min value
        <input
        value={value2}
          placeholder="Insert min value"
          onClick={deleteContent}
          type="number"
          onChange={handleMinValue}
          className="alarmInput"
        />
        <button
          onClick={() => createAlarm(currency1, currency2, value1, value2)} 
          className="buttonAlarm">
          Editar Alarma
        </button>
          </div>
        </Box>
      </Modal>
    </div>
  );


export default EditModal;

