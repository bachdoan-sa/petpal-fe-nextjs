import {
    PetCenterListPageResType,
    PetCenterListPageBodyType
} from '@/src/schemaValidations/petcenter.schema'
import petCenterApiRequest from '@/src/apiRequests/pet-center';
import { array } from 'zod';

export default async function AdminPetCareCenters() {
    const page: PetCenterListPageBodyType = {
        page: 1,
        size: 8
    }
    const res = await petCenterApiRequest.getListCareCenterWithPage(page);
    const data = res.payload.data;
    console.log(res);
    console.log(data);
    return (
        <>
            <div >
                {data.list.map((item) => (
                    <div key={item.id} >
                        <p> {item.careCenterName}</p>
                    </div>
                ))}
            </div>
        </>
    );
}