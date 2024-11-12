// CreateOfferForm.jsx
import React, { useState } from "react";
import axios from "axios";

const CreateOfferForm = ({ apiUrl, onCreateOffer }) => {
    const [formData, setFormData] = useState({
        seller_id: 0,
        energy_amount: 0,
        price_per_unit: 0,
        offer_type: "buy",
        expiration_time: "",
        transfer_datetime: "",
        terms_conditions: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/v1/offers/`, formData);
            onCreateOffer(response.data); // Llama a la función para actualizar la lista de ofertas
            setFormData({
                seller_id: 0,
                energy_amount: 0,
                price_per_unit: 0,
                offer_type: "buy",
                expiration_time: "",
                transfer_datetime: "",
                terms_conditions: ""
            });
        } catch (error) {
            console.error("Error creating offer:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-gray-800 text-white rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-bold mb-4">Crear Nueva Oferta</h3>

            <div className="mb-4">
                <label className="block text-sm">ID del Vendedor</label>
                <input
                    type="number"
                    name="seller_id"
                    value={formData.seller_id}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm">Cantidad de Energía (kWh)</label>
                <input
                    type="number"
                    name="energy_amount"
                    value={formData.energy_amount}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm">Precio por Unidad</label>
                <input
                    type="number"
                    name="price_per_unit"
                    value={formData.price_per_unit}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm">Tipo de Oferta</label>
                <select
                    name="offer_type"
                    value={formData.offer_type}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                >
                    <option value="buy">Compra</option>
                    <option value="sell">Venta</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm">Fecha de Expiración</label>
                <input
                    type="datetime-local"
                    name="expiration_time"
                    value={formData.expiration_time}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm">Fecha de Transferencia</label>
                <input
                    type="datetime-local"
                    name="transfer_datetime"
                    value={formData.transfer_datetime}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm">Términos y Condiciones</label>
                <textarea
                    name="terms_conditions"
                    value={formData.terms_conditions}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Crear Oferta
            </button>
        </form>
    );
};

export default CreateOfferForm;
