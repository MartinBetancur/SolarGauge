// src/App.jsx
import { Route, Routes } from "react-router-dom"; 

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

function App() {
  return (
    <Routes>
      {/* Ruta para la Landing Page */}
      <Route path="/" element={
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
      } />

      {/* Rutas para el Dashboard */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
          {/* Background */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradiente-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>

          {/* Sidebar */}
          <Sidebar />

          {/* Rutas principales */}
          <Routes>
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/available" element={<AvailablePage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      } />
    </Routes>
  );
}

export default App;
