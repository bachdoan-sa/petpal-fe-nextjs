import { cookies } from "next/headers";

export default async function EditPet({ params }: { params: { id: string } }) {
    const id = params.id;
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value ?? "";
    return (
        <>

        </>
    );
}