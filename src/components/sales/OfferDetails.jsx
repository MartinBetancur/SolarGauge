// OfferDetails.jsx
import React from "react";
import axios from "axios";

const OfferDetails = ({ offer, onClose, apiUrl, userId }) => {
    const handleAction = async (action) => {
        try {
            if (action === "accept") {
                // Llamada POST para aceptar la oferta y crear una venta
                const response = await axios.post(`${apiUrl}/api/v1/sales`, {
                    offer_id: offer.id,
                    status: "pending", // Estado inicial de la venta
                    penalty_reason: "", // Campo opcional o ajustable si es necesario
                    buyer_id: userId // ID del usuario actual
                });
                console.log(`Oferta aceptada con éxito:`, response.data);
                alert(`Oferta aceptada con éxito.`);
            } else {
                // Llamada PUT para otros estados de la oferta (activar, cancelar, etc.)
                const response = await axios.put(`${apiUrl}/api/v1/offers/${offer.id}/${action}`);
                console.log(`Oferta ${action} con éxito:`, response.data);
                alert(`Oferta ${action} con éxito.`);
            }
        } catch (error) {
            console.error(`Error al ${action} la oferta:`, error);
            alert(`Error al ${action} la oferta.`);
        }
    };

    return (
        <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Detalles de la Oferta</h3>
            <p><strong>Tipo de Oferta:</strong> {offer.offer_type === "buy" ? "Compra" : "Venta"}</p>
            <p><strong>Energía:</strong> {offer.energy_amount} kWh</p>
            <p><strong>Precio por Unidad:</strong> ${offer.price_per_unit}</p>
            <p><strong>Expira:</strong> {new Date(offer.expiration_time).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> {offer.status}</p>

            <div className="mt-4 flex space-x-2">
                <button
                    onClick={() => handleAction("activate")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Activar
                </button>
                <button
                    onClick={() => handleAction("accept")}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Aceptar
                </button>
            </div>

            <button
                onClick={onClose}
                className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
                Cerrar
            </button>
        </div>
    );
};

export default OfferDetails;
