import { cookies } from "next/headers";
import UpdatePetForm from '@/src/components/user/FormPet';
import PetApiRequest from "@/src/apiRequests/pet";
export default async function EditPet({ params }: { params: { id: string } }) {
    const id = params.id;
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value ?? "";
    try {
        const res = await PetApiRequest.getPetById({ petId: id, sessionToken });
        const pet = res.payload.data;
        return (
            <div>
                <UpdatePetForm pet={pet} token={sessionToken} />
            </div>
        );
    } catch (error: any) {
        return (
            <div>
                Không tìm thấy Pet
            </div>
        );
    } 
}