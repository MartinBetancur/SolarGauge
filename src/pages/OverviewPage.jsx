import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, BatteryCharging, Users, Zap } from 'lucide-react';

import Header from '../components/common/Header';
import StatCard from '../components/common/StatCard';
import SalesOverviewChart from '../components/overview/SalesOverviewChart';
import CategoryDistributionChart from '../components/overview/CategoryDistributionChart';
import SalesChannelChart from '../components/overview/SalesChannelChart';

const ConsumptionPage = () => {
    const { id } = useParams(); // Obtiene user_id de la URL
    const [totalConsumption, setTotalConsumption] = useState(null);
    const [dailyAverageConsumption, setdailyAverageConsumption] = useState(null);
    const [monthlyAverageConsumption, setmonthlyAverageConsumption] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener el consumo total del mes
                const monthResponse = await fetch(`http://127.0.0.1:8000/api/v1/consumption/get-current-month-consumption/?user_id=${id}`);
                const monthData = await monthResponse.json();
                setTotalConsumption(monthData.total_month_consumption);

                // Obtener el promedio de consumo diario
                const dailyAverageResponse = await fetch(`http://127.0.0.1:8000/api/v1/consumption/get-average-delta-consumption/?user_id=${id}&delta=day`);
                const dailyAverageData = await dailyAverageResponse.json();
                setdailyAverageConsumption(dailyAverageData.average_consumption);

                // Obtener el promedio de consumo mensual
                const monthlyAverageResponse = await fetch(`http://127.0.0.1:8000/api/v1/consumption/get-average-delta-consumption/?user_id=${id}&delta=month`);
                const monthlyAverageData = await monthlyAverageResponse.json();
                setmonthlyAverageConsumption(monthlyAverageData.average_consumption);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title="Dashboard de Consumo Energético" />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>

                {/* STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name="Consumo total del mes actual"
                        icon={Zap}
                        value={`${totalConsumption !== null ? parseFloat(totalConsumption).toFixed(2) : 'Loading...'} kWh`}
                        color='#6366F1'
                    />
                    <StatCard
                        name="Consumo promedio diario"
                        icon={BarChart}
                        value={`${dailyAverageConsumption !== null ? parseFloat(dailyAverageConsumption).toFixed(2) : 'Loading...'} kWh`}
                        color='#10B981'
                    />
                    <StatCard
                        name="Consumo promedio mensual"
                        icon={BarChart}
                        value={`${monthlyAverageConsumption !== null ? parseFloat(monthlyAverageConsumption).toFixed(2) : 'Loading...'} kWh`}
                        color='#10B981'
                    />
                    {/* Agrega más tarjetas si es necesario */}
                </motion.div>

                {/* CHARTS */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <SalesOverviewChart />
                    <CategoryDistributionChart />
                    <SalesChannelChart />
                </div>
            </main>
        </div>
    );
}

export default ConsumptionPage;
