import PetApiRequest from "@/src/apiRequests/pet";
import { HttpError } from "@/src/lib/httpAxios";
import {
  PetListPageBodyType,
  PetType,
} from "@/src/schemaValidations/pet.schema";
import { cookies } from "next/headers";
import React from "react";

export default async function PetList({ query, currentPage = 1 }) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  const body: PetListPageBodyType = {
    page: currentPage,
    size: 20,
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
  } catch (error) {
    if (error instanceof HttpError) {
      const errors = error?.payload;
      if (error.status === 422) {
        console.log(errors);
      }
    }
  }
  console.log(pets);
  return (
    <div className="row">
      {pets.map((pet) => (
        <div className="" key={pet.id}>
          <div className="card mb-3" style={{ maxWidth: "860px" }}>
            <div className="row g-0">
              <div className="col-md-4 position-relative ">
                <img
                  style={{ height: "100%", objectFit: "cover", width: "100%" }}
                  src={pet.profileImage}
                  className="img-fluid rounded-start"
                />
              </div>
              <div className="col-md-8">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="card-title fw-bold">{pet.fullName}</h4>
                    <a>Edit Profile</a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-4">
                      <h4>Pet type</h4>
                    </div>
                    <div className="col-4">Age: 1 year old</div>
                    <div className="col-4">Weight: {pet.weight}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      Gender: {pet.gender}
                    </div>
                    <div className="col-4">
                      Breed :
                  {pet.breed}
                    </div>
                    <div className="col-4">
                      Desexed
                      : 
                      No
                    </div>
                  </div>
                  <hr />
                  <p className="card-text">
                    <small className="text-muted">{pet.description}</small>
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
