import React, { useState } from "react";
import TableComponent from "../table/TableComponent";

function Staff() {
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

  const columns = [
    { header: "First", accessor: "first" },
    { header: "Last", accessor: "last" },
    { header: "Handle", accessor: "handle" },
  ];

  const data = [
    { first: "Mark", last: "Otto", handle: "@mdo" },
    { first: "Jacob", last: "Thornton", handle: "@fat" },
    { first: "Larry the Bird", last: "", handle: "@twitter" },
  ];
  return (
    <div
      className="container"
      style={{ maxWidth: "1270px", margin: "20px auto" }}
    >
     

      <div className="d-flex justify-content-between">
      <h1>Danh sách nhân viên</h1>
        <button
          className="btn btn-primary"
          style={{
            height: "auto",
            width: "auto",
            borderRadius: "6px",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Thêm nhân viên
        </button>
      </div>

      <div className="mt-4">
        <TableComponent columns={columns} data={data} />
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

export default Staff;
