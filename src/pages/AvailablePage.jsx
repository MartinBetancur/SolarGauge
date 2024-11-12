import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Users, BatteryCharging, BarChart, AlignVerticalDistributeStart } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesTrendChart from "../components/products/SalesTrendChart";
import SalesTrendChart2 from "../components/products/SalesTrendChart2";

const AvailablePage = () => {
  const [energyData, setEnergyData] = useState(null);
  const [energyData2, setEnergyData2] = useState(null);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchEnergyData = async () => {
    const currentDate = getCurrentDate();
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
      setEnergyData(data);
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  const fetchEnergyData2 = async () => {
    const currentDate = getCurrentDate();
    try {
      const response = await fetch(`http://127.0.0.1:8000/predict_consumption/20815639-1010-4ec8-bd2f-6b33aa3cd1ea/${currentDate}/2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });

      if (!response.ok) throw new Error("Error al obtener datos de la API");

      const data = await response.json();
      setEnergyData2(data);
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  useEffect(() => {
    fetchEnergyData();
    fetchEnergyData2();
  }, []);

  const formatHour = (hour) => {
    const formattedHour = hour === 0 ? "12:00 AM" : hour === 9 ? "9:00 AM" : `${hour}:00`;
    return formattedHour;
  };

  const formatDecimal = (value) => value ? value.toFixed(2) : 'Cargando...';

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Energy Available' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <div className="space-y-8 mb-8">
          <SalesTrendChart />

          <motion.div
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Consumo predicho total para el dia de hoy"
              icon={Zap}
              value={energyData ? `${formatDecimal(energyData.predicted_consumption)} kWh` : 'Cargando...'}
              color='#6366F1'
            />
            <StatCard
              name="Consumo predicho total semanal"
              icon={Users}
              value={energyData ? `${formatDecimal(energyData.total_week_consumption)} kWh` : 'Cargando...'}
              color='#8B5CF6'
            />
            <StatCard
              name="Porcentaje de cambio con respecto al día anterior"
              icon={BatteryCharging}
              value={energyData ? <span style={{ color: '#DC2626' }}>{`${formatDecimal(energyData.porcentaje_val)}%`}</span> : 'Cargando...'}
              color='#EC4899'
            />
            <StatCard
              name="Horas Pico de Consumo"
              icon={BarChart}
              value={
                energyData ?
                (
                  <>
                    <div className="text-lg text-white">
                      <strong>{formatHour(0)}:</strong> {formatDecimal(energyData.horas_p[0])} kWh
                    </div>
                    <div className="text-lg text-white mt-1">
                      <strong>{formatHour(9)}:</strong> {formatDecimal(energyData.horas_p[9])} kWh
                    </div>
                  </>
                ) : 'Cargando...'
              }
              color='#10B981'
            />
          </motion.div>

          <SalesTrendChart2 />

          <motion.div
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Generacion predicha total para mañana"
              icon={Zap}
              value={energyData2 ? `${formatDecimal(energyData2.predicted_consumption)} kWh` : 'Cargando...'}
              color='#6366F1'
            />
            <StatCard
              name="Generacion predicha total semanal"
              icon={Users}
              value={energyData2 ? `${formatDecimal(energyData2.total_week_consumption)} kWh` : 'Cargando...'}
              color='#8B5CF6'
            />
            <StatCard
              name="Porcentaje de cambio con respecto al día anterior"
              icon={AlignVerticalDistributeStart}
              value={energyData2 ? <span style={{ color: '#DC2626' }}>{`${formatDecimal(energyData2.porcentaje_val)}%`}</span> : 'Cargando...'}
              color='#EC4899'
            />
            <StatCard
              name="Horas Pico de Consumo"
              icon={BarChart}
              value={
                energyData2 ?
                (
                  <>
                    <div className="text-lg text-white">
                      <strong>{formatHour(0)}:</strong> {formatDecimal(energyData2.horas_p[0])} kWh
                    </div>
                    <div className="text-lg text-white mt-1">
                      <strong>{formatHour(9)}:</strong> {formatDecimal(energyData2.horas_p[9])} kWh
                    </div>
                  </>
                ) : 'Cargando...'
              }
              color='#10B981'
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AvailablePage;
