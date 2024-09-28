"use client";
import PetApiRequest from "@/src/apiRequests/pet";
import { HttpError } from "@/src/lib/httpAxios";
import {
  PetListPageBodyType,
  PetType,
} from "@/src/schemaValidations/pet.schema";
import { usePetStore } from "@/src/store/pet-store";
import Link from "next/link";
import React, { useEffect } from "react";

export default function PetList({ query, currentPage, sessionToken }) {
  const { setPets, setTotalPages } = usePetStore();
  const { pets } = usePetStore();
  console.log(pets);
  const body: PetListPageBodyType = {
    page: currentPage,
    size: 10,
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await PetApiRequest.getListPetForUser({
          body,
          sessionToken,
        });
        setTotalPages(response.payload?.data?.paging?.maxPage);
        setPets(response.payload?.data?.list);
      } catch (error) {
        if (error instanceof HttpError) {
          const errors = error?.payload;
          if (error.status === 422) {
            console.log(errors);
          }
        }
      }
      console.log(pets);
    };
    fetchApi();
  }, [currentPage]);

  return (
    <div className="">
   
      {pets.map((pet) => (
        <div className="" key={pet.id}>
          <div className="card mb-3" style={{ maxHeight: "200px" }}>
            <div className="row g-0">
              <div className="col-md-2 position-relative ">
                <img
                  src={pet.profileImage}
                  className="img-fluid rounded-start avatar-image"
                />
              </div>
              <div className="col-md-10">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="card-title fw-bold">{pet.fullName}</h4>
                    <Link className="btn btn-dark" href={`/user/pets/${pet.id}/edit`}>Edit Profile</Link>
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
                    <div className="col-4">Gender: {pet.gender}</div>
                    <div className="col-4">Breed :{pet.breed}</div>
                    <div className="col-4">Desexed : No</div>
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
