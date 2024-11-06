import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const energyData = [
	{ name: "Lun", energy: 4.2 },
    { name: "Mar", energy: 3.8 },
    { name: "Mie", energy: 5.1 },
    { name: "Jue", energy: 4.9 },
    { name: "Vie", energy: 4.5 },
	{ name: "Sab", energy: 5.7 },
	{ name: "Dom", energy: 3.9 },
];

const EnergyPredictionChart = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-2'>Predicción de Generación Energética</h2>
			<p className='text-gray-400 mb-4'>Análisis de tendencias de consumo en kWh por semana</p>
			
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={energyData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis
							stroke='#9CA3AF'
							tickFormatter={(value) => `${value} kWh`}
							domain={[2, 6]}
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
						<Line type='monotone' dataKey='energy' stroke='#34D399' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default EnergyPredictionChart;
