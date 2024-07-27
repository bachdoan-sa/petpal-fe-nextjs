import { v4 as uuid } from 'uuid';


export const PartnerRouter = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		link: '/partner'
	},  
	{
		id: uuid(),
		title: 'Pet Care Center',
		icon: 'home',
		link: '/partner/pet-center'
	},  
	// {
	// 	id: uuid(),
	// 	title: 'Package',
	// 	icon: 'layers',
	// 	link: '/package'
	// },	
	// {
	// 	id: uuid(),
	// 	title: 'Tables',
	// 	icon: 'monitor',
	// 	children: [
	// 		{ id: uuid(), link: '/manager/tables/staffs', name: 'Staff' },
	// 		{ id: uuid(), link: '/manager/tables/packages', name: 'Package' },
	// 	]
	// },	
	{
		id: uuid(),
		title: 'Setting',
		icon: 'settings',
		link: '/partner'
	},  
];

export default PartnerRouter;
