import PetApiRequest from "@/src/apiRequests/pet";
import {
  PetListPageBodyType,
  PetType,
} from "@/src/schemaValidations/pet.schema";
import { cookies } from "next/headers";
import React from "react";

export default async function PetList({ query, currentPage }) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  const body: PetListPageBodyType = {
    page: currentPage,
    size: 6,
  };
  let pets: PetType[] = [];
  let totalPages: number = 1;
  try {
    const response = await PetApiRequest.getListPetForUser({
      body,
      sessionToken,
    });
    totalPages = response.payload?.data?.paging?.maxPage;
    pets = response.payload?.data?.list;
  } catch (error: any) {
    console.log(error);
  }
  return (
    <div>
      {pets.map((pet) => (
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
                    <h4 className="card-title">Name: {pet.fullname}</h4>
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
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
