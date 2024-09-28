import Breadcrumb from "@/src/components/breadcrumb/Breadcrumb";
import Page401 from "@/src/components/error/Page401";
import PetList from "@/src/components/user/PetList";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

function PetInfo({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value ?? "";


  const query = searchParams?.query ?? "";
    const currentPage = Number(searchParams?.page ?? 1);
  return (
    <div className="h1-story-area  ">
      <div className="container" >
        <div className="d-flex justify-content-between mb-10 inner-page-banner">
          <h1>Danh sách thú cưng</h1>
          <div>
            <Link legacyBehavior href="/user/pet">
              <button
                className="btn btn-outline-primary"
                style={{
                  height: "auto",
                  width: "auto",
                  borderRadius: "6px",
                  marginRight: "6px",
                }}
                // onClick={() => setIsModalOpen(true)}
              >
                Thêm thú cưng
              </button>
            </Link>
          </div>
        </div>
        {/* <Breadcrumb pageName="" pageTitle="Danh sách thú cưng"/> */}
        {/* <hr/> */}
        <div className="col-12">
          <PetList query={query} currentPage={currentPage} sessionToken={sessionToken}/>
        </div>
      </div>
    </div>
  );
}

export default PetInfo;
