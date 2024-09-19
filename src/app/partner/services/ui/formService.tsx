'use client'
import ServiceApiRequest from "@/src/apiRequests/service";
import { EntityError, HttpError } from "@/src/lib/httpAxios";
import { CreateServiceBody, CreateServiceBodyType, ServiceResType, UpdateServiceBodyType } from "@/src/schemaValidations/service.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


type Service = ServiceResType["data"];

export default function FormServices({ service, sessionToken }: { service?: Service, sessionToken: string }) {
    console.log(service)
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const form = useForm<CreateServiceBodyType>({
        resolver: zodResolver(CreateServiceBody),
        defaultValues: {
            id: service?.id ?? "",
            name: service?.name ?? "",
            description: service?.description ?? "",
            isRequired: service?.isRequired ?? false,
            status: service?.status ?? "OnStock"
        }
    });
    const createService = async (value: CreateServiceBodyType) => {
        setLoading(true);
        try {

            const updateService = await ServiceApiRequest.createService({ body: value ,sessionToken })
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
    const updateService = async (value: UpdateServiceBodyType) => {
        if (value.id === undefined || value.id === "") {
            return;
        }
        setLoading(true);
        try {

            const updateService = await ServiceApiRequest.updateService({ body: value ,sessionToken})
        } catch (error: any) {
            if (error instanceof HttpError) {
                const errors = error?.payload;
                if (error.status === 422) {
                    console.log(errors);
                }
            }
        } finally {
            setLoading(false);
        }
    };
    async function onSubmit(values: CreateServiceBodyType) {
        if (loading) return;
        if (service) {
            await updateService(values);
        } else {
            await createService(values);
        }
    }
    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* <div className="container"> */}
                <div className="row h-100">

                    <div className="col-12 pt-10 ">
                        {/* Service Name*/}
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">
                                Tên dịch vụ
                            </label>
                            <input
                                {...form.register("name")}
                                type="text"
                                className="form-control"
                                placeholder="Hãy nhập tên dịch vụ."
                            />
                            {form.formState.errors.name ? (
                                <span className="text-danger font-medium">
                                    {form.formState.errors.name.message}
                                </span>
                            ) : null}
                        </div>
                        {/* Service Description*/}
                        <div className="mb-4">
                            <label htmlFor="description" className="form-label">
                                Mô tả chi tiết
                            </label>
                            <input
                                className={`form-control `}
                                type="text"
                                {...form.register("description")}
                                placeholder="Điền Mô tả ở đây"
                            />
                            {form.formState.errors.description ? (
                                <span className="text-danger font-medium">
                                    {form.formState.errors.description.message}
                                </span>
                            ) : null}
                        </div>
                        {/* Service isRequired*/}
                        <div className="mb-4">
                            <label htmlFor="isRequired" className="form-label">
                                Là bắt buộc?
                            </label>
                            {" "}
                            <input
                                type="checkbox"
                                className="form-check-input"
                                {...form.register("isRequired")}
                            />

                            {form.formState.errors.isRequired ? (
                                <span className="text-danger font-medium">
                                    {form.formState.errors.isRequired.message}
                                </span>
                            ) : null}
                        </div>
                        {/* Service status*/}
                        <div className="mb-4">
                            <label htmlFor="status" className="form-label">
                                Trạng thái
                            </label>
                            <select
                                className="form-select"
                                defaultValue={form.getValues("status")}
                                {...form.register("status")}
                            >
                                <option value="OnStock" >Hoạt động</option>
                                <option value="Pending" >Chưa hoạt động</option>
                                <option value="Deactive">Hủy</option>
                            </select>
                            {form.formState.errors.status ? (
                                <span className="text-danger font-medium">
                                    {form.formState.errors.status.message}
                                </span>
                            ) : null}
                        </div>
                        <button type="submit" className="primary-btn1 lg-btn">

                        </button>
                        <button disabled={form.formState.isSubmitting} type="submit" className="btn btn-primary">
                            {form.formState.isSubmitting ? "Đang gửi cập nhật..." : ((service) ? "Cập Nhật" : "Tạo mới")}
                        </button>
                    </div>
                </div>
                {/* </div> */}
            </form>
        </>
    );
}