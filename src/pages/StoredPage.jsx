import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "../components/common/StatCard";
import { BatteryCharging, Zap, TrendingUp } from "lucide-react";

const timeRanges = [
  { label: "1 Hour", value: "1h" },
  { label: "12 Hours", value: "12h" },
  { label: "1 Day", value: "1d" },
  { label: "3 Days", value: "3d" },
  { label: "1 Week", value: "7d" },
];

const StoredPage = () => {
  const [data, setData] = useState([]);
  const [currentStats, setCurrentStats] = useState({
    batteryLevel: null,
    batteryCapacity_kW: null,
    energyAvailable_kW: null,
  });
  const [selectedTimeRange, setSelectedTimeRange] = useState("1d");
  const [displayInPercentage, setDisplayInPercentage] = useState(true);
  const apiUrl = import.meta.env.VITE_BATTERY_SERIVCE_URI;



  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`${apiUrl}/battery/load`, {method: "POST"});
        const response = await fetch(`${apiUrl}/battery/history?delta=${selectedTimeRange}`);
        const result = await response.json();

        const transformedData = result.map((entry) => ({
          timestamp: new Date(entry.timestamp),
          batteryPercentage: (entry.energy_available_kW / entry.battery_capacity_kW) * 100,
          energyAvailable_kW: entry.energy_available_kW,
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCurrentStats = async () => {
      try {
        const response = await fetch(`${apiUrl}/battery/current`);
        const result = await response.json();

        setCurrentStats({
          batteryLevel: result.battery_level,
          batteryCapacity_kW: result.battery_capacity_kW,
          energyAvailable_kW: result.energy_available_kW,
        });
      } catch (error) {
        console.error("Error fetching current stats:", error);
      }
    };

    fetchData();
    fetchCurrentStats();
  }, [selectedTimeRange]);

  // Formato de etiquetas en el eje X según el rango de tiempo seleccionado
  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    if (selectedTimeRange === "1h" || selectedTimeRange === "12h" || selectedTimeRange === "1d") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "2-digit" });
  };

  // Define la cantidad de etiquetas en el eje X
  const xAxisTickCount = selectedTimeRange === "1d" || selectedTimeRange === "12h" || selectedTimeRange === "1h" 
    ? 12 
    : selectedTimeRange === "3d" 
    ? 3 
    : 7;

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <motion.div
        className="max-w-7xl mx-auto py-6 px-4 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* STAT CARDS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Battery Level"
            icon={BatteryCharging}
            value={`${currentStats.batteryLevel ? currentStats.batteryLevel.toFixed(1) : "Loading..."} %`}
            color="#6366F1"
          />
          <StatCard
            name="Battery Capacity"
            icon={Zap}
            value={`${currentStats.batteryCapacity_kW ? currentStats.batteryCapacity_kW.toFixed(2) : "Loading..."} kW`}
            color="#10B981"
          />
          <StatCard
            name="Energy Available"
            icon={TrendingUp}
            value={`${currentStats.energyAvailable_kW ? currentStats.energyAvailable_kW.toFixed(2) : "Loading..."} kW`}
            color="#F59E0B"
          />
        </motion.div>

        {/* Toggle button for % and kW */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => setDisplayInPercentage(!displayInPercentage)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            {displayInPercentage ? "Show in kW" : "Show in %"}
          </button>
        </div>

        {/* ENERGY CHART */}
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-100">Stored Energy Over Time</h2>
            <select
              className="bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatXAxis}
                  stroke="#9CA3AF"
                  interval="preserveStartEnd"
                  ticks={data.length > xAxisTickCount ? data.map((entry, index) => index % Math.ceil(data.length / xAxisTickCount) === 0 ? entry.timestamp : null).filter(entry => entry) : data.map(entry => entry.timestamp)}
                  dy={10}
                />
                <YAxis
                  stroke="#9CA3AF"
                  domain={[0, displayInPercentage ? 100 : currentStats.batteryCapacity_kW]}
                  tickFormatter={(value) => (displayInPercentage ? `${value}%` : `${value} kW`)}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
                  itemStyle={{ color: "#E5E7EB" }}
                  formatter={(value, name, props) => {
                    if (name === "batteryPercentage") {
                      return [`${props.payload.batteryPercentage.toFixed(1)}%`, "Battery Level"];
                    } else {
                      return [`${props.payload.energyAvailable_kW.toFixed(2)} kW`, "Energy Available"];
                    }
                  }}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return `Date: ${date.toLocaleDateString()} \nTime: ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={displayInPercentage ? "batteryPercentage" : "energyAvailable_kW"}
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                  name={displayInPercentage ? "Battery Level" : "Energy Available"}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StoredPage;
