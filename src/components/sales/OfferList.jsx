import React from "react";
import { motion } from "framer-motion";

const OfferList = ({ offers, onSelectOffer }) => {
    return (
        <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {offers.map((offer) => (
                <div
                    key={offer.id}
                    onClick={() => onSelectOffer(offer)}
                    className="p-4 bg-gray-800 text-white rounded-lg shadow-md cursor-pointer hover:bg-gray-700"
                >
                    <h2 className="text-xl font-semibold">
                        {offer.offer_type === "buy" ? "Oferta de Compra" : "Oferta de Venta"}
                    </h2>
                    <p>Energia: {offer.energy_amount} kWh</p>
                    <p>Precio por Unidad: ${offer.price_per_unit}</p>
                    <p>Expira: {new Date(offer.expiration_time).toLocaleDateString()}</p>
                </div>
            ))}
        </motion.div>
    );
};

export default OfferList;
