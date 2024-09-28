import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page401() {
  return (
    <>
      <div className="container">
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Image
            height={300}
            width={450}
            src={"/assets/images/preloader.gif"}
            alt=""
            unoptimized
          />
        </div>
        <div className="d-flex flex-column">
          <h3 className="text-center">
            Hình như bạn đã hết thời hạn đăng nhập
          </h3>
          <p></p>
          <Link href={"/login"} className="text-center pb-65">Đăng nhập lại</Link>
        </div>
      </div>
    </>
  );
}
