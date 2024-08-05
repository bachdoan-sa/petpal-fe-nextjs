import AddPetForm from '@/src/components/user/FormPet';
import FormPet from '@/src/components/user/FormPet'
import { cookies } from 'next/headers';
import React from 'react'


export default function petProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value ?? "";
  return (
    <div>
      <AddPetForm token={sessionToken}/>
    </div>

  )
}
