import { cookies } from 'next/headers';
import RegisterFrom from './register-form';
export default function RegisterPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value ?? "";
  return (
    <>
      <RegisterFrom token={sessionToken}/>
    </>
  )
}
