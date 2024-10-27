import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useParams } from 'react-router-dom';
import axios from 'axios'  // Usaremos axios para la llamada al API

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = ({isConsumption}) => {

  const [categoryData, setCategoryData] = useState([]);
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_CONSUMPTION_GENERATION_SERVICE_URI;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const type = isConsumption ? 'consumption' : 'generation'; // Usar el tipo según el estado

        const response = await axios.get(`${apiUrl}/api/v1/consumption_generation/get-value-by-device/?user_id=${id}&value_type=${type}`);
        
        const formattedData = response.data.map(item => ({
          name: item.name,
          value: parseFloat(item.total_value),  
        }));
        
        setCategoryData(formattedData);
      } catch (error) {
        console.error("Error fetching consumption data", error);
      }
    };

    if (id) {
      fetchData();
    }

  }, [id, isConsumption]);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className='text-lg font-medium mb-4 text-gray-100'>{isConsumption ? 'Consumo' : 'Producción'} total por dispositivo</h2>
      <div className='h-80'>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={categoryData}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value, name, props) => `${value} kWh`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default CategoryDistributionChart;
