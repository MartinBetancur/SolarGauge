import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const EnergyPredictionChart = ({ className }) => {
  const [energyData, setEnergyData] = useState(null);

  // Función para obtener la fecha actual en formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
    const day = String(today.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
    return `${year}-${month}-${day}`;
  };

  const fetchEnergyData = async () => {
    const currentDate = getCurrentDate(); // Obtiene la fecha actual
    try {
      const response = await fetch(`http://127.0.0.1:8000/predict_consumption/20815639-1010-4ec8-bd2f-6b33aa3cd1ea/${currentDate}/1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });

      if (!response.ok) throw new Error("Error al obtener datos de la API");

      const data = await response.json();
      console.log(data); // Imprime la respuesta completa en la consola
      setEnergyData(data); // Guarda la respuesta en el estado
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  useEffect(() => {
    fetchEnergyData();
  }, []);

  return (
    <motion.div
      className={`bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-2'>Predicción de Consumo Energética</h2>
      <p className='text-gray-400 mb-4'>Consumo estimado en kWh por día</p>
      
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart 
            data={energyData ? 
              Object.entries(energyData.week_prediction).map(([name, energy]) => ({ name, energy })) 
              : []
            }
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey='name' stroke='#9CA3AF' />
            <YAxis
              stroke='#9CA3AF'
              tickFormatter={(value) => `${value} kWh`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
              formatter={(value) => `${value} kWh`}
            />
            <Legend />
            
            <Line type='monotone' dataKey='energy' stroke='#3B82F6' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EnergyPredictionChart;
