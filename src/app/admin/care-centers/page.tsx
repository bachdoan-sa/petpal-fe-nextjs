import {
    PetCenterListPageResType,
    PetCenterListPageBodyType
} from '@/src/schemaValidations/petcenter.schema'
import {
    PackageBykCenterListPageBodyType,
    PackageListPageResType
} from '@/src/schemaValidations/package/package.schema'
import petCenterApiRequest from '@/src/apiRequests/pet-center';
import { array } from 'zod';
import packageApiRequest from '@/src/apiRequests/package';

export default async function AdminPetCareCenters() {
    const page: PetCenterListPageBodyType = {
        page: 1,
        size: 8
    }
    const res = await petCenterApiRequest.getListCareCenterWithPage(page);
    const data = res.payload.data;
    console.log(res);
    console.log(data);
    const kCenterPackagesBody: PackageBykCenterListPageBodyType = {
        page: 1,
        size: 8,
        careCenterId: '836e7370-e0c3-42fa-fa17-08dca6a5ed5d'
    }
    const packageres = await packageApiRequest.getListPackageByKCenterWithPage(kCenterPackagesBody);
    const Packagedata = packageres.payload.data;
    console.log(packageres);
    console.log(Packagedata);
    return (
        <>
            <div >
                <p> k center list</p>
                {data.list.map((item) => (
                    <div key={item.id} >
                        <p> {item.careCenterName}</p>
                    </div>
                ))}
            </div>
            <div>
                <p> k center package list</p>
                {Packagedata?.packages?.map((item) => (
                    <div key={item.id} >
                        <p> {item.id}</p>
                    </div>
                ))}
            </div>
        </>
    );

}