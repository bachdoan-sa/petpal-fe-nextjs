'use client'
import React, { isValidElement, useContext, useEffect, useState } from "react";
import { PetListPageBodyType, PetType } from "@/src/schemaValidations/pet.schema";
import PetApiRequest from "@/src/apiRequests/pet";
import OrderSummary from "./order-summary";
import { useAppContext } from "@/src/app/app-provider";
import { CreateOrderBodyType, CreateOrderResType } from "@/src/schemaValidations/order.schema";
import { HttpError } from "@/src/lib/httpAxios";
import orderApiRequest from "@/src/apiRequests/order";
import { toast } from "sonner";
const BillingDetails = ({ packageId, sessionToken }: { packageId: string; sessionToken?: string }) => {
  const [pets, setPets] = useState<PetType[]>([]);
  const [user, setUser] = useState<{ id, name, role }>();

  useEffect(() => {
    if (sessionToken) {
      const user = localStorage.getItem('user');
      setUser(user ? JSON.parse(user) : undefined);
      const fetchPets = async () => {
        try {
          const body: PetListPageBodyType = {
            page: 1,
            size: 20
          }
          const response = await PetApiRequest.getListPetForUser({ body, sessionToken });
          setPets(response.payload.data.list);
          // console.log("Package data: hahaha", packageDetail);
        } catch (error) {
          console.error("Error fetching package:", error);
        }
      };
      fetchPets();

    }

  }, [sessionToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!sessionToken) {
      toast.warning("Bạn cần đăng nhập để sử dụng chức năng này.")
      return;
    }
    const formData = new FormData(event.currentTarget);
    const weeks = (formData.get('weeks') ?? 0) as number;
    const fromDate = (formData.get('fromDate') ?? new Date()) as Date;
    const toDate = new Date(fromDate);
    toDate.setDate(toDate.getDate() + (weeks * 7));
    const createOrderForm: CreateOrderBodyType = {
      petId: formData.get('petId') as string,
      packageId: packageId,
      detail: formData.get('detail') as string,
      fromDate: fromDate,
      toDate: toDate,
      receiveTime: (formData.get('receiveTime')+":00") as string,
      returnTime: (formData.get('returnTime')+":00") as string,
    }
    try {
      const response = await orderApiRequest.userCreateOrder({ body: createOrderForm, sessionToken: sessionToken })
      toast.success("Tạo đơn đăng ký thành công.");
    } catch (error: any) {
      if (error instanceof HttpError) {
        console.log(error.payload);
      }
    }

  }
  return (
    <>
      <form className="row g-4" onSubmit={handleSubmit}>
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

              <div className="col-12">
                <div className="form-inner">
                  <label>Hãy chọn thú cưng cho dịch vụ này:</label>
                  {(pets.length > 0) ? (
                    <select
                      className="form-select"
                      name="petId"
                      aria-label="Default select example"
                    >
                      {pets?.map((option) => (
                        <option
                          key={option.id}
                          value={option.id}
                        // selected={option.value === ""}
                        >
                          {option.fullName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Lựa chọn thú cưng của bạn"
                        value="Bạn cần đăng nhập để lấy danh sách thú cưng."
                        readOnly
                        disabled
                      />
                    </>
                  )
                  }

                </div>
              </div>
              <div className="col-12 row">
                <div className="col-6">
                  <div className="form-inner">
                    <label>Ngày bắt đầu sử dụng:</label>
                    <input
                      type="date"
                      name="fromDate"
                    />
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="form-inner">
                    <label>Số tuần sử dụng (liên tục):</label>
                    <input
                      type="number"
                      name="weeks"
                      placeholder="Bạn dùng trong bao lâu?"
                      step={1}
                      min={1}
                      max={12}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 row">
                <div className="col-6">
                  <div className="form-inner">
                    <label>Thời gian đưa mỗi ngày:</label>
                    <input
                      type="time"
                      name="receiveTime"
                    />
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="form-inner">
                    <label>Thời gian đón mỗi ngày:</label>
                    <input
                      type="time"
                      name="returnTime"
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="form-inner">
                  <label>Lời nhắn với trung tâm:</label>
                  <textarea
                    name="detail"
                    placeholder="Order Notes (Optional)"
                    rows={6}
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
        <aside className="col-lg-5">
          <OrderSummary packageId={packageId} />
          <div className="payment-form">
            <div className="payment-methods mb-50">
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
                  Sau khi nhấn đăng kí dịch vụ, yêu cầu này sẽ được gửi về bên trung tâm.
                  Hóa đơn sẽ gửi về nếu yêu cầu được này được duyệt.
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
            <div className="place-order-btn">
              <button type="submit" className="primary-btn1 lg-btn">
                Đăng kí dịch vụ
              </button>
            </div>
          </div>
        </aside>
      </form>
    </>
  );
}

export default BillingDetails;
