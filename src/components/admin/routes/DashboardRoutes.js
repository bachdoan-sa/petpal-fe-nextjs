import { v4 as uuid } from 'uuid';
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Bảng Thống Kê',
		icon: 'home',
		link: '/admin'
	},
	{
		id: uuid(),
		title: 'Thư mục quản lý',
		grouptitle: true
	},
	{
		id: uuid(),
		title: 'Quản lý người dùng',
		icon: 'monitor',
		children: [
			{ id: uuid(), link: '/admin/users', name: 'Danh sách người dùng' },

		]
	},
	{
		id: uuid(),
		title: 'Quản lý đối tác',
		icon: 'monitor',
		children: [
			{ id: uuid(), link: '/admin/partners', name: 'Danh sách đối tác' },
			{ id: uuid(), link: '/admin/partners/pending-partners', name: 'Danh sách chờ duyệt' },


		]
	},
	{
		id: uuid(),
		title: 'Quản lý trung tâm',
		icon: 'monitor',
		children: [
			{ id: uuid(), link: '/admin/care-centers', name: 'Danh sách trung tâm' },

		]
	},

];

export default DashboardMenu;
