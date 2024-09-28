import React from "react";

export default function ForgotPassword() {
  return (
    <>
      {/* <Breadcrumb pageName="Login" pageTitle="Login" /> */}
      <div className="login-section pt-120 pb-120">
        <div className="container">
          <div className="row d-flex justify-content-center g-4">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div
                className="form-wrapper wow fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay=".2s"
              >
                <div className="form-title">
                  <h3>Đặt lại mật khẩu</h3>
                </div>
                <form className="w-100"
                //  onSubmit={handleSubmit(onSubmit)}
                 >
                  <div className="row">
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Email *</label>
                        <input
                          type="text"
                          placeholder="Nhập email tài khoản của bạn để lấy lại mật khẩu"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                  <a>
                    <button
                      className="account-btn"
                      type="submit"
                    >Xác nhận email</button>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
