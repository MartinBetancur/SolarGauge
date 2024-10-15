import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const SalesOverviewChart = ({ isConsumption }) => {
  const [salesData, setSalesData] = useState([]); 
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const type = isConsumption ? 'consumption' : 'generation'; // Cambia entre consumo y generación

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/consumption_generation/get-value-by-delta/?user_id=${id}&delta=day&value_type=${type}`);
        const data = response.data;

        const formattedData = data.map(item => ({
          name: formatDate(item.delta),
          sales: item.value  // Asegúrate de que aquí usas el campo correcto, puede ser "value" o "consumption"
        }));

        setSalesData(formattedData); 
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    fetchData();
  }, [id, isConsumption]);  // Agregamos isConsumption como dependencia para actualizar cuando cambie

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

      <div className='h-80'>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
            <XAxis dataKey={"name"} stroke="#9ca3af" />
            <YAxis
              stroke="#9ca3af"
              domain={[0, Math.max(...salesData.map(item => item.sales))]} 
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
              dataKey='sales'
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
