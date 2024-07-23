'use client'
import React, { useState } from "react";
import Link from "next/link";

function UserInfo() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOnchangeName = (e) => setName(e.target.value);
  const handleOnchangePhone = (e) => setPhone(e.target.value);
  const handleOnchangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleOnchangeAddress = (e) => setAddress(e.target.value);
  const handleUpdate = () => {
    // Update logic here
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-section pt-10 pb-120">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div
              className="form-wrapper wow fadeInUp"
              data-wow-duration="1.5s"
              data-wow-delay=".2s"
            >
              <div className="form-title">
                <h3>Profile</h3>
                <img />
              </div>
              <form className="w-100">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-inner">
                      <label>Full Name *</label>
                      <input type="email" placeholder="Frist Name" />
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className="form-inner">
                      <label>Last Name *</label>
                      <input type="email" placeholder="Last Name" />
                    </div>
                  </div> */}

                  <div className="col-md-12">
                    <div className="form-inner">
                      <label>Email *</label>
                      <input type="email" placeholder="Enter Your Email" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-inner">
                      <label>Username *</label>
                      <input type="email" placeholder="Enter Your Username" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-inner">
                      <label>Password *</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Create A Password"
                      />
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye" : "bi-eye-slash"
                        }`}
                        id="togglePassword"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-inner">
                      <label>Phone Number *</label>
                      <input
                        type="email"
                        placeholder="Enter Your Phone Number"
                      />
                    </div>
                  </div>
                  {/* <div className="col-md-12">
                    <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                      <div className="form-group">
                        <input type="checkbox" id="html" />
                        <label htmlFor="html">
                          I agree to the Terms &amp; Policy
                        </label>
                      </div>
                    </div>
                  </div> */}
                </div>
                <button className="account-btn">Update Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
    //   <h1
    //     className="text-center"
    //     style={{ color: "#000", fontSize: "18px", margin: "4px 0" }}
    //   >
    //     Thông tin người dùng
    //   </h1>
    //   {/* {avatar && (
    //     <img
    //       src={avatar}
    //       alt="avatar"
    //       className="rounded-circle"
    //       style={{ height: "60px", width: "60px", objectFit: "cover"}}
    //     />
    //   )} */}
    //   <div
    //     className="card p-3"
    //     style={{
    //       width: "650px",
    //       margin: "0 auto",
    //       borderRadius: "10px",
    //       gap: "30px",
    //       display: "flex",
    //       flexDirection: "column",
    //     }}
    //   >
    //     <div className="d-flex align-items-center gap-3">
    //       <label
    //         htmlFor="name"
    //         className="form-label"
    //         style={{
    //           color: "#000",
    //           fontSize: "12px",
    //           lineHeight: "30px",
    //           fontWeight: "600",
    //           width: "100px",
    //           textAlign: "left",
    //         }}
    //       >
    //         Họ Tên
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="name"
    //         value={name}
    //         onChange={handleOnchangeName}
    //         style={{ width: "300px" }}
    //       />
    //       <button
    //         className="btn btn-primary"
    //         onClick={handleUpdate}
    //         style={{
    //           height: "30px",
    //           borderRadius: "4px",
    //           padding: "2px 6px 6px",
    //         }}
    //       >
    //         Cập nhật
    //       </button>
    //     </div>
    //     <div className="d-flex align-items-center gap-3">
    //       <label
    //         htmlFor="phone"
    //         className="form-label"
    //         style={{
    //           color: "#000",
    //           fontSize: "12px",
    //           lineHeight: "30px",
    //           fontWeight: "600",
    //           width: "100px",
    //           textAlign: "left",
    //         }}
    //       >
    //         Số điện thoại
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="phone"
    //         value={phone}
    //         onChange={handleOnchangePhone}
    //         style={{ width: "300px" }}
    //       />
    //       <button
    //         className="btn btn-primary"
    //         onClick={handleUpdate}
    //         style={{
    //           height: "30px",
    //           borderRadius: "4px",
    //           padding: "2px 6px 6px",
    //         }}
    //       >
    //         Cập nhật
    //       </button>
    //     </div>
    //     <div className="d-flex align-items-center gap-3">
    //       <label
    //         htmlFor="avatar"
    //         className="form-label"
    //         style={{
    //           color: "#000",
    //           fontSize: "12px",
    //           lineHeight: "30px",
    //           fontWeight: "600",
    //           width: "100px",
    //           textAlign: "left",
    //         }}
    //       >
    //         Avatar
    //       </label>
    //       <input
    //         type="file"
    //         className="form-control"
    //         id="avatar"
    //         onChange={handleOnchangeAvatar}
    //         style={{ width: "300px" }}
    //       />
    //       {/* {avatar && (
    //         <img
    //           src={avatar}
    //           alt="avatar"
    //           className="rounded-circle"
    //           style={{ height: "60px", width: "60px", objectFit: "cover" }}
    //         />
    //       )} */}
    //       <button
    //         className="btn btn-primary"
    //         onClick={handleUpdate}
    //         style={{
    //           height: "30px",
    //           borderRadius: "4px",
    //           padding: "2px 6px 6px",
    //         }}
    //       >
    //         Cập nhật
    //       </button>
    //     </div>
    //     <div className="d-flex align-items-center gap-3">
    //       <label
    //         htmlFor="address"
    //         className="form-label"
    //         style={{
    //           color: "#000",
    //           fontSize: "12px",
    //           lineHeight: "30px",
    //           fontWeight: "600",
    //           width: "100px",
    //           textAlign: "left",
    //         }}
    //       >
    //         Địa chỉ
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="address"
    //         value={address}
    //         onChange={handleOnchangeAddress}
    //         style={{ width: "300px" }}
    //       />
    //       <button
    //         className="btn btn-primary"
    //         onClick={handleUpdate}
    //         style={{
    //           height: "30px",
    //           borderRadius: "4px",
    //           padding: "2px 6px 6px",
    //         }}
    //       >
    //         Cập nhật
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default UserInfo;
