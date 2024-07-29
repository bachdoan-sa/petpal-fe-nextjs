'use client'
import Link from "next/link";
import React, { useState } from "react";
import { useAppContext } from "@/src/app/app-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RegisterBodyType } from "@/src/schemaValidations/auth.schema";
import authApiRequest from "@/src/apiRequests/auth";

function signUpPage() {
    const [loading, setLoading] = useState(false);
    const { setUser } = useAppContext();
    const router = useRouter();

    async function register(event) {
        event.preventDefault();
        if (loading)
            return;
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const first = formData.get('first-name') as string;
        const last = formData.get('last-name') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirm-password') as string;
        const username = formData.get('username') as string;
        const address = formData.get('address') as string;
        const phoneNumber = formData.get('phone-number') as string;
        const email = formData.get('email') as string;
        // const body = JSON.stringify({ username, password });
        const registerForm: RegisterBodyType = {
            username: username,
            fullname: first + " " +last,
            email: email,
            address: address ? address : '',
            phoneNumber: phoneNumber ? phoneNumber : '',
            password: password,
            confirmPassword: confirmPassword
        }
        try {
            // const result = await loginRequest(body);
            const result = await authApiRequest.register(registerForm);
            const expires = new Date((Date.now() + (60 * 60 * 1000))).toUTCString();
            console.log(result);

            //setcookie
            await authApiRequest.auth({
                sessionToken: result.payload.data.token,
                sessionRole: result.payload.data.role,
                expiresAt: expires
            });
            setUser({
                id: result.payload.data.name,
                name: result.payload.data.name,
                role: result.payload.data.role
            }); 
            router.push('/');
            router.refresh();
            toast.success("Create account success!");
        } catch (error: any) {
            console.log(error);
            if(error.code == 'ERR_NETWORK')
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
                                    <h3>Sign Up</h3>
                                    <p>
                                        Do you already have an account?{" "}
                                        <Link legacyBehavior href="/login">
                                            <a>Log in here</a>
                                        </Link>
                                    </p>
                                </div>
                                <form className="w-100" onSubmit={register}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-inner">
                                                <label>Frist Name *</label>
                                                <input type="text" placeholder="First Name" name="first-name"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inner">
                                                <label>Last Name *</label>
                                                <input type="text" placeholder="Last Name" name="last-name"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>Enter your username *</label>
                                                <input type="text" placeholder="Enter your username" name="username"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>Enter Your Email *</label>
                                                <input type="email" placeholder="Enter your Email" name="email"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>Enter Your address *</label>
                                                <input type="text" placeholder="Enter your address" name="address"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>Enter Your phone number *</label>
                                                <input type="phone" placeholder="Enter your phone" name="phone-number"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>Password *</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    placeholder="Create A Password"
                                                />
                                                <i className="bi bi-eye-slash" id="togglePassword" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-inner">
                                                <label>Confirm Password *</label>
                                                <input
                                                    type="password"
                                                    name="confirm-password"
                                                    id="password2"
                                                    placeholder="Confirm Password"
                                                />
                                                <i className="bi bi-eye-slash" id="togglePassword2" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                                                <div className="form-group">
                                                    <input type="checkbox" id="html" />
                                                    <label htmlFor="html">
                                                        I agree to the Terms &amp; Policy
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="account-btn" type="submit">Create Account</button>
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
                                        <a
                                            href="#"
                                            className="eg-btn facebook-btn d-flex align-items-center"
                                        >
                                            <i className="bx bxl-facebook" />
                                            signup whit facebook
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default signUpPage;
