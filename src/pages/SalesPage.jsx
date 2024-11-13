import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import OfferList from "../components/sales/OfferList";
import OfferDetails from "../components/sales/OfferDetails";
import CreateOfferForm from "../components/sales/CreateOfferForm";
import SalesList from "../components/sales/SalesList";
import SaleDetails from "../components/sales/SaleDetails";
import { useUser } from "../UserContext";
import axios from "axios";

const SalesPage = () => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [offers, setOffers] = useState([]);
    const [selectedSale, setSelectedSale] = useState(null);
    const [sales, setSales] = useState([]);  // Estado para almacenar las ventas
    const apiUrl = import.meta.env.VITE_MARKET_SERVICE_URI;
    const { userId } = useUser();

    // Función para obtener las ofertas
    const fetchOffers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/v1/offers/offers`);
            setOffers(response.data);
        } catch (error) {
            console.error("Error al cargar ofertas:", error);
        }
    };

    // Función para obtener las ventas
    const fetchSales = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/v1/sales/sales`);
            setSales(response.data);
        } catch (error) {
            console.error("Error al cargar ventas:", error);
        }
    };

    useEffect(() => {
        fetchOffers();
        fetchSales();
    }, [apiUrl]);

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
                        offers={offers}  
                        onSelectOffer={setSelectedOffer}
                    />

                    {/* Detalles de la oferta seleccionada */}
                    {selectedOffer && (
                        <OfferDetails
                            offer={selectedOffer}
                            onClose={() => setSelectedOffer(null)}
                            apiUrl={apiUrl}
                            userId={userId}
                        />
                    )}

                    {/* Formulario para crear nueva oferta */}
                    <CreateOfferForm apiUrl={apiUrl} userId={userId} onCreateOffer={handleCreateOffer} />

                    {/* Listado de ventas */}
                    <h2 className="text-2xl font-semibold text-white mt-6">Ventas Realizadas</h2>
                    <SalesList 
                        sales={sales}  // Pasamos las ventas como prop a SalesList
                        onSelectSale={setSelectedSale}
                    />

                    {/* Detalles de la venta seleccionada */}
                    {selectedSale && (
                        <SaleDetails 
                            saleId={selectedSale} 
                            apiUrl={apiUrl} 
                            onClose={() => setSelectedSale(null)}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default SalesPage;
