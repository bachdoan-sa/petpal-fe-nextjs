"use client";
import React, { useState } from "react";

function AddPetForm() {
  const [petName, setPetName] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  const [neutered, setNeutered] = useState(false);
  const [petPhoto, setPetPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [gender, setGender] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPetPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <div className="row ">
          <div className="col-6 bg--primary d-flex align-items-center text-black justify-content-center">
            <div className="col-12 col-md-6 text-center  p-4">
              <h4></h4>
              <h2>Thông tin của thú cưng</h2>
              <div className="my-4">
                <img
                  src={photoPreview || "https://via.placeholder.com/150"}
                  alt="Pet"
                  className="img-fluid rounded-circle"
                  style={{ width: "150px", height: "150px", border: 5 }}
                />
              </div>
            </div>
          </div>
          <div className="col-6 pt-10 ">
            <div className="mb-4">
              <label htmlFor="petName" className="form-label">
                Tên thú cưng
              </label>
              <input
                type="text"
                className="form-control"
                id="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Enter pet name"
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="birthYear" className="form-label">
                Ngày sinh
              </label>
              <input
                className={`form-control `}
                type="date"
                id="birthYear"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                placeholder="Enter birth year"
              />
              
            </div>
            <div className="mb-4">
              <label htmlFor="size" className="form-label">
                Giới tính
              </label>
              <select
                className="form-select"
                id="size"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Male</option>
                <option value="small">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="breed" className="form-label">
                Giống chó
              </label>
              <input
                type="text"
                className="form-control"
                id="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="Enter breed"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="size" className="form-label">
                Kích thước
              </label>
              <select
                className="form-select"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">Select size</option>
                <option value="small">1-10kg</option>
                <option value="medium">10-20kg</option>
                <option value="large">20kg+</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="neutered" className="form-label">
                Đã triệt sản
              </label>{" "}
              <input
                type="checkbox"
                className="form-check-input"
                id="neutered"
                checked={neutered}
                onChange={(e) => setNeutered(e.target.checked)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="petPhoto" className="form-label">
                Thêm ảnh của thú cưng
              </label>
              <input
                type="file"
                className="form-control"
                id="petPhoto"
                onChange={handlePhotoChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddPetForm;
