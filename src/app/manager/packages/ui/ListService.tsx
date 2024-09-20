'use client'
import SearchBar from "./SearchService";
import { ServiceType } from "@/src/schemaValidations/service.schema";
import { Suspense, useEffect, useState } from "react";
import Pagination from "./PaginationService";
import SimpleBar from "simplebar-react";

import 'simplebar-react/dist/simplebar.min.css';
import { PackageItemType } from "@/src/schemaValidations/package/package-item/package-item.schema";
import clsx from "clsx";
import ServiceApiRequest from "@/src/apiRequests/service";
import { HttpError } from "@/src/lib/httpAxios";

type Service = ServiceType;
type PackageItem = PackageItemType;

export default function SideListService({ handleInputClick, packageItems, token, searchParams }: { handleInputClick?: any; packageItems?: PackageItem[]; token: string; searchParams?: { service?: string; page?: number; } }) {
    const [list, setServices] = useState<Service[]>([]);
    const [maxPage, setMaxPage] = useState<number>(1);
    useEffect(() => {
        const getServices = async () => {
            try {

                const result = await ServiceApiRequest.getListService({
                    body: {
                        page: searchParams?.page ?? 1,
                        size: 10,
                        search: searchParams?.service ?? ""
                    },
                    sessionToken: token,
                });
                setServices(result.payload.data.list);
                setMaxPage(result.payload.data.paging.maxPage);
            } catch (error) {
                if (error instanceof HttpError) {
                    const errors = error?.payload;
                    if (error.status === 422) {
                        console.log(errors);
                    }
                }
            }
        };
        getServices();
    }, [searchParams]);
    const handleChange = (value: Service) => {

        handleInputClick(value.id, value.description, value.basePrice, value.name);
    };
    return (
        <>
            <div className="mb-4">
                <label htmlFor="title" className="mb-2 d-block text-sm font-medium">
                    Danh sách dịch vụ được cung cấp:
                </label>
                <div className="relative">
                    <Suspense>
                        <SearchBar placeholder="Tìm kiếm dịch vụ..." />
                    </Suspense>
                    <div className="pt-2">
                        <SimpleBar style={{ height: '350px', overflowX: 'hidden' }} autoHide={true}>
                            {(list.length === 0) && (
                                <p className="d-flex justify-content-center align-items-center">
                                    Không tìm thấy dịch vụ nào
                                </p>
                            )}
                            <ul className="list-group list-group-flush gy-4">
                                {list.map(function (item) {
                                    let checked = false;
                                    if (packageItems?.some((idx) => (idx.id === item.id))) {
                                        checked = true;
                                    }
                                    return (
                                        <li className={clsx("list-group-item mb-2 d-flex justify-content-between row",
                                            (checked) ? "bg-green-100" : "")} key={item.id}>
                                            <div className="text-muted pe-2 col-9" >
                                                <h5 className=" mb-1">{item.name}</h5>
                                                <div className="mb-0"
                                                    style={{
                                                        fontSize: "14px",
                                                        lineHeight: "1.5rem",
                                                        height: "3rem",
                                                        overflow: "hidden"
                                                    }}>
                                                    {item.description}
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center col-3">
                                                {
                                                    (packageItems?.some((idx) => (idx.serviceId === item.id)))
                                                        ?
                                                        (<button className="btn btn-success" >Đã chọn</button>)
                                                        :
                                                        (<button className="btn btn-primary" onClick={() => handleChange(item)}>Chọn</button>)
                                                }
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </SimpleBar >
                    </div>
                </div>

            </div>
            <div className="d-flex justify-content-center">
                <Suspense>
                    <Pagination totalPages={maxPage} />
                </Suspense>
            </div>

        </>
    );
}