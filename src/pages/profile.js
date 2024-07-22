import React from "react";
import Layout from "../layout/Layout";
import MenuComponent from "../components/menu/Menu";
import UserInfo from "../components/user/UserInfo";
import PetInfo from "../components/user/PetInfo";

function AccountUser(sessionToken) {
  console.log(sessionToken);
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
    <Layout>
      <MenuComponent menuItems={menuItems} initialComponent="Pet" />
    </Layout>
  );
}

export default AccountUser;

export function getServerSideProps({ req, res }) {
  return { props: { sessionToken: req.cookies.sessionToken || "" } }
}