"use client";
import PetApiRequest from "@/src/apiRequests/pet";
import SearchBar from "@/src/components/admin/search";
import { useObjectUrls } from "@/src/hooks/useObjectURL";
import {
  PetListPageBodyType,
  PetListType,
  PetType,
} from "@/src/schemaValidations/pet.schema";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { set } from "zod";

interface PetData {
  id: string | undefined;
  fullName: string;
  modelTitle: string | null | undefined;
  isCheckIn: boolean | undefined;
  isCheckOut: boolean | undefined;
}

export default function TableCheckAttendance({
  currentPage,
  sessionToken,
  query,
}) {
  const [pets, setPets] = useState<PetData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [petPhoto, setPetPhoto] = useState<File | null>(null);

  const body: PetListPageBodyType = {
    page: currentPage,
    size: 10,
  };
  const getObjectUrl = useObjectUrls();

  useEffect(() => {
    petPhoto && console.log(getObjectUrl(petPhoto));
    return () => {
      petPhoto && URL.revokeObjectURL(getObjectUrl(petPhoto));
    };
  }, [petPhoto]);
  
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
        const result = response.payload?.data.list.flatMap((item) =>
          item.pet.map((p) => ({
            id: p.id,
            fullName: p.fullName,
            modelTitle: item.model.title,
            isCheckIn: p.isCheckIn,
            isCheckOut: p.isCheckOut,
          }))
        );
        setPets(result);
        console.log("data sau: ", result);
      } catch (error: any) {
        console.log(error);
      }
      console.log("data: ", pets);
    };
    fetchAPI();
  }, [currentPage, query]);

  useEffect(() => {
    const CheckAttendentApi = async () => {
      try {
        
      } catch (error) {
        
      }
    };
  });

  return (
    <div className="container">
      <div className="row mt-6">
        <SearchBar placeholder={""} />
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
                    <th>Gói chăm sóc</th>
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
                            <div className={``}>
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
                            type="button"
                            className="btn btn-primary me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            data-bs-whatever={pet.fullName}
                          >
                            {pet.isCheckIn ? "Đã Check In" : "Check In"}{" "}
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            {pet.isCheckOut ? "Đã Check Out" : "Check Out"}{" "}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal title 
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center mb-4">
                {petPhoto && (
                  <div>
                    <Image
                      src={getObjectUrl(petPhoto)}
                      width={128}
                      height={128}
                      alt="preview"
                      // className="w-32 h-32 object-cover"
                      className="img-fluid"
                      style={{ width: "200px", height: "200px", border: 5 }}
                    />
                  </div>
                )}
              </div>

              <input
                type="file"
                name="frontImage"
                accept="image/*"
                className={`form-control`}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPetPhoto(file);
                  } else {
                    setPetPhoto(null);
                    // if (inputRef.current) {
                    //   inputRef.current.value = "";
                    // }
                  }
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
