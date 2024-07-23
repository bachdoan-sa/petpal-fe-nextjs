import { v4 as uuid } from 'uuid';


export const ManagerRoutes = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		link: '/manager'
	},  
	
	// {
	// 	id: uuid(),
	// 	title: 'Package',
	// 	icon: 'layers',
	// 	link: '/package'
	// },	
	{
		id: uuid(),
		title: 'Tables',
		icon: 'monitor',
		children: [
			{ id: uuid(), link: '/manager/tables/staffs', name: 'Staff' },
			{ id: uuid(), link: '/manager/tables/packages', name: 'Package' },
		]
	},	
	{
		id: uuid(),
		title: 'Setting',
		icon: 'settings',
		link: '/manager'
	},  
];

export default ManagerRoutes;
