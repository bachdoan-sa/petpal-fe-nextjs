"use client";
import Link from "next/link";
import React, { useState } from "react";
import loginRequest from "@/src/lib/apiService";
import authApiRequest from "@/src/apiRequests/auth";
import { LoginBody, LoginBodyType } from "@/src/schemaValidations/auth.schema";
import { useAppContext } from "@/src/app/app-provider";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/src/lib/utils";
import { toast } from "sonner";
import { HttpError } from "@/src/lib/httpAxios";
function loginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAppContext();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    // const body = JSON.stringify({ username, password });
    const loginForm: LoginBodyType = {
      username: username,
      password: password,
    };
    try {
      // const result = await loginRequest(body);
      const result = await authApiRequest.login(loginForm);
      const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
      console.log(result);

      //setcookie
      await authApiRequest.auth({
        sessionToken: result.payload.data.token,
        sessionRole: result.payload.data.role,
        expiresAt: expires,
      });
      setUser({
        id: result.payload.data.name,
        name: result.payload.data.name,
        role: result.payload.data.role,
      });
      router.push("/");
      router.refresh();
      toast.success("Login success!");
    } catch (error: any) {
      console.log(error);
      if (error.code == "ERR_NETWORK")
        toast.error("Lỗi đường truyền hoặc vấn đề máy chủ!");
      if (error instanceof HttpError) {
        console.log(error.message);
        if(error.status == 404){
          toast.error(error.payload.message);
        }
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {/* <Breadcrumb pageName="Login" pageTitle="Login" /> */}
      <div className="login-section pt-30 pb-120">
        <div className="container">
          <div className="row d-flex justify-content-center g-4">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div
                className="form-wrapper wow fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay=".2s"
              >
                <div className="form-title">
                  <h3>Đăng nhập</h3>
                  <p>
                    New Member?{" "}
                    <Link legacyBehavior href="/register">
                      <a>signup here</a>
                    </Link>
                  </p>
                </div>
                <form className="w-100" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Enter Your Email *</label>
                        <input
                          type="text"
                          name="username"
                          placeholder="Enter Your Email"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Password *</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder="Password"
                        />
                        <i
                          className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"
                            }`}
                          id="togglePassword"
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                        <div className="form-group">
                          <input type="checkbox" id="html" />
                          <label htmlFor="html">
                            I agree to the <a href="#">Terms &amp; Policy</a>
                          </label>
                        </div>
                        <a href="#" className="forgot-pass">
                          Forgotten Password
                        </a>
                      </div>
                    </div>
                  </div>
                  <a>
                    <button className="account-btn" type="submit">
                      Login in
                    </button>
                  </a>
                </form>
                <div className="alternate-signup-box">
                  <h6>Hoặc</h6>
                  <div className="btn-group gap-4">
                    <a
                      href="#"
                      className="eg-btn google-btn d-flex align-items-center"
                    >
                      <i className="bx bxl-google" />
                      <span>Đăng nhập bằng Google</span>
                    </a>
                  </div>
                </div>

                <div className="form-poicy-area">
                  <p>
                    By clicking the "signup" button, you create a Cobiro
                    account, and you agree to Cobiro's{" "}
                    <a href="#">Terms &amp; Conditions</a> &amp;{" "}
                    <a href="#">Privacy Policy.</a>
                  </p>
                </div>
                <div className="form-title">
                  <p>
                    Trở thành đối tác của PetPal?{" "}
                    <Link legacyBehavior href="/register-partner">
                      <a>Đăng kí</a>
                    </Link>
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

export default loginPage;
