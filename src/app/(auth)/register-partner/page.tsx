"use client";
import authApiRequest from "@/src/apiRequests/auth";
import {
  RegisterBodyType,
  RegisterPartnerBodyType,
} from "@/src/schemaValidations/auth.schema";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../../app-provider";
import { useRouter } from "next/navigation";
import { HttpError } from "@/src/lib/httpAxios";

export default function RegisterPartner() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAppContext();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (formData) => {
    const {
      first,
      last,
      username,
      email,
      address,
      phoneNumber,
      password,
      confirmPassword,
      accountNumber,
      month,
      year,
      name,
    } = Object.fromEntries(formData.entries());

    if (
      !first ||
      !last ||
      !username ||
      !email ||
      !address ||
      !phoneNumber ||
      !password ||
      !confirmPassword ||
      !accountNumber ||
      !month ||
      !year ||
      !name
    ) {
      toast.error("All fields are required");
      return false;
    }

    if (username.length < 8 || username.length > 16) {
      toast.error("Username must be between 8 and 15 characters");
      return false;
    }

    if (password.length < 8 || password.length > 10) {
      toast.error("Password must be between 8 and 15 characters");
      return false;
    }

    // if (phoneNumber.length !== 10) {
    //   toast.error("Phone number must be 10 digits");
    //   return false;
    // }

    if (accountNumber.length !== 16) {
      toast.error("Account number must be 16 digits");
      return false;
    }

    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (monthNum < 1 || monthNum > 12) {
      toast.error("Month must be between 1 and 12");
      return false;
    }

    const currentYear = new Date().getFullYear() % 100;
    if (yearNum < currentYear) {
      toast.error("Year must be greater than or equal to the current year");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  async function register(event) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    // if (!validateForm(formData)) {
    //   setLoading(false);
    //   return;
    // }
    const first = formData.get("first-name") as string;
    const last = formData.get("last-name") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const username = formData.get("username") as string;
    const address = formData.get("address") as string;
    const phoneNumber = formData.get("phone-number") as string;
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const accountNumber = formData.get("accountNumber") as string;
    const MM = formData.get("MM") as string;
    const YY = formData.get("YY") as string;
    // const body = JSON.stringify({ username, password });
     console.log(formData);
    //va

    const registerForm: RegisterPartnerBodyType = {
      partner: {
        username: username,
        fullname: first + " " + last,
        email: email,
        address: address ? address : "",
        phoneNumber: phoneNumber ? phoneNumber : "",
        password: password,
        confirmPassword: confirmPassword,
      },
      payment: {
        name: name,
        accountNumber: accountNumber,
        expiryAt: MM + "/" + YY,
      },
    };
    console.log(registerForm);
    try {
      // const result = await loginRequest(body);
      const result = await authApiRequest.registerPartner(registerForm);
      const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
      console.log(result);

      //setcookie
      // await authApiRequest.auth({
      //   sessionToken: result.payload.data.token,
      //   sessionRole: result.payload.data.role,
      //   expiresAt: expires,
      // });
      // setUser({
      //   id: result.payload.data.name,
      //   name: result.payload.data.name,
      //   role: result.payload.data.role,
      // });
      // router.push("/");
      router.refresh();
      toast.success("Tài khoản đang được duyệt!");
    } catch (error: any) {
      console.log(error);
      if(error instanceof HttpError){
        console.log(error.payload);
      }
      if (error.code == "ERR_NETWORK")
        toast.error("Lỗi đường truyền hoặc vấn đề máy chủ!");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="signup-section pt-30 pb-120">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div
                className="form-wrapper wow fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay=".2s"
              >
                <div className="form-title">
                  <h3>Đăng kí trở thành đối tác Petpal</h3>
                </div>
                <form className="w-100" onSubmit={register}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Họ *</label>
                        <input
                          type="text"
                          placeholder="First Name"
                          name="first-name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Tên *</label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          name="last-name"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Tài khoản đăng nhập *</label>
                        <input
                          type="text"
                          placeholder="Enter your username"
                          name="username"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Email *</label>
                        <input
                          type="email"
                          placeholder="Enter your Email"
                          name="email"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Địa chỉ *</label>
                        <input
                          type="text"
                          placeholder="Enter your address"
                          name="address"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Số điện thoại *</label>
                        <input
                          type="tel"
                          placeholder="Enter your phone"
                          name="phone-number"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Mật khẩu *</label>
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
                        <label>Xác nhận mật khẩu *</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirm-password"
                          id="password2"
                          placeholder="Confirm Password"
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

                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Số thẻ ngân hàng nội địa *</label>
                        <input
                          type="number"
                          placeholder="Stk"
                          name="accountNumber"
                          maxLength={5}
                        />
                      </div>
                    </div>

                    <div className="col-md-6 row d-flex  align-items-end">
                      <div className="col-md-6 mb-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="MM"
                          min="1"
                          max="12"
                          title="Enter month as MM"
                          name="MM"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="YY"
                          min="0"
                          max="99"
                          title="Enter year as YY"
                          name="YY"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Tên chủ thẻ *</label>
                        <input
                          type="text"
                          placeholder="Enter your username"
                          name="name"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                        <div className="form-group">
                          <input type="checkbox" id="html" />
                          <label htmlFor="html">
                            I agree to the <a href="#">Terms</a> &amp;{" "}
                            <a href="#">Privacy Policy.</a>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="account-btn" type="submit">
                    Đăng ký
                  </button>
                </form>
                <div className="alternate-signup-box">
                  <h6>or signup WITH</h6>
                  <div className="btn-group gap-4">
                    <a
                      href="#"
                      className="eg-btn google-btn d-flex align-items-center"
                    >
                      <i className="bx bxl-google" />
                      <span>signup whit google</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
