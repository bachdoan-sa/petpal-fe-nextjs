import React, { useState } from "react";
import Layout from "../layout/Layout";

import MenuComponent from "../components/menu/Menu";
import Order from "../components/Management/test/Order";
import NavbarVertical from "../admin-components/layouts/NavbarVertical";
import SideBar from "../components/Management/SideBar";

function Management() {
  const role = "Manager";
  const menuItems = [
    {
      name: "Package",
      label: "San Pham",
      icon: "bi bi-box",
      component: <Package />,
    },
    {
      name: "Staff",
      label: "Nhan Vien",
      icon: "bi bi-person-circle",
      component: <Staff />,
    },
    {
      name: "Order",
      label: "Hóa đơn",
      icon: "bi bi-receipt",
      component: <Order />,
    },
  ];

  
    const [showMenu, setShowMenu] = useState(true);
    const ToggleMenu = () => {
      return setShowMenu(!showMenu);
    };
  return (
    <>
      <div className="navbar-vertical navbar">
        <SideBar
          showMenu={showMenu}
          onClick={(value) => setShowMenu(value)}
        />
      </div>
      {/* <MenuComponent
        menuItems={menuItems}
        role={role}
        initialComponent="Package"
      /> */}
    </>
  );
}

export default Management;
