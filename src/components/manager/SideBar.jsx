'use client'
// import node module libraries
import { Fragment, useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive';
// import simple bar scrolling used for notification item scrolling
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// import routes file
import { ManagerRoutes } from '../../routes/ManagerRoutes';
import clsx from 'clsx';
import { inter } from '@/src/fonts/fonts';


function SideBar(props) {
	const location = usePathname();

	const [menuList, setList] = useState();
	useEffect(() => {
		setList(ManagerRoutes);
	}, []);

	const CustomToggle = ({ children, icon, collapseKey }) => {
		return (
			<li className="nav-item">
				<Link
					href="#"
					className="nav-link "
					data-bs-toggle="collapse"
					data-bs-target={collapseKey ? "#" + collapseKey : "#navDashboard"}
					aria-expanded="false"
					aria-controls={collapseKey ? collapseKey : "navDashboard"}>
					{icon ? <i className={`nav-icon fe fe-${icon} me-2`}></i> : ''}{' '}
					{children}
				</Link>
			</li>
		);
	};
	const CustomDropdown = ({ children, collapseKey }) => {
		return (
			<nav id={collapseKey} className="nav-item collapse">
				{children}
			</nav>
		);
	}
	const generateLink = (item) => {
		return (
			(<Link
				href={item.link}
				className={`nav-link ${location === item.link ? 'active' : ''
					}`}
				onClick={(e) =>
					isMobile ? props.onClick(!props.showMenu) : props.showMenu
				}>

				{item.name}
				{''}
				{item.badge ? (
					<span
						className={item.badgecolor ? item.badgecolor : 'badge-primary' + " ms-1 badge"}

					>
						{item.badge}
					</span>
				) : (
					''
				)}

			</Link>)
		);
	};

	const isMobile = useMediaQuery({ maxWidth: 767 });

	return (
		<Fragment>
			<SimpleBar style={{ maxHeight: '100vh' }}>
				<div className="nav-scroller">
					<Link href="/manager" type='button' className="navbar-brand d-flex justify-content-center">
						<p className={clsx(
							'text-xxl font-black m-0 text-white',
							inter,
						)}>Petpal <span className={clsx('text-xxl font-black m-0 text-orange',inter, )}> manager</span></p>

					</Link>
				</div>
				{/* Dashboard Menu */}
				<ul className="navbar-nav flex-column">
					{menuList?.map(function (menu, index) {
						if (menu.grouptitle) {
							return (
								<nav className="nav-item" key={index}>
									{/* group title item */}
									<div className="navbar-heading">{menu.title}</div>
									{/* end of group title item */}
								</nav>
							);
						} else {
							if (menu.children) {
								return (
									<Fragment key={index}>
										{/* main menu / root menu level / root items */}

										<CustomToggle icon={menu.icon} collapseKey={"key" + menu.id}>
											{menu.title}
											{menu.badge ? (
												<span className={(menu.badgecolor ? menu.badgecolor : 'badge-primary') + " ms-1 badge"}>
													{menu.badge}
												</span>
											) : ('')}
										</CustomToggle>
										<CustomDropdown collapseKey={"key" + menu.id} className="nav-item collapse">
											<ul className="nav flex-column">
												{menu.children.map(function (menuLevel1Item, menuLevel1Index) {
													return (
														<li className="nav-item" key={menuLevel1Index}>
															{/* first level menu items */}
															{generateLink(menuLevel1Item)}
															{/* end of first level menu items */}
														</li>
													);

												})}
											</ul>
										</CustomDropdown>
										{/* end of main menu / menu level 1 / root items */}
									</Fragment>
								);
							} else {
								return (
									<nav className="nav-item" key={index}>
										{/* menu item without any childern items like Documentation and Changelog items*/}
										<Link href={menu.link} className={`nav-link ${location === menu.link ? 'active' : ''} ${menu.title === 'Download' ? 'bg-primary text-white' : ''}`}>
											{typeof menu.icon === 'string' ? (
												<i className={`nav-icon fe fe-${menu.icon} me-2`}></i>
											) : (menu.icon)}
											{menu.title}
											{menu.badge ? (
												<span className={(menu.badgecolor ? menu.badgecolor : 'badge-primary') + " ms-1 badge "}>
													{menu.badge}
												</span>
											) : ('')}
										</Link>
										{/* end of menu item without any childern items */}
									</nav>
								);
							}
						}
					})}
				</ul>
				{/* end of Dashboard Menu */}

			</SimpleBar>
		</Fragment>
	);
};

export default SideBar;
