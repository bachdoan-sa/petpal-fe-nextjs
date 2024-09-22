import useMounted from "@/src/hooks/useMounted";
import { PetType } from "@/src/schemaValidations/pet.schema";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function ShowPet({ value }: { value?: PetType }) {

    const hasMounted = useMounted();

    function SetDropDown() {
        return (

            <div className="dropup dropup-hover be-full-y d-flex align-items-center">
                <div className="d-flex items-center" aria-expanded="false">
                    <Image
                        width={28}
                        height={28}
                        src={value?.profileImage ?? '/assets/images/blog/blog-author.png'}
                        className="rounded-full me-2"
                        alt={`${value?.fullName}'s profile picture`}
                    />
                    <p className="table-first-td">{value?.fullName ?? "Chưa đặt tên"}</p>
                </div>
                {/* <p id={value?.id} className="m-0" >
                    <img alt="avatar" src={value?.profileImage ?? "/assets/images/blog/blog-author.png"} className="rounded-circle avatar avatar-md avatar-indicators avatar-online" />
                    
                </p> */}
                <ul className="dropdown-menu" aria-labelledby={value?.id}>
                    <li className="dropdown-item px-4 pb-0 pt-2" role="presentation">
                        <span className="lh-1">
                            <h5 className="mb-1"> Tên: {value?.fullName ?? "Chưa được đặt"}</h5>
                            <Link href="#" className="text-inherit text-primary fs-6">Xem chi tiết thú cưng.</Link>
                        </span>
                        <span className="dropdown-divider mt-3 mb-2"></span>
                    </li>
                    <li className="dropdown-item"><i className="fe fe-star me-2"></i>Loại: {value?.gender}</li>
                    <li className="dropdown-item"><i className="fe fe-calendar me-2"></i> {value?.birthday}</li>
                    <li className="dropdown-item"><i className="fe fe-heart me-2"></i>{value?.sterilise}</li>
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