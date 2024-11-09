import { Link, Route, Routes, Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { createChart } from "lightweight-charts";

function Graficos() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [timeRange, setTimeRange] = useState("1M");
  const [currency1, setCurrency1] = useState({
    value: "USD",
    label: "USD",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png",
  });
  const [currency2, setCurrency2] = useState({
    value: "MXN",
    label: "MXN",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg",
  });
  const [rates, setRates] = useState({});
  const [data, setData] = useState([]);
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const areaSeriesRef = useRef(null);
  const [selectIndex,setSelectIndex]=useState(null);
  const [selectedRange, setSelectedRange] = useState("1M");

  // Función que maneja el clic en los botones y establece el rango seleccionado
  
const handleRangeClick = (range) => {
  setSelectedRange(range); // Establece el rango seleccionado
  setTimeRange(range); // Actualiza el rango de tiempo para que el useEffect lo detecte
};

const calculateDateRange = (range) => {
  const endDate = new Date();
  let startDate = new Date();
  switch (range) {
    case "1M":
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case "1Y":
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    case "5Y":
      startDate.setFullYear(endDate.getFullYear() - 5);
      break;
    default:
      startDate = endDate;
  }
  return { startDate, endDate };
};

const handleResize = () => {
  if (chartRef.current) {
    chartRef.current.applyOptions({
       width: chartContainerRef.current.clientWidth
      });
      chartRef.current.timeScale().applyOptions({
        width: chartContainerRef.current.clientWidth,
        barSpacing:80 // este valor le da la separacion inical entre cada punto graficado
       });
  }
};


  // useEffect para inicializar el gráfico
  useEffect(() => {
    if (chartContainerRef.current) {
     
      chartRef.current = createChart(chartContainerRef.current, {
        layout: { textColor: 'black', background: { type: 'solid', color: 'white' } },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        rightPriceScale: {
          visible: true,
          autoScale: true,
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
          autoScale: true,
        },
      });
      areaSeriesRef.current = chartRef.current.addAreaSeries({
        lineColor: "#2962FF",
        topColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0.28)",
      });
      handleResize();
    }
   
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, []);
  

  
  useEffect(() => {
    const { startDate, endDate } = calculateDateRange(selectedRange); // Usa selectedRange en lugar de timeRange
  
    const fetchData = async () => {
      try {
        const formatDate = (date) => date.toISOString().split("T")[0];
        const dates = Array.from({ length: 10 }, (_, i) => {
          const current = new Date(
            startDate.getTime() + ((endDate.getTime() - startDate.getTime()) / 9) * i
          );
          return formatDate(current);
        });
  
        const promises = dates.map((date) =>
          fetch(`https://api.frankfurter.app/${date}?from=${currency1.value}&to=${currency2.value}`)
            .then((res) => res.json())
        );
  
        const results = await Promise.all(promises);
        const newData = results.map((result, i) => ({
          time: new Date(dates[i]).getTime() / 1000,
          value: result.rates[currency2.value],
        }));
  
        newData.sort((a, b) => a.time - b.time);
        setData(newData);
        if (areaSeriesRef.current) {
          areaSeriesRef.current.setData(newData);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
  
    fetchData();
  }, [selectedRange, currency1, currency2]);

  useEffect(() => {
    const url = `https://api.frankfurter.app/latest?from=${currency1.value}&to=${currency2.value}`;

    const fetchRates = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error("Error al obtener las tarifas de cambio:", error);
      }
    };

    fetchRates();
  }, [currency1, currency2]);

  useEffect(() => {
    if (rates[currency2.value]) {
      const rate1to2 = rates[currency2.value];
      const rate2to1 = 1 / rate1to2;
      if (document.activeElement.name === "value1") {
        const convertedValue = (value1 * rate1to2).toFixed(2);
        setValue2(convertedValue);
      } else if (document.activeElement.name === "value2") {
        const convertedValue = (value2 * rate2to1).toFixed(2);
        setValue1(convertedValue);
      }
    }
  }, [value1, value2, currency1, currency2, rates]);

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

  const switchOptions = () => {
    const temporaryCurrency1 = currency1;
    setCurrency1(currency2);
    setCurrency2(temporaryCurrency1);
  };

  const handleCurrency1Change = (selectedOption) => {
    setCurrency1(selectedOption);
  };

  const handleCurrency2Change = (selectedOption) => {
    setCurrency2(selectedOption);
  };

  const handleConversion = (value, setValue, fromCurrency, toCurrency) => {
    if (rates[toCurrency]) {
      const rate = rates[toCurrency];
      const convertedValue = (value * rate).toFixed(2);
      setValue(convertedValue);
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
      <div className="menu-contenedor">
      <div className="range-container" style={{ marginTop: "20px" }}>
      <button
          className="range"
          onClick={() => handleRangeClick("1M")}
          style={{
            backgroundColor: selectedRange === "1M" ? '#e6ecf0' : 'white', // Aplica estilo condicional
            color: selectedRange === "1M" ? 'black' : 'black',
            transition: 'background-color 0.3s ease',
          }}
        >
          1M
        </button>
        <button
          className="range"
          onClick={() => handleRangeClick("1Y")}
          style={{
            backgroundColor: selectedRange === "1Y" ? '#e6ecf0' : 'white', // Aplica estilo condicional
            color: selectedRange === "1Y" ? 'black' : 'black',
            transition: 'background-color 0.3s ease',
          }}
        >
          1Y
        </button>
        <button
          className="range"
          onClick={() => handleRangeClick("5Y")}
          style={{
            backgroundColor: selectedRange === "5Y" ? '#e6ecf0' : 'white', // Aplica estilo condicional
            color: selectedRange === "5Y" ? 'black' : 'black',
            transition: 'background-color 0.3s ease',
          }}
        >
          5Y
        </button>
        </div><br/>
      <div className="bellowRange">
  <div className="select-container">
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
      className="selection2"
    />
    <div className="flechas" onClick={switchOptions}>
    →
    </div>
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
      className="selection2"
    />
  </div><br />
  <div className="canvaContainer">
  <div
  ref={chartContainerRef}
  style={{
    width: "80%",             
    maxWidth: "750px",        
    minWidth: "185px",        
    minHeight: "150px",       
    height: "30vh",           
    display: "block",         
  }}
></div>
</div>
</div>
      </div>
    </div>
  );
}

export default Graficos;
