// SalesPage.jsx
import React, { useState } from "react";
import Header from "../components/common/Header";
import OfferList from "../components/sales/OfferList";
import OfferDetails from "../components/sales/OfferDetails"; // Añadir este componente en el siguiente paso

const SalesPage = ({ userId }) => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const apiUrl = import.meta.env.VITE_MARKET_SERVICE_URI;

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Mercado Energético" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <div className="grid gap-8">
                    {/* Listado de ofertas */}
                    <h2 className="text-2xl font-semibold text-white mb-4">Ofertas Activas</h2>
                    <OfferList 
                        apiUrl={apiUrl} 
                        userId={userId} 
                        onSelectOffer={setSelectedOffer} 
                    />

                    {/* Detalles de la oferta seleccionada */}
                    {selectedOffer && (
                        <OfferDetails offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default SalesPage;
