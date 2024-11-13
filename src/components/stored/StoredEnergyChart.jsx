import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import React, { useState, useEffect } from "react";

const StoredEnergyChart = () => {
  const [energyData, setEnergyData] = useState([]);
  const [currentStatus, setCurrentStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyResponse = await fetch("http://127.0.0.1:8000/battery/history?delta=1d");
        const historyData = await historyResponse.json();
        setEnergyData(historyData);

        const currentResponse = await fetch("http://127.0.0.1:8000/battery/current");
        const currentData = await currentResponse.json();
        setCurrentStatus(currentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8">
      {/* Cuadros de información en la parte superior */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Battery Level (%)</h3>
          <p className="text-2xl font-semibold text-gray-100">{currentStatus.battery_level ?? "Loading..."}%</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Energy Available (kW)</h3>
          <p className="text-2xl font-semibold text-gray-100">{currentStatus.energy_available_kW ?? "Loading..."} kW</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-400">Battery Capacity (kW)</h3>
          <p className="text-2xl font-semibold text-gray-100">{currentStatus.battery_capacity_kW ?? "Loading..."} kW</p>
        </div>
      </div>

      {/* Gráfico de energía almacenada */}
      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="timestamp" stroke="#9CA3AF" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
              itemStyle={{ color: "#E5E7EB" }}
              labelFormatter={(label) => `Time: ${new Date(label).toLocaleTimeString()}`}
            />
            <Area type="monotone" dataKey="energy_available_kW" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default StoredEnergyChart;
