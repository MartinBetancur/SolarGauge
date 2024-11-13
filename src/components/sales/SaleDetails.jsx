// SaleDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SaleDetails = ({ saleId, onClose, apiUrl }) => {
    const [sale, setSale] = useState(null);

    useEffect(() => {
        // Cargar detalles de la venta al montar el componente
        const fetchSaleDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/v1/sales/sales/${saleId}`);
                setSale(response.data);
            } catch (error) {
                console.error("Error al obtener los detalles de la venta:", error);
                alert("Error al cargar los detalles de la venta.");
            }
        };

        fetchSaleDetails();
    }, [saleId, apiUrl]);

    // Función para descargar el PDF
    const handleDownloadPdf = async () => {
        try {
            const filename = sale.pdf_document_path + ".pdf"; // Construir el nombre del archivo
            const response = await axios.get(`${apiUrl}/api/v1/sales/contracts/${filename}`, {
                responseType: "blob", // Importante para manejar el archivo binario
            });

            // Crear un enlace para descargar el archivo
            const blob = new Blob([response.data], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename; // El nombre del archivo a descargar
            link.click();
        } catch (error) {
            console.error("Error al descargar el PDF:", error);
            alert("Error al descargar el PDF.");
        }
    };

    if (!sale) {
        return <p>Cargando detalles de la venta...</p>;
    }

    return (
        <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Detalles de la Venta</h3>
            <p><strong>ID de Venta:</strong> {sale.id}</p>
            <p><strong>Estado:</strong> {sale.status}</p>
            <p><strong>Razón de Penalización:</strong> {sale.penalty_reason || "N/A"}</p>
            <p><strong>Fecha de Confirmación:</strong> {new Date(sale.confirmation_date).toLocaleString()}</p>
            <p><strong>Última Actualización:</strong> {new Date(sale.last_updated).toLocaleString()}</p>
            <h4 className="text-xl font-semibold mt-4">Detalles de la Oferta</h4>
            <p><strong>Vendedor ID:</strong> {sale.offer.seller_id}</p>
            <p><strong>Comprador ID:</strong> {sale.offer.buyer_id}</p>
            <p><strong>Cantidad de Energía:</strong> {sale.offer.energy_amount} kWh</p>
            <p><strong>Precio por Unidad:</strong> ${sale.offer.price_per_unit}</p>
            <p><strong>Tipo de Oferta:</strong> {sale.offer.offer_type === "buy" ? "Compra" : "Venta"}</p>
            <p><strong>Fecha de Expiración:</strong> {new Date(sale.offer.expiration_time).toLocaleString()}</p>
            <p><strong>Fecha de Transferencia:</strong> {new Date(sale.offer.transfer_datetime).toLocaleString()}</p>
            <p><strong>Términos y Condiciones:</strong> {sale.offer.terms_conditions}</p>

            {/* Botón para descargar el PDF de la venta */}
            <button
                onClick={handleDownloadPdf}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Descargar PDF
            </button>

            <button
                onClick={onClose}
                className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
                Cerrar
            </button>
        </div>
    );
};

export default SaleDetails;
