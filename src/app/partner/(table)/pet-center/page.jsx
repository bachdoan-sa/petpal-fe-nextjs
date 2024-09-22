"use client";
import { CreateButton } from "@/src/components/admin/table/button";
import PetCareCard from "@/src/components/card/CardPetCenter";
import Link from "next/link";
import React, { useState } from "react";

export default function PetCenter() {
  const petCareCenters = [
    {
      imgSrc: "assets/images/blog/blog-dt-img2.png",
      title: "Pet Care Center 1",
      description: "Description for Pet Care Center 1",
      mapLink: "https://maps.app.goo.gl/o5VL5a1B3yND17J86",
    },
    {
      imgSrc: "assets/images/blog/blog-dt-img2.png",
      title: "Pet Care Center ",
      description: "Description for Pet Care Center 2",
      mapLink: "https://maps.app.goo.gl/JYEZS6agEh8Kqm4J8",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="">
      <div className="d-flex justify-content-between">
        <h1 className="my-4">Pet Care Centers</h1>
        <Link legacyBehavior href="/partner/pet-center/register">
          <button
            className="btn btn-outline-primary align-self-center"
            style={{
              height: "40px",
              width: "auto",
              borderRadius: "6px",
              // borderStyle: "dashed",
              marginRight: "6px",
            }}
          >
            Create Package
          </button>
        </Link>
      </div>
      <hr className="hr hr-blurry" />
      <div className="pt-10">
        {petCareCenters.map((center, index) => (
          <div
            key={index}
            className="col-12 d-flex flex-column align-items-center"
          >
            <PetCareCard
              imgSrc={center.imgSrc}
              title={center.title}
              description={center.description}
              mapLink={center.mapLink}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
