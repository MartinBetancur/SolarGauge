import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import OfferList from "../components/sales/OfferList";
import OfferDetails from "../components/sales/OfferDetails";
import CreateOfferForm from "../components/sales/CreateOfferForm";
import SalesList from "../components/sales/SalesList";
import SaleDetails from "../components/sales/SaleDetails"; 
import { useUser } from "../UserContext";

const SalesPage = () => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [offers, setOffers] = useState([]);  // Estado para ofertas
    const [selectedSale, setSelectedSale] = useState(null);  // Estado para venta seleccionada
    const apiUrl = import.meta.env.VITE_MARKET_SERVICE_URI;
    const { userId } = useUser();

    // Función para manejar la creación de una nueva oferta
    const handleCreateOffer = (newOffer) => {
        setOffers((prevOffers) => [newOffer, ...prevOffers]);  // Actualiza la lista de ofertas
        
        // Recargar la página después de crear una nueva oferta
        //window.location.reload();  // Recarga la página completa
    };

    // Cargar la lista de ofertas cuando el componente se monta
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/v1/offers`);
                setOffers(response.data);  // Establece las ofertas obtenidas del backend
            } catch (error) {
                console.error("Error al cargar ofertas:", error);
            }
        };

        fetchOffers();
    }, [apiUrl]);  // Este efecto se ejecutará cuando el componente se monte

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
                        offers={offers}  // Pasamos las ofertas actuales al componente de lista
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
                        apiUrl={apiUrl} 
                        onSelectSale={setSelectedSale} // Función para seleccionar venta
                    />

                    {/* Detalles de la venta seleccionada */}
                    {selectedSale && (
                        <SaleDetails 
                            saleId={selectedSale} 
                            apiUrl={apiUrl} 
                            onClose={() => setSelectedSale(null)} // Función para cerrar detalles
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default SalesPage;
