"use client";
import React, { useEffect, useState } from "react";
import { Search } from "react-feather";
import PetCareCard from "@/src/components/card/CardPetCenter";
import petCenterApiRequest from "@/src/apiRequests/pet-center";
import Image from 'next/image';
import {
  PetCenterListPageBodyType,
  PetCenterListPageResType,
} from "@/src/schemaValidations/petcenter.schema";
// import 

function petCareCenters() {
  const [loading, setLoading] = useState(true);
  const [careCenters, setCareCenters] = useState<
    PetCenterListPageResType["data"]["list"]
  >([]);
  const districtOptions = [
    { value: "", label: "Quận/Huyện" },
    { value: "1", label: "Quận 1" },
    { value: "2", label: "Quận 2" },
    { value: "4", label: "Quận 5" },
    { value: "5", label: "Quận 10" },
    { value: "6", label: "Quận 12" },
    { value: "7", label: "Quận Tân Bình" },
    { value: "8", label: "Quận Gò Vấp" },
    { value: "9", label: "Quận Bình Thạnh" },
    { value: "10", label: "Quận Phú Nhuận" },
    { value: "11", label: "Tp. Thủ Đức" },
    // Thêm các option khác nếu cần
  ];

  const provinceOptions = [
    { value: "", label: "Hồ Chí Minh" },
    { value: "1", label: "Đồng Nai" },
    { value: "2", label: "Bình Dương" },
    { value: "4", label: "Bà Rịa Vũng Tàu" },
    { value: "5", label: "Bến Tre" },
    { value: "6", label: "Long An" },
  ];

  const petCareCenters = [
    {
      imgSrc: "/path/to/image1.jpg",
      title: "Pet Care Center 1",
      description: "Description for Pet Care Center 1",
      mapLink: "https://maps.app.goo.gl/o5VL5a1B3yND17J86",
    },
    {
      imgSrc: "/path/to/image2.jpg",
      title: "Pet Care Center 2",
      description: "Description for Pet Care Center 2",
      mapLink: "https://maps.app.goo.gl/JYEZS6agEh8Kqm4J8",
    },
  ];
  useEffect(() => {
    const fetchCenterData = async () => {
      try {
        const page: PetCenterListPageBodyType = {
          page: 1,
          size: 8,
        };
        const res = await petCenterApiRequest.getListCareCenterWithPage(page);
        const data: PetCenterListPageResType["data"] = res.payload.data;

        setCareCenters(data.list);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenterData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
          {/* <image src={"assets/images/preloader.gif"} alt="Loading..." /> */}
          <Image height={300} width={450} src={"/assets/images/preloader.gif"} alt=""/>
      </div>
  );
  }

  return (
    <>
      <div className="container">
        <div className="pt-10">
          <h1 className="my-4 text-algin-center">Pet Care Centers</h1>
          <div className="d-flex justify-content-center align-items-center">
            <div className="col-auto pl-10">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                {provinceOptions.map((option, index) => (
                  <option
                    key={index}
                    value={option.value}
                    selected={option.value === ""}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                {districtOptions.map((option, index) => (
                  <option
                    key={index}
                    value={option.value}
                    selected={option.value === ""}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row my-4 ">
          {careCenters.map((center, index) => (
            <div key={index} className="d-flex justify-content-center ">
              <PetCareCard
                // imgSrc={center.}
                title={center.careCenterName}
                description={center.description}
                address={center.address}
                // mapLink={center.mapLink}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default petCareCenters;
