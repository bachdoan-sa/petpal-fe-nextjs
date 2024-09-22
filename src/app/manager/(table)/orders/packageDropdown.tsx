import useMounted from "@/src/hooks/useMounted";
import { PackageType } from "@/src/schemaValidations/package/package.schema";
import Link from "next/link";
import { Fragment } from "react";

export default function ShowPackage({ value }: { value?: PackageType }) {

    const hasMounted = useMounted();

    function SetDropDown() {
        return (

            <div className="dropup dropup-hover be-full-y d-flex align-items-center">
                {
                    /* <button id="dropdownUser" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ borderRadius: "50%" }}>
                    <img alt="avatar" src='/assets/images/blog/blog-author.png' className="rounded-circle avatar avatar-md avatar-indicators avatar-online" />
                </button> */
                }
                <p id={value?.id} className="m-0" aria-expanded="false">
                    {/* <img alt="avatar" src='/assets/images/blog/blog-author.png' className="rounded-circle avatar avatar-md avatar-indicators avatar-online" /> */}
                    {value?.title ?? "Chưa đặt tên"}
                </p>
                <ul className="dropdown-menu" aria-labelledby={value?.id}>
                    <li className="dropdown-item px-4 pb-0 pt-2" role="presentation">
                        <span className="lh-1">
                            <h5 className="mb-1"> Tên: {value?.title ?? "Chưa được đặt"}</h5>
                            <Link href="#" className="text-inherit text-primary fs-6">Xem chi tiết dịch vụ.</Link>
                        </span>
                        <span className="dropdown-divider mt-3 mb-2"></span>
                    </li>
                    <li className="dropdown-item"><i className="fe fe-star me-2"></i>Loại: {value?.type}</li>
                    <li className="dropdown-item"><i className="fe fe-activity me-2"></i> {value?.duration}</li>
                    <li className="dropdown-item"><i className="fe fe-dollar-sign me-2"></i>{value?.totalPrice?.toLocaleString("vi-VN")} <span>VNĐ</span></li>
                    {/* <li className="dropdown-item"><i className="fe fe-settings me-2"></i> {value?.status}</li> */}
                </ul>
            </div>

        );
    }
    return (
        <Fragment>
            {hasMounted ? <SetDropDown /> : <></>}
        </Fragment>
    );
}