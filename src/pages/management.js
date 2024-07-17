import React from 'react'
import Layout from '../layout/Layout'
import Package from '../components/Management/Package';
import Staff from '../components/Management/Staff';
import MenuComponent from '../components/menu/Menu';

function Management() {
  const menuItems = [
    { name: 'Package', label: 'San Pham', icon: 'bi bi-box', component: <Package /> },
    { name: 'Staff', label: 'Nhan Vien', icon: 'bi bi-person-circle', component: <Staff /> },
  ];
  return (
    <Layout>
        <MenuComponent menuItems={menuItems} 
       initialComponent="Package" />
    </Layout>
  )
}

export default Management