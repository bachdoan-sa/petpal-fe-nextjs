'use client'
// import node module libraries
import { useState } from 'react';

// // import theme style scss file
// import '../../styles/theme.scss';

// import sub components
import NavbarVertical from './NavbarVertical';
import NavbarTop from './NavbarTop';

import { DashboardMenuItem, DashboardRouter } from '@/src/routes/route.schema';

export default function DashboardLayout({ children, menu }: { children: React.ReactNode; menu: DashboardRouter }) {
	const [showMenu, setShowMenu] = useState(true);
	const ToggleMenu = () => {
		return setShowMenu(!showMenu);
	};

	return (
		<div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
			<div className="navbar-vertical navbar">
				<NavbarVertical
					showMenu={showMenu}
					onClick={(value) => setShowMenu(value)}
					menu={menu}
				/>
			</div>
			<div id="page-content" className=' bg-light'>
				<div className="header">
					<NavbarTop
						data={{
							showMenu: showMenu,
							SidebarToggleMenu: ToggleMenu
						}}
					/>
				</div>

				{children}


			</div>
		</div>
	)
}
