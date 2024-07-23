import React from "react";
import MenuComponent from "@/src/components/menu/Menu";
import UserInfo from "@/src/components/user/UserInfo";
import PetInfo from "@/src/components/user/PetInfo";

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
      <MenuComponent menuItems={menuItems} initialComponent="Pet" />
    </>
  );
}

export default AccountUser;
