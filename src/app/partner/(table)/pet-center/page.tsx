
import Breadcrumbs from "@/src/components/admin/breadcrumbs";
import SearchBar from "@/src/components/admin/search";
import { CreateButton } from "@/src/components/admin/table/button";
import PetCareCard from "@/src/components/card/CardPetCenter";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import KCenterTable from "./kcenterTable";

export default function PetCenter({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page ?? 1);
  return (
    <>
      <div className="container-fluid px-6 py-4">


        <div className="d-flex w-100 align-items-center justify-content-between">
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Danh sách', href: '/partner/pet-centers', active: true }
            ]}
          />
        </div>
        <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
          <Suspense>
            <SearchBar placeholder="Search Pet Care center..." />
          </Suspense>
          <CreateButton link={"care-centers/create"} title="Tạo mới" />
        </div>
        <KCenterTable query={query} currentPage={currentPage} />
      </div>
    </>
  );
}
// export default function PetCenter() {
//   const petCareCenters = [
//     {
//       imgSrc: "assets/images/blog/blog-dt-img2.png",
//       title: "Pet Care Center 1",
//       description: "Description for Pet Care Center 1",
//       mapLink: "https://maps.app.goo.gl/o5VL5a1B3yND17J86",
//     },
//     {
//       imgSrc: "assets/images/blog/blog-dt-img2.png",
//       title: "Pet Care Center ",
//       description: "Description for Pet Care Center 2",
//       mapLink: "https://maps.app.goo.gl/JYEZS6agEh8Kqm4J8",
//     },
//   ];
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   return (
//     <div className="">
//       <div className="d-flex justify-content-between">
//         <h1 className="my-4">Pet Care Centers</h1>
//         <Link legacyBehavior href="/partner/pet-center/register">
//           <button
//             className="btn btn-outline-primary align-self-center"
//             style={{
//               height: "40px",
//               width: "auto",
//               borderRadius: "6px",
//               // borderStyle: "dashed",
//               marginRight: "6px",
//             }}
//           >
//             Create Package
//           </button>
//         </Link>
//       </div>
//       <hr className="hr hr-blurry" />
//       <div className="pt-10">
//         {petCareCenters.map((center, index) => (
//           <div
//             key={index}
//             className="col-12 d-flex flex-column align-items-center"
//           >
//             <PetCareCard
//               imgSrc={center.imgSrc}
//               title={center.title}
//               description={center.description}
//               mapLink={center.mapLink}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
