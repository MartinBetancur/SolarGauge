import { Route, Routes, Navigate } from "react-router-dom"; // Importa Navigate para redirección

import AvailablePage from "./pages/AvailablePage";
import OverviewPage from "./pages/OverviewPage";

import Sidebar from "./components/Sidebar";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
      <Routes>
        {/* Redirige a /login si la ruta no coincide con login o register */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* Contenedor principal para las demás rutas */}
        <Route path='*' element={
          <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/*Background*/}
            <div className="fixed inset-0 z-0">
              <div className="absolute inset-0 bg-gradiente-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"/>
              <div className="absolute inset-0 backdrop-blur-sm"/>
            </div>

            <Sidebar />
            <Routes>
              <Route path='/:id' element={<OverviewPage />} />
              <Route path='/available' element={<AvailablePage />} />
              <Route path='/sales' element={<SalesPage />} />
              <Route path='/orders' element={<OrdersPage />} />
              <Route path='/analytics' element={<AnalyticsPage />} />
              <Route path='/users' element={<UsersPage />} />
              <Route path='/settings' element={<SettingsPage />} />
            </Routes>
          </div>
        } />
      </Routes>
  );
}

export default App;
