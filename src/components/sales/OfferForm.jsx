import React, { useState } from "react";

const OfferForm = ({ onCreateOffer }) => {
	const [form, setForm] = useState({
		seller_id: 0,
		energy_amount: 0,
		price_per_unit: 0,
		offer_type: "buy",
		expiration_time: "",
		transfer_datetime: "",
		terms_conditions: ""
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onCreateOffer(form);
		setForm({
			seller_id: 0,
			energy_amount: 0,
			price_per_unit: 0,
			offer_type: "buy",
			expiration_time: "",
			transfer_datetime: "",
			terms_conditions: ""
		});
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg">
			<h3 className="text-lg font-medium mb-4">Create New Offer</h3>
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">Energy Amount (kWh)</label>
				<input type="number" name="energy_amount" value={form.energy_amount} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
			</div>
			<button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Create Offer</button>
		</form>
	);
};

export default OfferForm;
