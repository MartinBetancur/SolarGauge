// OfferDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const OfferDetails = ({ offer, onClose, apiUrl }) => {
    const [offerDetails, setOfferDetails] = useState(null);

    useEffect(() => {
        const fetchOfferDetails = async () => {
            if (offer) {
                try {
                    const response = await axios.get(`${apiUrl}/api/v1/offers/offers/${offer.id}`);
                    setOfferDetails(response.data);
                } catch (error) {
                    console.error("Error fetching offer details:", error);
                }
            }
        };

        fetchOfferDetails();
    }, [offer, apiUrl]);

    if (!offerDetails) return null;

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            <button
                onClick={onClose}
                className="text-sm text-gray-400 hover:text-white mb-4"
            >
                Cerrar
            </button>

            <h2 className="text-2xl font-bold mb-2">
                {offerDetails.offer_type === "buy" ? "Oferta de Compra" : "Oferta de Venta"}
            </h2>
            <p className="text-lg">Energia: {offerDetails.energy_amount} kWh</p>
            <p className="text-lg">Precio por Unidad: ${offerDetails.price_per_unit}</p>
            <p className="text-lg">Expira: {new Date(offerDetails.expiration_time).toLocaleDateString()}</p>
            <p className="text-lg">Condiciones: {offerDetails.terms_conditions}</p>
            <p className="text-lg">Estado: {offerDetails.status}</p>
            <p className="text-lg">Creado en: {new Date(offerDetails.created_at).toLocaleDateString()}</p>
        </div>
    );
};

export default OfferDetails;
