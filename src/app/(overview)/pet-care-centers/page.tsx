"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Search } from "react-feather";
import PetCareCard from "@/src/components/card/CardPetCenter";
import petCenterApiRequest from "@/src/apiRequests/pet-center";
import Image from "next/image";
import {
  PetCenterListPageBodyType,
  PetCenterListPageResType,
} from "@/src/schemaValidations/petcenter.schema";
import Breadcrumb from "@/src/components/breadcrumb/Breadcrumb";
import SearchBar from "@/src/components/admin/search";
import Pagination from "@/src/components/admin/table/pagination";
// import

function petCareCenters({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const [loading, setLoading] = useState(true);
  const [careCenters, setCareCenters] = useState<
    PetCenterListPageResType["data"]["list"]
  >([]);
  const [totalPages, setTotalPages] = useState(1);
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
  ];

  const provinceOptions = [
    { value: "", label: "Hồ Chí Minh" },
    { value: "1", label: "Đồng Nai" },
    { value: "2", label: "Bình Dương" },
    { value: "4", label: "Bà Rịa Vũng Tàu" },
    { value: "5", label: "Bến Tre" },
    { value: "6", label: "Long An" },
  ];
  const query = searchParams?.query || "";
  console.log("ok ay ko"+JSON.stringify(searchParams))
  const currentPage = Number(searchParams?.page) || 1;
  useEffect(() => {
    const fetchCenterData = async () => {
      try {
        const page: PetCenterListPageBodyType = {
          page: currentPage,
          size: 6,
          search:searchParams?.query
        };
        const res = await petCenterApiRequest.getListCareCenterWithPage(page);
        const data: PetCenterListPageResType["data"] = res.payload.data;
        setTotalPages(res.payload.data.paging.maxPage);
        console.log(data.paging.maxPage);
        setCareCenters(data.list);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenterData();
  }, [currentPage, query]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Image
          height={300}
          width={450}
          src={"/assets/images/preloader.gif"}
          alt=""
          unoptimized
        />
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName="" pageTitle="Pet Care Centers" />
      <div className=" h1-testimonial-area">
        <div className=" pt-10 px-40">
          <div className="multiselect-bar">
            <h6>Tìm kiếm địa chỉ </h6>
            <div className="search-bar">
              <Suspense>
                <SearchBar placeholder={`Nhập địa chỉ chung cư bạn đang ở`} />
              </Suspense>
            </div>
            <div className="multiselect-area">
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
        <hr className="hr hr-blurry" />

        <div className="pt-10 ">
          {careCenters.map((center, index) => (
            <div key={index} className="d-flex justify-content-center">
              <PetCareCard
                id={center.id}
                imgSrc={center.listImages}
                title={center.careCenterName}
                description={center.description}
                address={center.address}
                // mapLink={center.mapLink}
              />
            </div>
          ))}
        </div>
        <div className="mt-5 d-flex w-100 justify-content-center">
          <Suspense>
            <Pagination totalPages={totalPages} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default petCareCenters;
