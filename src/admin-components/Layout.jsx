import React from "react";
import Sidebar from "../admin-components/Sidebar";
import Header from "../admin-components/Header";


function Layout({ children }) {
    return (
        <>
            <Header />
            <Sidebar />
            {children}

        </>
    );
}

export default Layout;
