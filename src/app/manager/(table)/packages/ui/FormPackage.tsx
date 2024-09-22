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
import { Controller, useFieldArray, useForm } from "react-hook-form";
import SideListService from "./ListService";
import { PetTypeListPageBodyType, PetTypeListType } from "@/src/schemaValidations/pet-type.schema";
import PetTypeApiRequest from "@/src/apiRequests/pet-type";
import { toast } from "sonner";
import { set } from "zod";

type Package = PackageType;
type Service = ServiceType;
type Image = {
    file: File,
    preview: string
}
//từ package bị xung đột nên nó yêu cầu tên khác
export default function FormPackage({ packageModel, token, searchParams }: { packageModel?: Package; token: string; searchParams?: any }) {

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const getObjectUrl = useObjectUrls();

    const [petTypes, setPetTypes] = useState<PetTypeListType>([]);
    useEffect(() => {
        const getPetType = async () => {
            try {
                const body: PetTypeListPageBodyType = {
                    page: 1,
                    size: 20,
                };

                const result = await PetTypeApiRequest.getListPetTypeForUser({
                    body,
                    sessionToken: token,
                });
                setPetTypes(result.payload.data);
            } catch (error) {
                if (error instanceof HttpError) {
                    const errors = error?.payload;
                    if (error.status === 422) {
                        console.log(errors);
                    }
                }
            }
        };
        getPetType();
        console.log("Get Type");
    }, []);
    const { control, register, handleSubmit, getValues, formState } = useForm<CreatePackageWithItemsBodyType>({
        resolver: zodResolver(CreatePackageWithItemsBody),
        defaultValues: {
            id: packageModel?.id ?? undefined,
            title: packageModel?.title ?? "",
            description: packageModel?.description ?? "",
            type: packageModel?.type ?? "",
            petTypeId: packageModel?.petTypeId ?? undefined,
            image: packageModel?.image ?? undefined,
            // totalPrice: packageModel?.totalPrice ?? 0,
            status: packageModel?.status ?? "",
            packageItems: packageModel?.items ?? []
        }
    });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({ control, name: "packageItems" });
    const handleInputClick = (id, detail, price, name) => {
        setLoading(true);
        if (fields.find(item => item.serviceId === id)) {

            // remove(fields.findIndex(item => item.serviceId === id));

        } else {
            append({
                serviceId: id,
                detail: detail,
                currentPrice: price,
                serviceName: name
            });
            setLoading(false)
        }


    };

    const [packageImage, setPackageImage] = useState<Image | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handlePreviewImage = (e) => {
        const file: File = e.target.files[0];
        const image: Image = {
            file: file,
            preview: getObjectUrl(file)
        };

        if (file) {
            setPackageImage(image);
        } else {
            setPackageImage(undefined);
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }
    useEffect(() => {
        return () => {
            packageImage && URL.revokeObjectURL(packageImage.preview);
        }
    }, [packageImage]);
    const createPackage = async (value: any) => {
        setLoading(true);
        try {
            console.log("call api");
            const createPackageRes = await packageApiRequest.createPackage({ body: value, sessionToken: token })
            const formbody = new FormData();
            formbody.append("packageId", createPackageRes.payload.data.packageId);
            toast.success("Tạo gói dịch vụ thành công.");

            formbody.append("file", packageImage?.file as Blob);
            const uploadImageRes = await packageApiRequest.uploadPackageImage({ body: formbody, sessionToken: token })
            toast.success("Tải ảnh gói dịch vụ thành công.");

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
            <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
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
                                        {...register("title")}
                                        type="text"
                                        placeholder="tiêu đề..."
                                        className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                    />
                                    {formState.errors.title && <div className="text-danger font-medium">{formState.errors.title.message}</div>}

                                </div>
                            </div>
                            <div className="row">
                                {/* Loại dịch vụ*/}
                                <div className="mb-4 col-6">
                                    <label htmlFor="type" className="mb-2 d-block text-sm font-medium">
                                        Loại dịch vụ
                                    </label>
                                    <div className="relative mt-2 rounded-md">
                                        <div className="relative">
                                            <input
                                                {...register("type")}
                                                type="text"
                                                placeholder="Loại gói dịch vụ..."
                                                className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                            />
                                            {formState.errors.type && <div className="text-danger font-medium">{formState.errors.type.message}</div>}

                                        </div>
                                    </div>
                                </div>

                                {/* Tổng loại thú cưng */}
                                <div className="mb-4 col-6">
                                    <label htmlFor="petTypeId" className="form-label">
                                        Loại thú cưng
                                    </label>
                                    {petTypes.length > 0 ? (
                                        <select
                                            className="form-select"
                                            {...register("petTypeId")}
                                        >
                                            {petTypes.map((option, index) => (
                                                <option key={index} value={option.id} selected={option.id === getValues("petTypeId")}>
                                                    {option.type}
                                                </option>
                                            ))}

                                        </select>
                                    ) : (
                                        <>
                                            <span className="form-control"> Đang lấy dữ liệu <Image width={20} height={20} alt="" src='\assets\spinner.svg' /> </span>
                                        </>
                                    )
                                    }
                                    {formState.errors.petTypeId ? (
                                        <span className="text-danger font-medium">
                                            {formState.errors.petTypeId.message}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            {/* Tổng giá trị */}
                            {/* <div className="mb-4">
                                <label htmlFor="totalPrice" className="mb-2 d-block text-sm font-medium">
                                    Tổng giá trị
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <input
                                            {...register("totalPrice")}
                                            type="number"
                                            placeholder="Giá trị gói dịch vụ..."
                                            className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                        />
                                        {formState.errors.totalPrice && <div className="text-danger font-medium">{formState.errors.totalPrice.message}</div>}

                                    </div>
                                </div>
                            </div> */}
                            {/* Mô tả */}
                            <div className="mb-4">
                                <label htmlFor="description" className="mb-2 d-block text-sm font-medium">
                                    Mô tả gói dịch vụ
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <textarea
                                            {...register("description")}

                                            placeholder="Mô tả gói dịch vụ"
                                            className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                        />
                                        {formState.errors.description && <span className="text-danger font-medium">{formState.errors.description.message}</span>}

                                    </div>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="mb-4">
                                <label htmlFor="image" className="mb-2 d-block text-sm font-medium">
                                    Mô tả gói dịch vụ
                                </label>
                                <div className="d-flex justify-content-between align-items-center">
                                    <input
                                        type="file"
                                        name="image"
                                        accept='image/*'
                                        ref={inputRef}
                                        className={`w-50 form-control ${formState.errors.image ? 'is-invalid' : ''}`}
                                        onChange={handlePreviewImage}
                                    />
                                    {(packageImage) && (
                                        <div className="w-25 d-flex justify-content-between">
                                            <Image
                                                src={packageImage.preview}
                                                width={35}
                                                height={35}
                                                alt='preview'
                                                className='w-32 h-32 object-cover bg-transparent'
                                                
                                            />
                                            <button
                                                type='button'
                                                className={'btn btn-danger shadow-sm d-inline-block rounded p-2 fs-6'}
                                                style={{ opacity: 0.9 }}
                                                onClick={() => {
                                                    setPackageImage(undefined);
                                                    if (inputRef.current) {
                                                        inputRef.current.value = ''
                                                    }
                                                }}
                                            >
                                                Xóa hình ảnh
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {formState.errors.image && <div className="text-danger font-medium">{formState.errors.image.message}</div>}

                            </div>
                            {/* package Item */}
                            <div className="mb-4">
                                <label htmlFor="packageItems" className="mb-2 d-block text-sm font-medium">
                                    Danh sách dịch vụ con
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <ul className="p-0">
                                            {(fields.map((field, index) => {

                                                return (
                                                    <li className="card mb-2 p-2" key={field.id}>
                                                        <div className="card-title d-flex justify-content-between m-0">
                                                            <p className=" m-0">
                                                                {field.serviceName}
                                                            </p>
                                                            <button className="btn btn-danger" onClick={() => { remove(index); }}>
                                                                Xóa khỏi danh sách
                                                            </button>
                                                        </div>

                                                        <div className="card-body p-3">
                                                            <label className="mb-2 d-block text-sm font-medium">
                                                                Giá trị thành phần:
                                                            </label>
                                                            <input
                                                                className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                                                type="number"
                                                                defaultValue={0}
                                                                {...register(`packageItems.${index}.currentPrice`)}

                                                            />
                                                            {formState.errors.packageItems?.[index]?.currentPrice && <div className="text-danger font-medium">{formState.errors.packageItems?.[index]?.currentPrice.message}</div>}

                                                            <label className="mb-2 d-block text-sm font-medium">
                                                                Mô tả chi tiết:
                                                            </label>
                                                            <textarea
                                                                className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                                                style={{ minHeight: "60px" }}
                                                                {...register(`packageItems.${index}.detail`)}
                                                            />
                                                            {formState.errors.packageItems?.[index]?.detail && <div className="text-danger font-medium">{formState.errors.packageItems?.[index]?.detail.message}</div>}


                                                        </div>

                                                    </li>)
                                            }))}
                                        </ul>
                                        {formState.errors.packageItems && <div className="text-danger font-medium">{formState.errors.packageItems.message}</div>}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-4 ">
                        <div className="rounded bg-gray-100 p-4 d-flex flex-column">
                            <SideListService token={token} handleInputClick={handleInputClick} packageItems={getValues("packageItems")} searchParams={searchParams} />
                        </div>
                        <div className="mt-6 d-flex justify-content-end gap-4">
                            <Link
                                href="/partner/packages"
                                className="d-flex h-10 align-items-center rounded-pill bg-gray-300 hover-for-bg-gray px-4 text-gray-600"
                            >
                                Cancel
                            </Link>

                            <Button
                                disabled={formState.isSubmitting || loading}
                                className={(formState.isSubmitting || loading) ? "bg-black" : ""}
                                type="submit">

                                {(formState.isSubmitting || loading) ? (
                                    <span className="">
                                        Đang gửi yêu cầu
                                        <Image width={20} height={20} alt="" src='\assets\spinner.svg' />
                                    </span>

                                ) : "Tạo gói dịch vụ"}

                            </Button>
                        </div>
                    </div>

                </div>

            </form>
        </>
    );
}