'use client'
// import node module libraries
import { Fragment, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive';

import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

// import simple bar scrolling used for notification item scrolling
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// import routes file
import { DashboardMenu } from '../routes/DashboardRoutes';

function NavbarVertical(props) {
	const location = usePathname();

	function CustomToggle({ children, eventKey, icon }) {
		const { activeEventKey } = useContext(AccordionContext);
		const decoratedOnClick = useAccordionButton(eventKey, () =>
			console.log('totally custom!')
		);
		const isCurrentEventKey = activeEventKey === eventKey;
		return (
			<li className="nav-item">
				<Link
					href="#"
					className="nav-link "
					onClick={decoratedOnClick}
					data-bs-toggle="collapse"
					data-bs-target="#navDashboard"
					aria-expanded={isCurrentEventKey ? true : false}
					aria-controls="navDashboard">
					{icon ? <i className={`nav-icon fe fe-${icon} me-2`}></i> : ''}{' '}
					{children}
				</Link>
			</li>
		);
	};
	function CustomToggleLevel2({ children, eventKey, icon }) {
		const { activeEventKey } = useContext(AccordionContext);
		const decoratedOnClick = useAccordionButton(eventKey, () =>
			console.log('totally custom!')
		);
		const isCurrentEventKey = activeEventKey === eventKey;
		return (
			(<Link
				href="#"
				className="nav-link "
				onClick={decoratedOnClick}
				data-bs-toggle="collapse"
				data-bs-target="#navDashboard"
				aria-expanded={isCurrentEventKey ? true : false}
				aria-controls="navDashboard">
				{children}
			</Link>)
		);
	};

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
					<Link href="/" className="navbar-brand">
						<img src="assets/images/header1-logo.svg" alt="" />
					</Link>
				</div>
				{/* Dashboard Menu */}
				<Accordion defaultActiveKey="0" as="ul" className="navbar-nav flex-column">
					{DashboardMenu.map(function (menu, index) {
						if (menu.grouptitle) {
							return (
								<div className="nav-item" key={index}>
									{/* group title item */}
									<div className="navbar-heading">{menu.title}</div>
									{/* end of group title item */}
								</div>
							);
						} else {
							if (menu.children) {
								return (
									<Fragment key={index}>
										{/* main menu / root menu level / root items */}
										<CustomToggle eventKey={index} icon={menu.icon}>
											{menu.title}
											{menu.badge ? (
												<span className={(menu.badgecolor ? menu.badgecolor : 'badge-primary') + " ms-1 badge"}>
													{menu.badge}
												</span>
											) : ('')}
										</CustomToggle>
										<Accordion.Collapse eventKey={index} as="li" bsPrefix="nav-item">
											<ul className="nav flex-column">
												{menu.children.map(function (menuLevel1Item, menuLevel1Index) {
													if (menuLevel1Item.children) {
														return (
															<li className="nav-item" key={menuLevel1Index}>
																{/* first level menu started  */}
																<Accordion defaultActiveKey="0" className="navbar-nav flex-column">
																	<CustomToggleLevel2 eventKey={0}>
																		{menuLevel1Item.title}
																		{menuLevel1Item.badge ? (
																			<span className={
																				(menuLevel1Item.badgecolor ? menuLevel1Item.badgecolor : 'badge-primary') + " ms-1 badge "
																			}>
																				{menuLevel1Item.badge}
																			</span>
																		) : ('')}
																	</CustomToggleLevel2>
																	<Accordion.Collapse eventKey={0} bsPrefix="nav-item">
																		<ul className="nav flex-column">
																			{/* second level menu started  */}
																			{menuLevel1Item.children.map(function (menuLevel2Item, menuLevel2Index) {
																				if (menuLevel2Item.children) {
																					return (
																						<li className="nav-item" key={menuLevel2Index}>
																							{/* second level accordion menu started  */}
																							<Accordion defaultActiveKey="0" className="navbar-nav flex-column">
																								<CustomToggleLevel2 eventKey={0}>
																									{menuLevel2Item.title}
																									{menuLevel2Item.badge ? (
																										<span className={
																											(menuLevel2Item.badgecolor ? menuLevel2Item.badgecolor : 'badge-primary')+ " ms-1 badge"}>
																											{menuLevel2Item.badge}
																										</span>
																									) : ('')}
																								</CustomToggleLevel2>
																								<Accordion.Collapse eventKey={0} bsPrefix="nav-item">
																									<ul className="nav flex-column">
																										{/* third level menu started  */}
																										{menuLevel2Item.children.map(function (menuLevel3Item, menuLevel3Index) {
																											return (
																												<li key={menuLevel3Index} className="nav-item">
																													{generateLink(menuLevel3Item)}
																												</li>
																											);
																										})}
																										{/* end of third level menu  */}
																									</ul>
																								</Accordion.Collapse>
																							</Accordion>
																							{/* end of second level accordion */}
																						</li>
																					);
																				} else {
																					return (
																						<li key={menuLevel2Index} className="nav-item">
																							{generateLink(menuLevel2Item)}
																						</li>
																					);
																				}

																			})}
																			{/* end of second level menu  */}
																		</ul>
																	</Accordion.Collapse>
																</Accordion>
																{/* end of first level menu */}
															</li>
														);
													} else {
														return (
															<li className="nav-item" key={menuLevel1Index}>
																{/* first level menu items */}
																{generateLink(menuLevel1Item)}
																{/* end of first level menu items */}
															</li>
														);
													}
												})}
											</ul>
										</Accordion.Collapse>
										{/* end of main menu / menu level 1 / root items */}
									</Fragment>
								);
							} else {
								return (
									<div className="nav-item" key={index}>
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
									</div>
								);
							}
						}
					})}
				</Accordion>
				{/* end of Dashboard Menu */}

			</SimpleBar>
		</Fragment>
	);
};

export default NavbarVertical;
