import React from "react";

export default function Page401() {
  return (
    <>
      <div className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className="404_bg">
                  <h1 className="text-center">401</h1>
                </div>
                <div className="content_box_404">
                  <h3 className="h2">Hình như đã hết thời hạn đăng nhập</h3>
                  <p></p>
                  <a href="login">Đăng nhập lại</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
