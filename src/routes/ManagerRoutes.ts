import { v4 as uuid } from 'uuid';
import { DashboardMenuItem, DashboardRouter } from './route.schema';


export const ManagerMenu: DashboardMenuItem[] = [
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
			{ id: uuid(), link: '/manager/staffs', name: 'Staff' },
			{ id: uuid(), link: '/manager/packages', name: 'Package' },
		]
	},
	{
		id: uuid(),
		title: 'Quản lý yêu cầu',
		icon: 'package',
		children: [
			{ id: uuid(), link: '/manager/orders', name: 'Danh sách tổng' },
			{ id: uuid(), link: '/manager/orders/pending-orders', name: 'Danh sách chờ duyệt' },
		]
	},
	{
		id: uuid(),
		title: 'Setting',
		icon: 'settings',
		link: '/manager'
	},
];
export const ManagerRouter: DashboardRouter = {
	role: "manager",
	route: ManagerMenu,
}

export default ManagerRouter;
