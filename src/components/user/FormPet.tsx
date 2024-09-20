"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  CreatePetBody,
  CreatePetBodyType,
  PetResType,
  PetType,
  UpdatePetBody,
  UpdatePetBodyType,
} from "@/src/schemaValidations/pet.schema";
import PetApiRequest from "@/src/apiRequests/pet";
import { EntityError, HttpError } from "@/src/lib/httpAxios";
import PetTypeApiRequest from "@/src/apiRequests/pet-type";
import {
  PetTypeArray,
  PetTypeListType,
} from "../../schemaValidations/pet-type.schema";
import {
  PetTypeListPageBodyType,
  PetTypeType,
} from "@/src/schemaValidations/pet-type.schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useObjectUrls } from "@/src/hooks/useObjectURL";
import LoadingIcon from "../loading-spinner/loading-spinner";
import Page401 from "../error/Page401";

type Pet = PetResType["data"];

function PetForm({ pet, token }: { pet?: Pet; token: string }) {
  if (token == "" || token == undefined) {
    return (
      <>
        <Page401 />
      </>
    );
  }
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
    console.log("Get Type");
  }, []);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getObjectUrl = useObjectUrls();

  const form = useForm<CreatePetBodyType>({
    resolver: zodResolver(CreatePetBody),
    defaultValues: {
      id: pet?.id ?? "",
      fullName: pet?.fullName ?? "",
      gender: pet?.fullName ?? "MALE",
      petTypeId: pet?.petTypeId,
      profileImage: pet?.profileImage ?? "",
    },
  });
  const [petPhoto, setPetPhoto] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    return () => {
      petPhoto && URL.revokeObjectURL(getObjectUrl(petPhoto));
    };
  }, [petPhoto]);
  const createPet = async (value: CreatePetBodyType) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Fullname", form.getValues("fullName"));
      formData.append(
        "PetTypeId",
        form.getValues("petTypeId")?.toString() ?? ""
      );
      formData.append(
        "Description",
        form.getValues("description")?.toString() ?? ""
      );
      formData.append("Birthday", form.getValues("birthday")?.toString() ?? "");
      formData.append("Weight", form.getValues("weight")?.toString() ?? "0");
      formData.append(
        "Gender",
        form.getValues("gender")?.toString() ?? "Default"
      );
      formData.append("Breed", form.getValues("breed")?.toString() ?? "0");
      formData.append(
        "Sterilise",
        form.getValues("sterilise")?.toString() ?? "false"
      );
      formData.append("file", petPhoto as Blob);
      const updatePet = await PetApiRequest.createPet({
        body: formData,
        sessionToken: token,
      });
    } catch (error: any) {
      console.log(error);
      if (error instanceof HttpError) {
        if (error instanceof EntityError) {
          const errors = error?.payload;
          if (error.status === 422) {
            console.log(errors);
          }
        }
        if (error.status === 400) {
          console.log(error.payload);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const updatePet = async (value: UpdatePetBodyType) => {
    if (value.id === undefined || value.id === "") {
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Fullname", form.getValues("fullName"));
      formData.append(
        "PetTypeId",
        form.getValues("petTypeId")?.toString() ?? ""
      );
      formData.append(
        "Description",
        form.getValues("description")?.toString() ?? ""
      );
      formData.append("Birthday", form.getValues("birthday")?.toString() ?? "");
      formData.append("Weight", form.getValues("weight")?.toString() ?? "0");
      formData.append(
        "Gender",
        form.getValues("gender")?.toString() ?? "Default"
      );
      formData.append("Breed", form.getValues("breed")?.toString() ?? "0");
      formData.append(
        "Sterilise",
        form.getValues("sterilise")?.toString() ?? "false"
      );
      formData.append("file", petPhoto as Blob);
      const updatePet = await PetApiRequest.updatePet({
        body: formData,
        sessionToken: token,
      });
    } catch (error: any) {
      if (error instanceof HttpError) {
        const errors = error?.payload;
        if (error.status === 422) {
          console.log(errors);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  async function onSubmit(values: CreatePetBodyType) {
    if (loading) return;
    if (pet) {
      await updatePet(values);
    } else {
      await createPet(values);
    }
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} style={{ height: "100%" }}>
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
                  <Image
                    src={getObjectUrl(petPhoto)}
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
          <div className="row">
            <div className="mb-4 col-8">
              <label htmlFor="petName" className="form-label">
                Tên thú cưng
              </label>
              <input
                {...form.register("fullName")}
                type="text"
                className="form-control"
                placeholder="Hãy nhập tên thú cưng."
              />
              {form.formState.errors.fullName ? (
                <span className="text-danger font-medium">
                  {form.formState.errors.fullName.message}
                </span>
              ) : null}
            </div>
            <div className="mb-4 col-4">
              <label htmlFor="petTypeId" className="form-label">
                Loại thú cưng
              </label>
              {petTypes.length > 0 ? (
                <select className="form-select" {...form.register("petTypeId")}>
                  {petTypes.map((option, index) => (
                    <option
                      key={index}
                      value={option.id}
                      selected={option.id === form.getValues("petTypeId")}
                    >
                      {option.type}
                    </option>
                  ))}
                </select>
              ) : (
                <>
                  <span className="form-control">
                    {" "}
                    Đang lấy dữ liệu{" "}
                    <Image
                      width={20}
                      height={20}
                      alt=""
                      src="\assets\spinner.svg"
                    />{" "}
                  </span>
                </>
              )}
              {form.formState.errors.petTypeId ? (
                <span className="text-danger font-medium">
                  {form.formState.errors.petTypeId.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className="row">
          <div className="form-group mb-4 col-8">
            <label htmlFor="birthYear" className="form-label">
              Ngày sinh
            </label>
            <input
              className={`form-control `}
              type="date"
              {...form.register("birthday")}
              placeholder=""
            />
            {form.formState.errors.birthday ? (
              <span className="text-danger font-medium">
                {form.formState.errors.birthday.message}
              </span>
            ) : null}
          </div>
          <div className="mb-4 col-4">
            <label htmlFor="gender" className="form-label">
              Giới tính
            </label>
            <select className="form-select" {...form.register("gender")}>
              <option value="MALE">Đực</option>
              <option value="FEMALE">Cái</option>
            </select>
            {form.formState.errors.gender ? (
              <span className="text-danger font-medium">
                {form.formState.errors.gender.message}
              </span>
            ) : null}
          </div>
          </div>
         
          <div className="mb-4">
            <label htmlFor="breed" className="form-label">
              Chủng loại:
            </label>
            <input
              type="text"
              className="form-control"
              {...form.register("breed")}
              placeholder="Hãy nhập chủng thú cưng của bạn."
            />
            {form.formState.errors.breed ? (
              <span className="text-danger font-medium">
                {form.formState.errors.breed.message}
              </span>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="weight" className="form-label">
              Kích thước
            </label>
            <input
              type="number"
              className="form-control"
              {...form.register("weight")}
              placeholder="Hãy nhập cân nặng (theo kilogam)"
            />
            {form.formState.errors.weight ? (
              <span className="text-danger font-medium">
                {form.formState.errors.weight.message}
              </span>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="neutered"
              className="form-label"
              style={{ marginRight: "10px" }}
            >
              Đã bị triệt sản
            </label>
            <input
              type="checkbox"
              className="form-check-input"
              {...form.register("sterilise")}
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
              ref={inputRef}
              className={`form-control`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPetPhoto(file);
                } else {
                  setPetPhoto(null);
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }
              }}
            />
            {form.formState.errors.profileImage ? (
              <span className="text-danger font-medium">
                {form.formState.errors.profileImage.message}
              </span>
            ) : null}
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

export default PetForm;
