'use client'
import packageApiRequest from "@/src/apiRequests/package";
import ServiceApiRequest from "@/src/apiRequests/service";
import { Button } from "@/src/components/admin/button";
import { useObjectUrls } from "@/src/hooks/useObjectURL";
import { EntityError, HttpError } from "@/src/lib/httpAxios";
import { CreatePackageWithItemsBody, CreatePackageWithItemsBodyType, PackageType } from "@/src/schemaValidations/package/package.schema";
import { ServiceType } from "@/src/schemaValidations/service.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SideListService from "./ListService";

type Package = PackageType;
type Service = ServiceType;
//từ package bị xung đột nên nó yêu cầu tên khác
export default function FormPackage({ packageModel, token }: { packageModel?: Package; token: string }) {

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const getObjectUrl = useObjectUrls();
    const [services, setServices] = useState<Service[]>([]);
    useEffect(() => {
        const getServices = async () => {
            try {
                const body = {
                    page: 1,
                    size: 6,
                    search: ""
                };

                const result = await ServiceApiRequest.getListService({
                    body,
                    sessionToken: token,
                });
                setServices(result.payload.data.list);
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
    }, []);

    const form = useForm<CreatePackageWithItemsBodyType>({
        resolver: zodResolver(CreatePackageWithItemsBody),
        defaultValues: {
            id: packageModel?.id ?? undefined,
            title: packageModel?.title ?? "",
            description: packageModel?.description ?? "",
            image: packageModel?.image ?? "",
            totalPrice: packageModel?.totalPrice ?? 0,
            status: packageModel?.status ?? "",
            packageItems: packageModel?.items ?? []
        }
    });
    const [petPhoto, setPetPhoto] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        return () => {
            petPhoto && URL.revokeObjectURL(getObjectUrl(petPhoto));
        }
    }, [petPhoto]);
    const createPackage = async (value: any) => {
        setLoading(true);
        try {
            const createPackage = await packageApiRequest.createPackage({ body: value, sessionToken: token })
        } catch (error: any) {
            console.log(error)
            if (error instanceof HttpError) {
                if (error instanceof EntityError) {
                    const errors = error?.payload;
                    if (error.status === 422) {
                        console.log(errors);
                    }
                }
                if (error.status === 400) {
                    console.log(error.payload);
                }
            }

        } finally {
            setLoading(false);
        }
    };
    const updatePackage = async (value: any) => {
        setLoading(true);
        try {
            const updatePackage = await packageApiRequest.updatePackage({ body: value, sessionToken: token })
        } catch (error: any) {
            console.log(error)
            if (error instanceof HttpError) {
                if (error instanceof EntityError) {
                    const errors = error?.payload;
                    if (error.status === 422) {
                        console.log(errors);
                    }
                }
                if (error.status === 400) {
                    console.log(error.payload);
                }
            }

        } finally {
            setLoading(false);
        }
    };
    async function onSubmit(values: CreatePackageWithItemsBodyType) {
        if (loading) return;
        if (packageModel) {
            await updatePackage(values);
        } else {
            await createPackage(values);
        }
    }
    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} style={{ height: "100%" }}>
                <div className="row">
                    <div className="col-8">
                        <div className="rounded bg-gray-100 p-4">
                            {/* Title */}
                            <div className="mb-4">
                                <label htmlFor="title" className="mb-2 d-block text-sm font-medium">
                                    Tiêu đề gói dịch vụ
                                </label>
                                <div className="relative">
                                    <input
                                        {...form.register("title")}
                                        type="text"
                                        placeholder="tiêu đề..."
                                        className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                    />
                                </div>
                            </div>

                            {/* Tổng giá trị */}
                            <div className="mb-4">
                                <label htmlFor="totalPrice" className="mb-2 d-block text-sm font-medium">
                                    Password
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <input
                                            {...form.register("totalPrice")}
                                            type="number"
                                            placeholder="Giá trị gói dịch vụ..."
                                            className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* fullName */}
                            <div className="mb-4">
                                <label htmlFor="description" className="mb-2 d-block text-sm font-medium">
                                    Full name
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <input
                                            {...form.register("description")}
                                            type="text"
                                            placeholder="Mô tả gói dịch vụ"
                                            className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                        />
                                    </div>
                                </div>
                            </div>

                        

                            {/* phone Number */}
                            <div className="mb-4">
                                <label htmlFor="phonenumber" className="mb-2 d-block text-sm font-medium">
                                    Phone number
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <input
                                            id="phonenumber"
                                            name="phonenumber"
                                            type="number"
                                            placeholder="Enter phone number"
                                            className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="mb-2 d-block text-sm font-medium">
                                    Email
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter email"
                                            className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 be-box">
                        <div className="rounded bg-gray-100 p-4 be-full">
                            <SideListService list={services} />
                        </div>
                    </div>

                </div>
                <div className="mt-6 d-flex justify-content-end gap-4">
                    <Link
                        href="/admin/users"
                        className="d-flex h-10 align-items-center rounded-pill bg-gray-300 hover-for-bg-gray px-4 text-gray-600"
                    >
                        Cancel
                    </Link>
                    <Button type="submit">Tạo gói dịch vụ</Button>
                </div>
            </form>
        </>
    );
}