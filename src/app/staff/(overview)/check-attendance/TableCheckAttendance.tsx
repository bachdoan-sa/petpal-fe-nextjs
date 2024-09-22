"use client";
import PetApiRequest from "@/src/apiRequests/pet";
import SearchBar from "@/src/components/admin/search";
import {
  PetListPageBodyType,
  PetListType,
  PetType,
} from "@/src/schemaValidations/pet.schema";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { set } from "zod";

interface PetData {
  id: string | undefined;
  fullName: string;
  modelTitle: string | null | undefined;
  
}

export default function TableCheckAttendance({
  currentPage,
  sessionToken,
  query,
}) {
  const [pets, setPets] = useState<PetData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const body: PetListPageBodyType = {
    page: currentPage,
    size: 10,
  };
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await PetApiRequest.getCareCenterPetList({
          body,
          sessionToken,
        });
        const data = response.payload?.data;
        console.log("data ne: ", data);
        if (data == null) {
          return (
            <>
              <h1>Không có Pets nào cả.</h1>
            </>
          );
        }
        const result = response.payload?.data.list.flatMap(item => 
          item.pet.map(p => ({
            id: p.id,
            fullName: p.fullName,
            modelTitle: item.model.title,
          }))
        );
        setPets(result)
        console.log("data sau: ", result);
      } catch (error: any) {
        console.log(error);
      }
      console.log("data: ", pets);
    };
    fetchAPI();
  }, [currentPage, query]);


  // const [checkStatus, setCheckStatus] = useState<
  //   { checkIn: boolean; checkOut: boolean }[]
  // >([]);

  
  // const handleCheckIn = (index: number) => {
  //   const updatedStatus = [...checkStatus];
  //   updatedStatus[index].checkIn = !updatedStatus[index].checkIn;
  //   setCheckStatus(updatedStatus);
  // };

  // const handleCheckOut = (index: number) => {
  //   const updatedStatus = [...checkStatus];
  //   updatedStatus[index].checkOut = !updatedStatus[index].checkOut;
  //   setCheckStatus(updatedStatus);
  // };

  return (
    <div className="container">
      <div className="row mt-6">
        <SearchBar placeholder={''}/>
        <div className="col-12 mt-10">
          <div className="card">
            <div className="card-header bg-white py-4">
              <h4 className="mb-0">Danh sách gói được sử dụng trong ngày:</h4>
            </div>
            <div className="table-responsive">
              <table className="table text-nowrap mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ borderRadius: "0" }}>Tên thú cưng</th>
                    <th >Gói chăm sóc</th>
                    <th className="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map((pet, index) => (
                    <tr key={index}>
                      <td className="align-middle border-default">
                        <div className="d-flex align-items-center">
                          <div>
                            <div
                              className={`icon-shape icon-md border p-4 rounded-1 ${pet.fullName}`}
                            >
                              {/* <img src={pet.profileImage} alt="" /> */}
                            </div>
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <Link href="#" className="text-inherit">
                                {pet.fullName}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle border-default">
                        <div className="d-flex align-items-center">
                          <div>
                            <div
                              className={``}
                            >
                              {/* <img src={pet.profileImage} alt="" /> */}
                            </div>
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">
                              <Link href="#" className="text-inherit">
                                {pet.modelTitle}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle border-default text-end">
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-primary me-2"
                            // onClick={() => handleCheckIn(index)}
                          >
                            {/* {pet.isCheckIn} */}
                            check In
                          </button>
                          <button
                            className="btn btn-secondary"
                            // onClick={() => handleCheckOut(index)}
                          >
                            {/* {pet.isCheckOut} */}
                            check Out
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="card-footer bg-white text-center">
              
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
