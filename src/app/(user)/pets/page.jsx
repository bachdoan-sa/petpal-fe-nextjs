import PetList from "@/src/components/user/PetList";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

function PetInfo() {
  // const cookieStore = cookies();
  // const sessionToken = cookieStore.get('sessionToken')?.value ?? "";

  return (
    <div
      className="container"
      style={{ maxWidth: "1270px", margin: "20px auto" }}
    >
      <div className="d-flex justify-content-between align-items-center mt-3">
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
          {/* <button
            className="btn btn-outline-primary"
            style={{
              height: "auto",
              width: "auto",
              borderRadius: "6px",
              marginRight: "6px",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Add A Cat
          </button>
          <button
            className="btn btn-outline-primary"
            style={{
              height: "auto",
              width: "auto",
              borderRadius: "6px",
              marginRight: "6px",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Add A Bird
          </button> */}
        </div>
      </div>
      <hr/>
      <div className="d-flex justify-content-center ">
        <PetList />
      </div>
    </div>
  );
}

export default PetInfo;
