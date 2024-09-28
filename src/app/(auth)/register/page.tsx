"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAppContext } from "@/src/app/app-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RegisterBodyType } from "@/src/schemaValidations/auth.schema";
import authApiRequest from "@/src/apiRequests/auth";

function signUpPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAppContext();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function register(event) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const first = formData.get("first-name") as string;
    const last = formData.get("last-name") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const username = formData.get("username") as string;
    // const address = formData.get("address") as string;
    // const phoneNumber = formData.get("phone-number") as string;
    const email = formData.get("email") as string;
    // const body = JSON.stringify({ username, password });
    const registerForm: RegisterBodyType = {
      username: username,
      fullname: first + " " + last,
      email: email,
      // address: address ? address : "",
      // phoneNumber: phoneNumber ? phoneNumber : "",
      password: password,
      confirmPassword: confirmPassword,
    };
    try {
      // const result = await loginRequest(body);
      const result = await authApiRequest.register(registerForm);
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
      router.push("/login");
      router.refresh();
      toast.success("Create account success!");
    } catch (error: any) {
      console.log(error);
      if (error.code == "ERR_NETWORK")
        toast.error("Lỗi đường truyền hoặc vấn đề máy chủ!");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {/* <Breadcrumb pageName="Sign-Up" pageTitle="Sign-Up" /> */}
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
                  <h3>Đăng kí thành viên</h3>
                  <p>
                    Bạn đã có tài khoản rồi ư?{" "}
                    <Link legacyBehavior href="/login">
                      <a>Đăng nhập tại đây</a>
                    </Link>
                  </p>
                </div>
                <form className="w-100" onSubmit={register}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Họ *</label>
                        <input
                          type="text"
                          placeholder="Hãy nhập Họ của bạn"
                          name="first-name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Tên *</label>
                        <input
                          type="text"
                          placeholder="Hãy nhập Tên  của bạn"
                          name="last-name"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Tạo tên tài khoản *</label>
                        <input
                          type="text"
                          placeholder="Hãy tạo một tên tài khoản"
                          name="username"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Nhập Email của bạn *</label>
                        <input
                          type="email"
                          placeholder="Hãy nhập Email của bạn"
                          name="email"
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-12">
                      <div className="form-inner">
                        <label>Nhập địa chỉ của bạn *</label>
                        <input
                          type="text"
                          placeholder="Hãy nhập địa chỉ của bạn"
                          name="address"
                        />
                      </div>
                    </div> */}
                    {/* <div className="col-md-12">
                      <div className="form-inner">
                        <label>Nhập số điện thoại của bạn *</label>
                        <input
                          type="phone"
                          placeholder="Hãy nhập số điện thoại của bạn"
                          name="phone-number"
                        />
                      </div>
                    </div> */}
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Tạo Mật khẩu *</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder="Hãy tạo mật khẩu"
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
                        <label>Nhập lại mật khẩu *</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirm-password"
                          id="password2"
                          placeholder="Hãy nhập lại mật khẩu"
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
                      <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                        <div className="form-group">
                          <input type="checkbox" id="html" />
                          <label htmlFor="html">
                            Tôi đồng ý với <Link href={"#"}>điều khoản</Link>  &amp; <Link href={"#"}>chính sách</Link> 
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="account-btn" type="submit">
                    Tạo tài khoản
                  </button>
                </form>
                {/* <div className="alternate-signup-box">
                  <h6>Hoặc đăng nhập VỚI</h6>
                  <div className="btn-group gap-4">
                    <a
                      href="#"
                      className="eg-btn google-btn d-flex align-items-center"
                    >
                      <i className="bx bxl-google" />
                      <span>Tài khoản Google</span>
                    </a>
                  </div>
                </div> */}
                <div className="form-poicy-area">
                  <p>
                    Bằng cách nhấp vào nút "Tạo tài khoản", bạn sẽ tạo một tài khoản
                    Petpal, và bạn đã đồng ý với những{" "}
                    <a href="#">Điều khoản &amp; Điều kiện</a> cùng với{" "}
                    <a href="#">Chính sách Bảo mật</a>{" "}
                    của Petpal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default signUpPage;
