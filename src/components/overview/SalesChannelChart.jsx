import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { useParams } from 'react-router-dom';

const SalesChannelChart = ({ type, isConsumption }) => {
  const [data, setData] = useState([]);
  const [averageValue, setAverageValue] = useState(0);
  const [timeDelta, setTimeDelta] = useState('day');
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_CONSUMPTION_GENERATION_SERVICE_URI;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const type = isConsumption ? 'consumption' : 'generation';

        const response = await fetch(`${apiUrl}/api/v1/consumption_generation/get-value-by-delta/?user_id=${id}&delta=${timeDelta}&value_type=${type}`);
        const result = await response.json();

        const processedData = result.map(entry => ({
          delta: new Date(entry.delta).toLocaleDateString(),
          value: parseFloat(entry.value),
        }));

        setData(processedData);

        const averageResponse = await fetch(`${apiUrl}/api/v1/consumption_generation/get-average-delta-value/?user_id=${id}&delta=day&value_type=${type}`);
        const averageResult = await averageResponse.json();

        setAverageValue(parseFloat(averageResult.average_value).toFixed(2));

      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [apiUrl, id, timeDelta, type, isConsumption]);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className='text-lg font-medium mb-4 text-gray-100'>{isConsumption ? "Consumo" : "Producción"}</h2>

      <div className='h-80'>
        <ResponsiveContainer>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="delta" name="Fecha" stroke="#9CA3AF" />
            <YAxis dataKey="value" name="Valor" stroke="#9CA3AF" />
            <Tooltip
              formatter={(value) => value}
              labelFormatter={(label) => `Fecha: ${label}`}
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            
            <ReferenceLine 
            y={parseFloat(averageValue)} 
            stroke="#F59E0B" 
            strokeWidth={2} 
            label={{ value: `Promedio: ${averageValue}`, position: 'top', fill: '#F59E0B' }} 
            />

            <Scatter name="Generación/Consumo" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesChannelChart;
