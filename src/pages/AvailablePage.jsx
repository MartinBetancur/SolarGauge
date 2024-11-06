import { motion } from "framer-motion";
import { Zap, Users, BatteryCharging, BarChart } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesTrendChart from "../components/products/SalesTrendChart";
import PredictionGenerationChart from "../components/products/PredictionGenerationChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";

const AvailablePage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Energy Available' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* Envoltorio para los Charts y Stats con espacio vertical */}
        <div className="space-y-8 mb-8">
          {/* Sales Trend Chart */}
          <SalesTrendChart />

          {/* STATS */}
          <motion.div
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}  
          >
            <StatCard
              name="Consumo predicho total para mañana" icon={Zap} value=' 19 kWh' color='#6366F1'
            />
            <StatCard
              name="Consumo predicho total semanal " icon={Users} value=' 137 kWh' color='#8B5CF6'
            />
            <StatCard
			  name="Porcentaje de cambio"
		      icon={BatteryCharging}
			  value={<span style={{ color: '#DC2626' }}>+ 17%</span>} // Usamos rojo (#DC2626) para el valor
			  color='#EC4899' // Color del icono y otros elementos
				/>
            <StatCard
              name="Horas Pico de Consumo" icon={BarChart} value='6:00 - 8:00 (am)  4:00 - 5:00 (pm)' color='#10B981'
            />
          </motion.div>

          {/* Prediction Generation Chart */}
          <PredictionGenerationChart />
        </div>

      </main>
    </div>
  );
};

export default AvailablePage;
