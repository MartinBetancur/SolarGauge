import React from "react";

const SalesList = ({ sales, onSelectSale }) => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sales.map((sale) => (
                <div
                    key={sale.id}
                    className="p-4 bg-gray-800 text-white rounded-lg shadow-md cursor-pointer"
                    onClick={() => onSelectSale(sale.id)} // Selecciona la venta al hacer clic
                >
                    <h3 className="text-xl font-semibold">Venta {sale.id}</h3>
                    <p><strong>Estado:</strong> {sale.status}</p>
                    <p><strong>Oferta ID:</strong> {sale.offer_id}</p>
                    <p><strong>Fecha de Confirmación:</strong> {new Date(sale.confirmation_date).toLocaleDateString()}</p>
                    <p><strong>Tipo de Oferta:</strong> {sale.offer.offer_type === "buy" ? "Compra" : "Venta"}</p>
                    <p><strong>Energía:</strong> {sale.offer.energy_amount} kWh</p>
                    <p><strong>Precio por Unidad:</strong> ${sale.offer.price_per_unit}</p>
                </div>
            ))}
        </div>
    );
};

export default SalesList;
