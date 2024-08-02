import PetList from "@/src/components/user/PetList";
import Link from "next/link";
import React from "react";

function PetInfo() {
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
      <PetList />
      <div className="mt-4 d-flex justify-content-center">
        <div className="card mb-3" style={{ maxWidth: "860px" }}>
          <div className="row g-0">
            <div className="col-md-4 hero-img">
              <img
                src="assets/images/pet-contact-1.jpg"
                className="img-fluid rounded-start h-100 w-100"
                alt=""
              />
            </div>
            <div className="col-md-8">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Name: Den</h4>
                  <a>Edit Profile</a>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <h5>Pet type</h5>
                  </div>
                  <div className="col-4">Age: 1 year old</div>
                  <div className="col-4">Weight: 1 kg</div>
                </div>
                <div className="row">
                  <div className="col-4">
                    Gender
                    <br /> Male
                  </div>
                  <div className="col-4">
                    Breed
                    <br /> Chusky
                  </div>
                  <div className="col-4">
                    Desexed
                    <br />
                    No
                  </div>
                </div>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetInfo;
