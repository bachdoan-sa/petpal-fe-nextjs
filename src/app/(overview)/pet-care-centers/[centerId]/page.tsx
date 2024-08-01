"use client";
import packageApiRequest from "@/src/apiRequests/package";
import ShopCard from "@/src/components/shop/ShopCard";
import { PackageListType } from "@/src/schemaValidations/package/package.schema";
import Link from "next/link";
import { useEffect, useState } from "react";

const CareCenterDetail = ({ params }: { params: { centerId: string } }) => {
  // const router = useRouter();
  // const { centerId } = router.query;
  const centerId = params.centerId;
  const [packages, setPackages] = useState<PackageListType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (centerId) {
      const fetchPackages = async () => {
        try {
          const kCenterPackagesBody = {
            page: 1,
            size: 8,
            careCenterId: centerId,
          };
          const packageres =
            await packageApiRequest.getListPackageByKCenterWithPage(
              kCenterPackagesBody
            );
          setPackages(packageres.payload.data.list);
          console.log("data : ", packages);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchPackages();
    }
  }, [centerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Packages for Care Center </h1>
      <div className="row  g-4 justify-content-center">
        {packages?.map((item) => {
          return (
            <div key={item.id} className="col-lg-4 col-md-4 col-sm-6">
              <div className="collection-card">
                {/* {tag == "" ? (
                ""
              ) : (
                <div
                  className={
                    tag_badge === "" ? "offer-card" : `offer-card ${tag_badge}`
                  }
                >
                  <span>{tag}</span>
                </div>
              )} */}
                <div className="collection-img">
                  {/* <img className="img-gluid" src={img} alt="" /> */}
                  <div className="view-dt-btn">
                    <div className="plus-icon">
                      <i className="bi bi-plus" />
                    </div>
                    <Link legacyBehavior href={`${centerId}/package/${item.id}`}>
                      <a>View Details</a>
                    </Link>
                  </div>
                  {/* <ul className="cart-icon-list">
                    <li>
                      <a href="#">
                        <img src="assets/images/icon/Icon-cart3.svg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="assets/images/icon/Icon-favorites3.svg"
                          alt=""
                        />
                      </a>
                    </li>
                  </ul> */}
                </div>
                <div className="collection-content text-center">
                  <h4>
                    <Link legacyBehavior href="/shop-details">
                      <a>{item.description}</a>
                    </Link>
                  </h4>
                  <div className="price">
                    <h6>${item.totalPrice}</h6>
                    {/* <del>${regular_price}</del> */}
                  </div>
                  <div className="review">
                    <ul>
                      <li>
                        <i className="bi bi-star-fill" />
                      </li>
                      <li>
                        <i className="bi bi-star-fill" />
                      </li>
                      <li>
                        <i className="bi bi-star-fill" />
                      </li>
                      <li>
                        <i className="bi bi-star-fill" />
                      </li>
                      <li>
                        <i className="bi bi-star-fill" />
                      </li>
                    </ul>
                    {/* <span>({review})</span> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareCenterDetail;
