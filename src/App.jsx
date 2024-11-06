// src/App.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

// Importa los componentes necesarios de react-router-dom
import { Outlet } from "react-router-dom"; // Asegúrate de importar Outlet

// Importa los componentes de la Landing Page
import Navbar from "./landing-page/Navbar";
import HeroSection from "./landing-page/HeroSection";
import FeatureSection from "./landing-page/FeatureSection";
import Workflow from "./landing-page/Workflow";
import Pricing from "./landing-page/Pricing";
import Testimonials from "./landing-page/Testimonials";
import Footer from "./landing-page/Footer";

// Importa los componentes del Dashboard
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

// Layout para el Dashboard que incluye Sidebar y Outlet
const DashboardLayout = () => (
  <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
    {/* Fondo */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
      <div className="absolute inset-0 backdrop-blur-sm" />
    </div>

    {/* Sidebar */}
    <Sidebar />

    {/* Contenido principal del Dashboard */}
    <div className="relative z-10 flex-1 p-6 overflow-y-auto">
      {/* Aquí se renderizarán las rutas hijas */}
      <Outlet />
    </div>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      {/* Ruta para la Landing Page */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <div className="max-w-7xl mx-auto pt-20 px-6">
              <HeroSection />
              <FeatureSection />
              <Workflow />
              <Pricing />
              <Testimonials />
              <Footer />
            </div>
          </>
        }
      />

      {/* Rutas de Autenticación */}
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas del Dashboard (protegidas) */}
      {isAuthenticated ? (
        <Route element={<DashboardLayout />}>
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/available" element={<AvailablePage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Redirección por defecto al /overview si la ruta no coincide */}
          <Route path="*" element={<Navigate to="/overview" />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
