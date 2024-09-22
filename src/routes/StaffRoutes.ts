import { v4 as uuid } from 'uuid';
import { DashboardMenuItem } from './route.schema';


export const StaffRoutes: DashboardMenuItem[] = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		link: '/staff'
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
			{ id: uuid(), link: '/staff/staffs', name: 'Staff' },
			{ id: uuid(), link: '/staff/packages', name: 'Package' },
		]
	},
	{
		id: uuid(),
		title: 'Quản lý yêu cầu',
		icon: 'package',
		children: [
			{ id: uuid(), link: '/staff/orders', name: 'Danh sách tổng' },
			{ id: uuid(), link: '/staff/orders/pending-orders', name: 'Danh sách chờ duyệt' },
		]
	},
	{
		id: uuid(),
		title: 'Setting',
		icon: 'settings',
		link: '/staff'
	},
];

export default StaffRoutes;
