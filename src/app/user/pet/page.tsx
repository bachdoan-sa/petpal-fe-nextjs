import Page401 from '@/src/components/error/Page401';
import CreatePetForm from '@/src/components/user/FormPet';
import FormPet from '@/src/components/user/FormPet'
import { cookies } from 'next/headers';
import React from 'react'


export default function petProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value ?? "";

  if (sessionToken == undefined) {
    return (
      //khi het token se hien ra thong bao yeu cau dang nhap lai
      <Page401/>
    );
  }
  return (
    <div>
      <CreatePetForm token={sessionToken}/>
    </div>

  )
}
