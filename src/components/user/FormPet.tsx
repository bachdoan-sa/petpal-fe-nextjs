"use client";
import React, { useEffect, useState } from "react";
import { PetType } from "@/src/schemaValidations/pet.schema";
import PetApiRequest from "@/src/apiRequests/pet";
import { HttpError } from "@/src/lib/httpAxios";
import PetTypeApiRequest from "@/src/apiRequests/pet-type";
import {
  PetTypeArray,
  PetTypeListType,
} from "../../schemaValidations/pet-type.schema";
import {
  PetTypeListPageBodyType,
  PetTypeType,
} from "@/src/schemaValidations/pet-type.schema";

function AddPetForm({ token }) {
  if (token == "" || token == undefined) {
    return <>chưa có token</>;
  }

 

  const [petName, setPetName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [neutered, setNeutered] = useState(false);
  const [petPhoto, setPetPhoto] = useState<File | null>(null);
  // const [photoPreview, setPhotoPreview] = useState("");
  const [gender, setGender] = useState("MALE");
  const [loading, setLoading] = useState(false);
  const [petTypes, setPetTypes] = useState<PetTypeListType>([]);

  useEffect(() => {
    const getPetType = async () => {
      try {
        const body: PetTypeListPageBodyType = {
          page: 1,
          size: 6,
        };

        const result = await PetTypeApiRequest.getListPetTypeForUser({
          body,
          sessionToken: token,
        });
        setPetTypes(result.payload.data);
      } catch (error) {
        if (error instanceof HttpError) {
          const errors = error?.payload;
          if (error.status === 422) {
            console.log(errors);
          }
        }
      }
    };
    getPetType();
  }, []);

  console.log(petTypes);
  // const [errors, setErrors] = useState({});

  // const handlePhotoChange = (e) => {
  //   const file = e.target.files[0];
  //   setPetPhoto(file);
  //   setPhotoPreview(URL.createObjectURL(file));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const data = new FormData();
    data.append("Fullname", petName);
    data.append("Birthday", birthYear);
    data.append("Weight", weight);
    data.append("Gender", gender);
    data.append("Breed", breed);
    data.append("Sterilise", neutered.toString());
    data.append("file", petPhoto as Blob);
    try {
      const response = await PetApiRequest.createPet({
        body: data,
        sessionToken: token,
      });
      console.log(response);
    } catch (error) {
      if (error instanceof HttpError) {
        const errors = error?.payload;
        if (error.status === 422) {
          console.log(errors);
        }
      }
    }
  };
  console.log(gender);
  console.log(petTypes);

  return (
    <form onSubmit={handleSubmit} style={{ height: "100%" }}>
      {/* <div className="container"> */}
      <div className="row h-100">
        <div className="col-6 d-flex align-items-center text-black justify-content-center">
          <div className="col-12 col-md-6 text-center p-5">
            <h4></h4>
            <h2>Thông tin của thú cưng</h2>
            <div className="my-4">
              {/* <img
                  src={photoPreview || "https://via.placeholder.com/150"}
                  alt="Pet"
                  className="img-fluid rounded-circle"
                  style={{ width: "150px", height: "150px", border: 5 }}
                /> */}
              {petPhoto && (
                <div>
                  <img
                    src={URL.createObjectURL(petPhoto)}
                    width={128}
                    height={128}
                    alt="preview"
                    // className="w-32 h-32 object-cover"
                    className="img-fluid rounded-circle"
                    style={{ width: "150px", height: "150px", border: 5 }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-5 pt-10 ">
          <div className="mb-4">
            <label htmlFor="petName" className="form-label">
              Tên thú cưng
            </label>
            <input
              type="text"
              className="form-control"
              name="petName"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Enter pet name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="weight" className="form-label">
              Loại thú cưng
            </label>
            <select
              className="form-select"
              name="petType"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {petTypes?.map((option, index) => (
                <option key={index}>
                  {option.type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="birthYear" className="form-label">
              Ngày sinh
            </label>
            <input
              className={`form-control `}
              type="date"
              name="birthYear"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="Enter birth year"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="weight" className="form-label">
              Giới tính
            </label>
            <select
              className="form-select"
              name="weight"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="breed" className="form-label">
              Giống chó
            </label>
            <input
              type="text"
              className="form-control"
              name="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder="Enter breed"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="weight" className="form-label">
              Kích thước
            </label>
            <input
              type="number"
              className="form-control"
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
            />
            
          </div>
          <div className="mb-4">
            <label htmlFor="neutered" className="form-label">
              Đã triệt sản
            </label>{" "}
            <input
              type="checkbox"
              className="form-check-input"
              name="neutered"
              checked={neutered}
              onChange={(e) => setNeutered(e.target.checked)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="petPhoto" className="form-label">
              Thêm ảnh của thú cưng
            </label>
            {/* <input
                type="file"
                className="form-control"
                id="petPhoto"
                onChange={handlePhotoChange}
              /> */}
            <input
              type="file"
              name="frontImage"
              accept="image/*"
              // ref={inputFrontRef}
              className={`form-control`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPetPhoto(file);
                }
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
      {/* </div> */}
    </form>
  );
}

export default AddPetForm;
