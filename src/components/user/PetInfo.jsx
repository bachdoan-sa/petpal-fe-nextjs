'use client'
import React, { useState } from "react";

function PetInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    countInStock: "",
    price: "",
    description: "",
    rating: "",
    discount: "",
    image: null,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };
  return (
    <div
      className="container"
      style={{ maxWidth: "1270px", margin: "20px auto" }}
    >
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h1>Danh sách thú cưng</h1>
        <div>
          <button
            className="btn btn-outline-primary"
            style={{
              height: "auto",
              width: "auto",
              borderRadius: "6px",
              marginRight: "6px",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Add A Dog
          </button>
          <button
            className="btn btn-outline-primary"
            style={{
              height: "auto",
              width: "auto",
              borderRadius: "6px",
              marginRight: "6px",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Add A Cat
          </button>
          <button
            className="btn btn-outline-primary"
            style={{
              height: "auto",
              width: "auto",
              borderRadius: "6px",
              marginRight: "6px",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Add A Bird
          </button>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-center">
        <div className="card mb-3" style={{ maxWidth: "860px" }}>
          <div className="row g-0">
            <div className="col-md-4 hero-img">
              <img
                src="assets/images/pet-contact-1.jpg"
                className="img-fluid rounded-start h-100 w-100"
                alt=""
              />
            </div>
            <div className="col-md-8">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Name: Den</h4>
                  <a>Edit Profile</a>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-4"><h5>Pet type</h5></div>
                  <div className="col-4">Age: 1 year old</div>
                  <div className="col-4">
                    Weight: 1 kg
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    Gender
                    <br /> Male
                  </div>
                  <div className="col-4">
                    Breed
                    <br /> Chusky
                  </div>
                  <div className="col-4">
                    Desexed
                    <br />
                    No
                  </div>
                </div>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${isModalOpen ? "show d-block" : ""}`}
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden={!isModalOpen}
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="productModalLabel">
                Thông tin thú cưng
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form id="productForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={handleOnChangeImage}
                    required
                  />
                  {form.image && (
                    <img
                      src={URL.createObjectURL(form.image)}
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginTop: "10px",
                      }}
                      alt="avatar"
                    />
                  )}
                </div>
                <div className="text-end mt-4">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetInfo;
