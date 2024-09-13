'use client'
import React, { useEffect, useState } from "react";
import { PetListPageBodyType, PetType } from "@/src/schemaValidations/pet.schema";
import PetApiRequest from "@/src/apiRequests/pet";
import OrderSummary from "./order-summary";
import { CreateOrderBodyType, CreateOrderForm, CreateOrderFormType, CreateOrderResType } from "@/src/schemaValidations/order.schema";
import { HttpError } from "@/src/lib/httpAxios";
import orderApiRequest from "@/src/apiRequests/order";
import { toast } from "sonner";
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppContext } from "@/src/app/app-provider";
//1: Định nghĩa Form Fields, Dung infer để rằng buộc chặt chẽ hơn typeOf.. Thật ra cũng chả làm gì, chat gpt bảo thì làm :))) 
type FormFields = z.infer<typeof CreateOrderForm>

const BillingDetails = ({ packageId, sessionToken }: { packageId: string; sessionToken?: string }) => {
  const user = useAppContext().user;
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState<PetType[]>([]);
  const [selectedPet, setSelectedPet] = useState<PetType>();

  //2: gọi hook của form và gọi các phương thức mình cần
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(CreateOrderForm) });

  useEffect(() => {
    if (sessionToken) {
      const fetchPets = async () => {
        try {
          const body: PetListPageBodyType = {
            page: 1,
            size: 20,
            search: ""
          }
          const response = await PetApiRequest.getActiveListPetForUser({ body, packageId, sessionToken });
          setPets(response.payload.data.list);
          // console.log("Package data: hahaha", packageDetail);
        } catch (error) {
          if (error instanceof HttpError) {
            console.log(error.payload);
          }
          console.error("Error fetching package:", error);
        }
      };
      fetchPets();
    }
  }, [sessionToken]);

  // function này để set lại biến của time vì zod nó nhận HH:mm:ss mà không nhận HH:mm :')
  const formatTime = (e) => {
    const { name, value } = e.target;
    setValue(name, value + ":00");
  }
  // Xử lí on submit của form.
  const onSubmit: SubmitHandler<CreateOrderFormType> = async (data) => {
    if (!sessionToken) {
      toast.warning("Bạn cần đăng nhập để sử dụng chức năng này.")
    }
    else {
      const weeks = data.weeks;
      const fromDate = data.fromDate
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + (weeks * 7));
      // Thường thì dùng cái form body type làm form Field cũng được
      // NHƯNG! cái này nó lại tính theo weeks nên phải tách ra để dễ xử lí.
      const createOrderBody: CreateOrderBodyType = {
        petId: data.petId,
        packageId: data.packageId,
        detail: data.detail,
        fromDate: fromDate,
        toDate: toDate,
        receiveTime: data.receiveTime,
        returnTime: data.returnTime
      }
      try {
        console.log(createOrderBody);
        await orderApiRequest.userCreateOrder({ body: createOrderBody, sessionToken: sessionToken })  
        toast.success("Tạo đơn đăng ký thành công.");
      } catch (error: any) {
        if (error instanceof HttpError) {
          console.log(error.payload);
        }
      }
    }
  }

  return (
    <>
      <form className="row g-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-lg-7">
          <div className="form-wrap box--shadow mb-30">
            <h4 className="title-25 mb-20">Đăng kí dịch vụ chăm sóc</h4>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-inner">
                  <label>Chào mừng:</label>
                  <span style={{ fontSize: "1.25rem", fontWeight: "600" }} className="ms-3 text-dark" >{user?.name ?? 'Khách ẩn danh'}</span>
                </div>
              </div>
              <input {...register("packageId")} value={packageId} hidden readOnly />
              <div className="col-12">

                {/* Form - PetId */}
                <div className="form-inner">
                  <label>Hãy chọn thú cưng cho dịch vụ này:</label>
                  {(pets.length > 0) ? (
                    <>
                      <button type="button" className="btn btn-sm btn-outline-secondary mx-4" data-bs-toggle="modal" data-bs-target="#petListModal">
                        Hãy chọn thú cưng
                      </button>
                      <div className="modal fade" id="petListModal" tabIndex={-1} role="dialog" aria-labelledby="petListModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title font-medium" id="petListModalLabel">Hãy chọn một thú cưng để sử dụng dịch vụ :D</h5>
                              <button type="button" className="close btn btn-danger " data-bs-dismiss="modal" aria-label="Close">
                                <p className="d-flex align-items-center font-medium m-0 text-white" aria-hidden="true">x</p>
                              </button>
                            </div>
                            <div className="modal-body px-4">
                              <div className="row">
                                {pets?.map((pet) => (
                                  <div className="col-md-4" key={pet.id}>
                                    <div className="card card-optional mb-3 btn"
                                      data-bs-dismiss="modal"
                                      onClick={() => {
                                        setSelectedPet(pet)
                                        setValue("petId", pet.id ?? "")
                                      }}>
                                      <div className="row g-0">
                                        <div className="col-md-4 position-relative ">
                                          <img
                                            style={{ height: "100%", objectFit: "cover", width: "100%" }}
                                            src={pet.profileImage}
                                            className="img-fluid rounded-start"
                                          />
                                        </div>
                                        <div className="col-md-8">
                                          <div className="card-header">
                                            <div className="d-flex justify-content-between align-items-center">
                                              <span className="">{pet.fullName}</span>
                                            </div>
                                          </div>
                                          <div className="card-body">
                                            <p className="card-text">
                                              <small className="text-muted">{pet.description}</small>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy tác vụ</button>
                              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Selected Pet */}

                    </>
                  ) : (
                    <>
                      <input type="text" placeholder="Lựa chọn thú cưng của bạn"
                        value="Bạn cần đăng nhập để lấy danh sách thú cưng."
                        readOnly disabled
                      />
                    </>
                  )}
                  {selectedPet ? (
                    <div>
                      <div className="card mb-3" style={{ maxWidth: "860px" }}>
                        <div className="row g-0">
                          <div className="col-md-4 position-relative ">
                            <img
                              style={{ height: "100%", objectFit: "cover", width: "100%" }}
                              src={selectedPet.profileImage}
                              className="img-fluid rounded-start"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-header">
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="card-title text-xl m-0">{selectedPet.fullName}</span>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="row">
                                <div className="col-4">
                                  <h5>Pet type</h5>
                                </div>
                                <div className="col-4">Age: 1 year old</div>
                                <div className="col-4">Weight: {selectedPet.weight}</div>
                              </div>
                              <div className="row">
                                <div className="col-4">
                                  Gender
                                  <br /> {selectedPet.gender}
                                </div>
                                <div className="col-4">
                                  Breed
                                  <br /> {selectedPet.breed}
                                </div>
                                <div className="col-4">
                                  Desexed
                                  <br />
                                  No
                                </div>
                              </div>
                              <hr />
                              <p className="card-text">
                                <small className="text-muted">{selectedPet.description}</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {errors.petId ? (<span className="text-danger font-medium">{errors.petId.message}</span>) : null}
                </div>

              </div>
              <div className="col-12 row">

                <div className="col-6">

                  {/* Form - fromDate */}
                  <div className="form-inner">
                    <label>Ngày bắt đầu sử dụng:</label>
                    <input {...register("fromDate")} type="date" />
                    {errors.fromDate ? (<span className="text-danger font-medium">{errors.fromDate.message}</span>) : null}
                  </div>

                </div>
                <div className="col-6 ">
                  {/* Form - weeks */}
                  <div className="form-inner">
                    <label>Số tuần sử dụng (liên tục):</label>
                    <input {...register("weeks")} type="number" placeholder="Bạn dùng trong bao lâu?" step={1} />
                    {errors.weeks ? (<span className="text-danger font-medium">{errors.weeks.message}</span>) : null}
                  </div>

                </div>
              </div>

              <div className="col-12 row">
                <div className="col-6">
                  <div className="form-inner">
                    <label>Thời gian đưa mỗi ngày:</label>
                    <input {...register("receiveTime")} type="time" onInput={(e) => formatTime(e)} />
                    {errors.receiveTime ? (<span className="text-danger font-medium">{errors.receiveTime.message}</span>) : null}
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="form-inner">
                    <label>Thời gian đón mỗi ngày:</label>
                    <input {...register("returnTime")} type="time" onInput={(e) => formatTime(e)} />
                    {errors.returnTime ? (<span className="text-danger font-medium">{errors.returnTime.message}</span>) : null}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="form-inner">
                  <label>Lời nhắn với trung tâm:</label>
                  <textarea {...register("detail")}
                    placeholder="Lời nhắn nhủ của bạn với trung tâm (không bắt buộc)"
                    rows={6} defaultValue={""}
                  />
                  {errors.detail ? (<span className="text-danger font-medium">{errors.detail.message}</span>) : null}
                </div>
              </div>
            </div>

          </div>
        </div>
        <aside className="col-lg-5 ">
          <OrderSummary packageId={packageId} />
          <div className="payment-form">
            <div className="payment-methods mb-40">
              <div className="form-check payment-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  checked
                  readOnly
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Xác nhận thanh toán
                </label>
                <p className="para">
                  Sau khi nhấn đăng kí dịch vụ, chúng tôi sẽ chuyển yêu cầu về phía trung tâm.
                  Hóa đơn sẽ gửi về ngay khi yêu cầu này được duyệt.
                </p>
              </div>
              {/* <div className="payment-form-bottom d-flex align-items-start">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I have read and agree to the website <br />{" "}
                  <a href="#">Terms and conditions</a>
                </label>
              </div> */}
            </div>
          </div>

          {sessionToken ? null : (<p className="text-danger font-medium text-center">Bạn cần đăng nhập để sử dụng chức năng này!</p>)}
          <div className="place-order-btn d-flex justify-content-center">

            <button disabled={isSubmitting || (sessionToken === undefined)} type="submit" className="primary-btn1 lg-btn">
              {isSubmitting ? "loading" : "Đăng kí dịch vụ"}
            </button>

          </div>
        </aside>
      </form>
    </>
  );

}
export default BillingDetails;
