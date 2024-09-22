import { v4 as uuid } from 'uuid';


export const StaffRoutes = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		link: '/staff'
	},  
	
	{
		id: uuid(),
		title: 'Check Attendance',
		icon: 'monitor',
		link: '/staff/check-attendance'
	},	
	{
		id: uuid(),
		title: 'Daily Service',
		icon: 'layers',
		link: '/staff/daily-service'
	},	
	// {
	// 	id: uuid(),
	// 	title: 'Tables',
	// 	icon: 'monitor',
	// 	children: [
	// 		{ id: uuid(), link: '/staff/check-attendance', name: 'Staff' },
	// 		{ id: uuid(), link: '/staff/daily-service', name: 'Package' },
	// 	]
	// },	
	// {
	// 	id: uuid(),
	// 	title: 'Quản lý yêu cầu',
	// 	icon: 'package',
	// 	children: [
	// 		{ id: uuid(), link: '/staff/orders', name: 'Danh sách tổng' },
	// 		{ id: uuid(), link: '/staff/orders/pending-orders', name: 'Danh sách chờ duyệt' },
	// 	]
	// },	
	{
		id: uuid(),
		title: 'Setting',
		icon: 'settings',
		link: '/staff'
	},  
];

export default StaffRoutes;
