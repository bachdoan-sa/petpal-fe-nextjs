'user client'
import React from "react";
import MenuComponent from "@/src/components/menu/Menu";
import UserInfo from "@/src/components/user/UserInfo";
import PetInfo from "@/src/components/user/PetInfo";
import BootstrapMenu from '@/src/components/header/Menu'

function AccountUser() {

  const menuItems = [
    {
      name: "Pet",
      label: "My Pets",
      icon: "bi bi-heart-fill",
      component: <PetInfo />,
    },
    {
      name: "User",
      label: "Account",
      icon: "bi bi-person-circle",
      component: <UserInfo />,
    },
  ];

  return (
    <>
      <BootstrapMenu/>
    </>
  );
}

export default AccountUser;
