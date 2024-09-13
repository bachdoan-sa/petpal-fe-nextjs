"use client";
import Link from "next/link";
import React, { useState } from "react";
import authApiRequest from "@/src/apiRequests/auth";
import { LoginBody, LoginBodyType } from "@/src/schemaValidations/auth.schema";
import { useAppContext } from "@/src/app/app-provider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HttpError } from "@/src/lib/httpAxios";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


function loginPage() {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginBodyType>({ resolver: zodResolver(LoginBody) });

  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAppContext();

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<LoginBodyType> = async (loginForm: LoginBodyType) => {
    if (isSubmitting) {
      
      return;
    }
    try {
      const result = await authApiRequest.login(loginForm);
      const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
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
      if (error.code == "ERR_NETWORK") {
        toast.error("Lỗi đường truyền hoặc vấn đề máy chủ!");
      }
      else if (error instanceof HttpError) { 
        if (error.status == 404) {
          toast.error(error.payload.message);
        }
        if (error.status == 500) {
          toast.error("Lỗi máy chủ không phản hồi.");
        }
      } else {
        toast.error("Lỗi đăng nhập không xác định?");
      }
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
                  <h3>Chào mừng trở lại!</h3>
                  <p>
                    Bạn chưa có tài khoản?{" "}
                    <Link legacyBehavior href="/register">
                      <a>Đăng kí</a>
                    </Link>
                  </p>
                </div>
                <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Tài khoản *</label>
                        <input {...register("username")} type="text" placeholder="Enter Your Username" />
                        {errors.username ? (<span className="text-danger font-medium">{errors.username.message}</span>) : null}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Mật khẩu *</label>
                        <input {...register("password")} type={showPassword ? "text" : "password"} id="password" placeholder="Password" />
                        <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                          id="togglePassword"
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        />
                        {errors.password ? (<span className="text-danger font-medium">{errors.password.message}</span>) : null}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-agreement form-inner d-flex justify-content-end ">
                        <a href="#" className="forgot-pass">
                          Quên mật khẩu?
                        </a>
                      </div>
                    </div>
                  </div>
                  <a>
                    <button disabled={isSubmitting} className="account-btn" type="submit">
                      {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
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

                {/* <div className="form-poicy-area">
                  <p>
                    By clicking the "signup" button, you create a Cobiro
                    account, and you agree to Cobiro's{" "}
                    <a href="#">Terms &amp; Conditions</a> &amp;{" "}
                    <a href="#">Privacy Policy.</a>
                  </p>
                </div> */}
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
