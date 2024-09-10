import { Route, Routes } from "react-router-dom";

import AvailablePage from "./pages/AvailablePage";
import SalesPage from "./pages/SalesPage";  
import OverviewPage from "./pages/OverviewPage"

import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">

      {/*Background*/}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradiente-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"/>
        <div className="absolute inset-0 backdrop-blur-sm"/>
      </div>

      <Sidebar />
      <Routes>
        <Route path='/:id' element={<OverviewPage/>} />
        <Route path='/available' element={<AvailablePage/>} />
        <Route path='/sales' element={<SalesPage/>} />
      </Routes>
    </div>
  )
}

export default App
