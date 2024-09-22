import { v4 as uuid } from 'uuid';
import { DashboardMenuItem, DashboardRouter } from './route.schema';


export const PartnerMenu: DashboardMenuItem[] = [
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
	{
		id: uuid(),
		title: 'Quản Lý',
		icon: 'monitor',
		children: [
			{ id: uuid(), link: '/partner/services', name: 'Danh sách dịch vụ' },
		]
	},
	{
		id: uuid(),
		title: 'Setting',
		icon: 'settings',
		link: '/partner'
	},
];
export const PartnerRouter: DashboardRouter = {
	role: "partner",
	route: PartnerMenu,
}
export default PartnerRouter;
