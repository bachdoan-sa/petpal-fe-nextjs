import React from 'react'
import Package from '@/src/components/Management/Package';
import Staff from '@/src/components/Management/Staff';
import MenuComponent from '@/src/components/menu/Menu';

function Management() {
  const menuItems = [
    { name: 'Package', label: 'San Pham', icon: 'bi bi-box', component: <Package /> },
    { name: 'Staff', label: 'Nhan Vien', icon: 'bi bi-person-circle', component: <Staff /> },
  ];
  return (
    <>
        <MenuComponent menuItems={menuItems} 
       initialComponent="Package" />
    </>
  )
}

export default Management