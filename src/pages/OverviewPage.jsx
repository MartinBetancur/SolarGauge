import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Zap } from 'lucide-react'; 
import Header from '../components/common/Header';
import StatCard from '../components/common/StatCard';
import SalesOverviewChart from '../components/overview/SalesOverviewChart';
import CategoryDistributionChart from '../components/overview/CategoryDistributionChart';
import SalesChannelChart from '../components/overview/SalesChannelChart';

const ConsumptionPage = () => {
    const { id } = useParams(); // Obtiene user_id de la URL
    const [isConsumption, setIsConsumption] = useState(true); // Estado para toggle entre consumo y producción
    const [currentMonthData, setCurrentMonthData] = useState(null);
    const [previousMonthData, setPreviousMonthData] = useState(null);
    const [dailyAverageData, setDailyAverageData] = useState(null);
    const [monthlyAverageData, setMonthlyAverageData] = useState(null);

    // Función para alternar entre consumo y producción
    const toggleConsumptionProduction = () => {
        setIsConsumption(prevState => !prevState);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date();
                const currentMonth = today.getMonth() + 1; // Mes actual
                const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Mes anterior

                const type = isConsumption ? 'consumption' : 'production'; // Cambiar entre consumo y producción

                // Obtener datos del mes actual
                const currentMonthResponse = await fetch(`http://127.0.0.1:8000/api/v1/consumption_generation/get-month-value/?month=${currentMonth}&user_id=${id}&value_type=${type}`);
                const currentMonthData = await currentMonthResponse.json();
                setCurrentMonthData(currentMonthData.total_month_value);

                // Obtener datos del mes anterior
                const previousMonthResponse = await fetch(`http://127.0.0.1:8000/api/v1/consumption_generation/get-month-value/?month=${previousMonth}&user_id=${id}&value_type=${type}`);
                const previousMonthData = await previousMonthResponse.json();
                setPreviousMonthData(previousMonthData.total_month_value);

                // Obtener el promedio diario
                const dailyAverageResponse = await fetch(`http://127.0.0.1:8000/api/v1/consumption_generation/get-average-delta-value/?user_id=${id}&delta=day&value_type=${type}`);
                const dailyAverageData = await dailyAverageResponse.json();
                setDailyAverageData(dailyAverageData.average_value);

                // Obtener el promedio mensual
                const monthlyAverageResponse = await fetch(`http://127.0.0.1:8000/api/v1/consumption_generation/get-average-delta-value/?user_id=${id}&delta=month&value_type=${type}`);
                const monthlyAverageData = await monthlyAverageResponse.json();
                setMonthlyAverageData(monthlyAverageData.average_value);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, isConsumption]); // El efecto se ejecuta cada vez que cambia el tipo de dato (consumo/producción)

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title="Dashboard de Consumo y Producción Energética" />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                
                {/* Toggle Button */}
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={toggleConsumptionProduction} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {isConsumption ? 'Cambiar a Producción' : 'Cambiar a Consumo'}
                    </button>
                </div>

                {/* STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Tarjeta del mes actual */}
                    <StatCard
                        name={`${isConsumption ? 'Consumo' : 'Producción'} total del mes actual`}
                        icon={Zap}
                        value={`${currentMonthData !== null ? parseFloat(currentMonthData).toFixed(2) : 'Loading...'} kWh`}
                        color='#6366F1'
                    />
                    {/* Tarjeta del mes anterior */}
                    <StatCard
                        name={`${isConsumption ? 'Consumo' : 'Producción'} total del mes anterior`}
                        icon={Zap}
                        value={`${previousMonthData !== null ? parseFloat(previousMonthData).toFixed(2) : 'Loading...'} kWh`}
                        color='#f59e0b'
                    />
                    {/* Promedio diario */}
                    <StatCard
                        name={`${isConsumption ? 'Consumo' : 'Producción'} promedio diario`}
                        icon={BarChart}
                        value={`${dailyAverageData !== null ? parseFloat(dailyAverageData).toFixed(2) : 'Loading...'} kWh`}
                        color='#10B981'
                    />
                    {/* Promedio mensual */}
                    <StatCard
                        name={`${isConsumption ? 'Consumo' : 'Producción'} promedio mensual`}
                        icon={BarChart}
                        value={`${monthlyAverageData !== null ? parseFloat(monthlyAverageData).toFixed(2) : 'Loading...'} kWh`}
                        color='#10B981'
                    />
                </motion.div>

                {/* GRÁFICOS */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <SalesOverviewChart isConsumption={isConsumption}/>
                    <CategoryDistributionChart isConsumption={isConsumption}/>
                    <SalesChannelChart isConsumption={isConsumption}/>
                </div>
            </main>
        </div>
    );
}

export default ConsumptionPage;
