'use client'
// import node module libraries
import { useState } from 'react';

// // import theme style scss file
// import '../../styles/theme.scss';

// import sub components
import SideBar from './SideBar';
import Navbar from './Navbar';

export default function DashboardLayout({ children }) {
	const [showMenu, setShowMenu] = useState(true);
	const ToggleMenu = () => {
		return setShowMenu(!showMenu);
	};

	return (
		<div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
			<div className="navbar-vertical navbar">
				<SideBar
					showMenu={showMenu}
					onClick={(value) => setShowMenu(value)}
				/>
			</div>
			<div id="page-content">
				<div className="header">
					<Navbar
						data={{
							showMenu: showMenu,
							SidebarToggleMenu: ToggleMenu
						}}
					/>
				</div>
				<div className="container-fluid px-6 py-4">
					{children}
				</div>

			</div>
		</div>
	)
}
