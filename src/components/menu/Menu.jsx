'use client'
import React, { useState } from 'react';

const MenuComponent = ({ menuItems, initialComponent, role }) => {
  const [activeComponent, setActiveComponent] = useState(initialComponent);

  const renderComponent = () => {
    const activeItem = menuItems.find((item) => item.name === activeComponent);
    return activeItem ? activeItem.component : <div>Content area...</div>;
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 menu-profile">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white ">
            <h1
              href="/"
              class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span class="fs-5 d-none d-sm-inline">{role}</span>
            </h1>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {menuItems.map((item) => (
                <li className="nav-item" key={item.name}>
                  <a
                    onClick={() => setActiveComponent(item.name)}
                    className="nav-link align-middle px-0"
                  >
                    <i className={`fs-4 ${item.icon}`}></i>
                    {"  "}
                    <span className="ms-1 d-none d-sm-inline">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <hr />
          </div>
        </div>
        <div className="col py-3">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default MenuComponent;
