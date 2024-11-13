import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Settings, TrendingUp, Users, Zap, Menu, BarChart2, ShoppingCart, BatteryCharging } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useUser } from '../UserContext';

const Sidebar = ({ onLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
    const { userId } = useUser();
    const navigate = useNavigate(); // Hook para la navegación

    const SIDEBAR_ITEMS = [
        {
            name: "Dashboard", icon: BarChart2, color: "#6366f1", href: `/${userId}`
        },
        {
            name: "Modelo Predictivo", icon: Zap, color: "#6366f1", href: `/predictive-model/${userId}`
        },
        {
            name: "Mercado Energético", icon: TrendingUp, color: "#FF9800", href: `/market/${userId}`
        },
        {
            name: "Energía Almacenada", icon: BatteryCharging, color: "#4CAF50", href: "/stored"
        },
        // Los items comentados no se eliminan, pero están deshabilitados.
    ];

    const handleLogout = () => {
        onLogout(); // Llamamos a la función onLogout pasada como prop
        navigate('/'); // Redirigimos a la landing page después de hacer logout
    };

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
                >
                    <Menu size={24} />
                </motion.button>

                <nav className="mt-8 flex-grow">
                    {SIDEBAR_ITEMS.map((item) => (
                        <Link key={item.href} to={item.href}>
                            <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            className="ml-4 whitespace-nowrap"
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2, delay: 0.3 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleLogout} // Llamamos a la nueva función handleLogout
                        className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-red-600 transition-colors mb-2 w-full"
                    >
                        <span className="mr-2 text-white">Logout</span>
                        <BarChart size={20} style={{ color: "#fff", minWidth: "20px" }} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;
