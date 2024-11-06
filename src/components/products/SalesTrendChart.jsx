
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const energyData = [
	{ name: "Lun", energy: 11 },
    { name: "Mar", energy: 22.5 },
    { name: "Mie", energy: 24 },
    { name: "Jue", energy: 8 },
    { name: "Vie", energy: 16.8 },
	{ name: "Sab", energy: 25 },
	{ name: "Dom", energy: 14.5 },
];


const EnergyPredictionChart = ({ className }) => {
  return (
    <motion.div
      className={`bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className='text-xl font-semibold text-gray-100 mb-2'>Predicción de Consumo Energética</h2>
      <p className='text-gray-400 mb-4'>Generación estimada en kWh por día</p>
      
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={energyData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey='name' stroke='#9CA3AF' />
            <YAxis
              stroke='#9CA3AF'
              tickFormatter={(value) => `${value} kWh`}
              domain={[5, 25]}
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
/*
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const EnergyPredictionChart = ({ className }) => {
  // Estado para almacenar los datos de energía
  const [energyData, setEnergyData] = useState([]);

  // Función para hacer la solicitud POST a la API
  const fetchEnergyData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/predict_consumption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": "http://localhost:3000",
        },
        body: JSON.stringify({
          user_id: "20815639-1010-4ec8-bd2f-6b33aa3cd1ea",
          date: "2024-10-05",
        }),
      });

      if (!response.ok) {
        throw new Error("Error al obtener datos de la API");
      }

      const data = await response.json();
      // Tomar el valor de 'predicted_consumption' y repetirlo 7 veces
      const energyValue = data.predicted_consumption;

      // Crear un arreglo con el valor para cada día de la semana
      const newEnergyData = [
        { name: "Lun", energy: energyValue },
        { name: "Mar", energy: energyValue },
        { name: "Mie", energy: energyValue },
        { name: "Jue", energy: energyValue },
        { name: "Vie", energy: energyValue },
        { name: "Sab", energy: energyValue },
        { name: "Dom", energy: energyValue },
      ];

      setEnergyData(newEnergyData);
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  // Llamar a la función de fetch cuando el componente se monta
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
      <h2 className="text-xl font-semibold text-gray-100 mb-2">Predicción de Consumo Energético</h2>
      <p className="text-gray-400 mb-4">Generación estimada en kWh por día</p>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis
              stroke="#9CA3AF"
              tickFormatter={(value) => `${value} kWh`}
              domain={[5, 25]}
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
            <Line type="monotone" dataKey="energy" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EnergyPredictionChart;


*/


