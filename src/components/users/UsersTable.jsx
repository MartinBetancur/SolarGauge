import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const userData = [
	{ id: 1, name: "Residential Solar Energy", email: "john@example.com", amount: "2500 kWh", date: "15/01" },
	{ id: 2, name: "Commercial Wind Energy", email: "alice@company.com", amount: "3000 kWh", date: "22/02" },
	{ id: 3, name: "Hydroelectric Plant", email: "bob@hydro.com", amount: "4000 kWh", date: "09/03" },
	{ id: 4, name: "Geothermal Power", email: "carol@geothermal.org", amount: "1200 kWh", date: "12/04" },
	{ id: 5, name: "Biomass Energy", email: "dave@biomass.org", amount: "1000 kWh", date: "03/05" },
	{ id: 6, name: "Tidal Energy Project", email: "eve@tidalproject.net", amount: "1500 kWh", date: "27/06" },
	{ id: 7, name: "Offshore Wind Energy", email: "frank@offshorewind.com", amount: "2800 kWh", date: "11/07" },
	{ id: 8, name: "Nuclear Power", email: "george@nuclearpower.com", amount: "5000 kWh", date: "20/08" },
	{ id: 9, name: "Hydrogen Energy", email: "helen@hydrogenenergy.com", amount: "2200 kWh", date: "02/09" },
	{ id: 10, name: "Wave Energy", email: "ian@waveenergy.com", amount: "1900 kWh", date: "29/10" },
	{ id: 11, name: "Geothermal District Heating", email: "jane@geothermalheat.org", amount: "1400 kWh", date: "08/11" },
	{ id: 12, name: "Solar Thermal Energy", email: "kate@solarthermal.com", amount: "1600 kWh", date: "24/12" }
];

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(userData);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Sales & Users</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search users...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Product Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Shopper Email
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								kWh Amount
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Date
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((user) => (
							<motion.tr
								key={user.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
												{user.name.charAt(0)}
											</div>
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{user.name}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.email}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
										{user.amount}
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.date === "Active"
												? "bg-green-800 text-green-100"
												: "bg-red-800 text-red-100"
										}`}
									>
										{user.date}
									</span>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default UsersTable;