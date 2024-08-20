import Breadcrumb from "@/src/components/breadcrumb/Breadcrumb";
import PetList from "@/src/components/user/PetList";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

function PetInfo() {
  // const cookieStore = cookies();
  // const sessionToken = cookieStore.get('sessionToken')?.value ?? "";

  return (
    <div className="h1-story-area  position-relative">
      <div className="container" style={{ maxWidth: "1270px" }}>
        <div className="d-flex justify-content-between mb-10 inner-page-banner">
          <h1>Danh sách thú cưng</h1>
          <div>
            <Link legacyBehavior href="/pet">
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
        <div className="d-flex justify-content-center ">
          <PetList />
        </div>
      </div>
    </div>
  );
}

export default PetInfo;
