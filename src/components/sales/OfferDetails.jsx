import React from "react";

const OfferDetails = ({ offer }) => (
	<div className="bg-white shadow rounded-lg p-6">
		<h3 className="text-lg font-medium mb-4">Offer Details</h3>
		<p><strong>Type:</strong> {offer.offer_type}</p>
		<p><strong>Energy Amount:</strong> {offer.energy_amount} kWh</p>
		<p><strong>Price per Unit:</strong> ${offer.price_per_unit}</p>
		<p><strong>Status:</strong> {offer.status}</p>
		<p><strong>Expiration:</strong> {offer.expiration_time}</p>
	</div>
);

export default OfferDetails;
