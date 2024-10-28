import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Función para formatear la fecha según el intervalo de tiempo
const formatDate = (dateString, timeDelta) => {
  const date = new Date(dateString);
  
  // Verifica si la fecha es válida
  if (isNaN(date.getTime())) {
    console.error(`Fecha no válida: ${dateString}`);
    return ''; // Retorna cadena vacía si la fecha no es válida
  }
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  // Retornar el formato de fecha basado en timeDelta
  switch (timeDelta) {
    case 'day':
      return `${day}/${month}/${year}`; // Formato: dd/MM/yyyy
    case 'month':
      return `${month}/${year}`; // Formato: MM/yyyy
    case 'year':
      return `${year}`; // Formato: yyyy
    default:
      return ''; // Retornar cadena vacía si no se reconoce el timeDelta
  }
};

const SalesOverviewChart = ({ isConsumption }) => {
  const [salesData, setSalesData] = useState([]);
  const [timeDelta, setTimeDelta] = useState('day'); // Estado para controlar el intervalo de tiempo
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_CONSUMPTION_GENERATION_SERVICE_URI;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const type = isConsumption ? 'consumption' : 'generation'; // Cambia entre consumo y generación

        // Usar el intervalo de tiempo seleccionado en la URL de la API
        const response = await axios.get(`${apiUrl}/api/v1/consumption_generation/get-value-by-delta/?user_id=${id}&delta=${timeDelta}&value_type=${type}`);
        const data = response.data;

        const formattedData = data.map(item => ({
          name: formatDate(item.delta, timeDelta), // Pasar timeDelta a formatDate
          kWh: item.value // Asegúrate de que aquí usas el campo correcto, puede ser "value" o "consumption"
        }));

        setSalesData(formattedData);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    fetchData();
  }, [id, isConsumption, timeDelta]); // Dependencia añadida para actualizar cuando cambie el intervalo de tiempo

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className='text-lg font-medium mb-4 text-gray-100'>
        {isConsumption ? 'Consumo' : 'Producción'} energético en el tiempo
      </h2>

      {/* Selector de intervalo de tiempo */}
      <div className="mb-4">
        <button 
          className={`px-4 py-2 rounded-l ${timeDelta === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`} 
          onClick={() => setTimeDelta('day')}
        >
          Día
        </button>
        <button 
          className={`px-4 py-2 ${timeDelta === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`} 
          onClick={() => setTimeDelta('month')}
        >
          Mes
        </button>
        <button 
          className={`px-4 py-2 rounded-r ${timeDelta === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`} 
          onClick={() => setTimeDelta('year')}
        >
          Año
        </button>
      </div>

      <div className='h-80'>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
            <XAxis dataKey={"name"} stroke="#9ca3af" />
            <YAxis
              stroke="#9ca3af"
              domain={[0, Math.ceil(Math.max(...salesData.map(item => item.kWh)) / 10) * 10]} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type='monotone'
              dataKey='kWh'
              stroke='#6366F1'
              strokeWidth={3}
              dot={{ fill: '#6366F1', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
