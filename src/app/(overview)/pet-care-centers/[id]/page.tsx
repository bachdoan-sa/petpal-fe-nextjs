'use client'
import packageApiRequest from '@/src/apiRequests/package';
import ShopCard from '@/src/components/shop/ShopCard';
import { PackageListType } from '@/src/schemaValidations/package/package.schema';
import { useEffect, useState } from 'react';

const CareCenterDetail = ({params} : {params : {id : string}}) => {
  // const router = useRouter();
  // const { id } = router.query;
  const id = params.id
  const [packages, setPackages] = useState<PackageListType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPackages = async () => {
        try {
          const kCenterPackagesBody = {
            page: 1,
            size: 8,
            careCenterId: id,
          };
          const packageres = await packageApiRequest.getListPackageByKCenterWithPage(kCenterPackagesBody);
          setPackages(packageres.payload.data.list);
          console.log('data : ' , packages)
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchPackages();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Packages for Care Center </h1>
      <div className="row  g-4 justify-content-center">
        {/* {packages?.map((pkg, index) => (
          <div key={index} className="d-flex justify-content-center">
            <div className="card mb-3" style={{ width: "860px" }}>
              <div className="card-body">
                <h5 className="card-title">{pkg.id}</h5>
                <p className="card-text">{pkg.description}</p>
                <p className="card-text">Price: {pkg.totalPrice}</p>
              </div>
            </div>
          </div>
        ))} */}
        <ShopCard/>
      </div>
    </div>
  );
};

export default CareCenterDetail;
