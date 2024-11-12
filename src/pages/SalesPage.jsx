// SalesPage.jsx
import React, { useState } from "react";
import Header from "../components/common/Header";
import OfferList from "../components/sales/OfferList";
import OfferDetails from "../components/sales/OfferDetails";
import CreateOfferForm from "../components/sales/CreateOfferForm";

const SalesPage = ({ userId }) => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [offers, setOffers] = useState([]);
    const apiUrl = import.meta.env.VITE_MARKET_SERVICE_URI;

    const handleCreateOffer = (newOffer) => {
        setOffers((prevOffers) => [newOffer, ...prevOffers]);
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Mercado Energético" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <div className="grid gap-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">Ofertas Activas</h2>

                    {/* Listado de ofertas */}
                    <OfferList
                        apiUrl={apiUrl}
                        userId={userId}
                        onSelectOffer={setSelectedOffer}
                    />

                    {/* Formulario para crear nueva oferta */}
                    <CreateOfferForm apiUrl={apiUrl} onCreateOffer={handleCreateOffer} />

                    {/* Detalles de la oferta seleccionada */}
                    {selectedOffer && (
                        <OfferDetails
                            offer={selectedOffer}
                            onClose={() => setSelectedOffer(null)}
                            apiUrl={apiUrl}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default SalesPage;
