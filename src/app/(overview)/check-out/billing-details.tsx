'use client'
import React, { useEffect, useState } from "react";
import { PetListPageBodyType, PetType } from "@/src/schemaValidations/pet.schema";
import PetApiRequest from "@/src/apiRequests/pet";
const BillingDetails = ({ sessionToken }: { sessionToken?: string }) => {
  const [pets, setPets] = useState<PetType[]>([]);
  const [user, setUser] = useState<{ id, name, role }>();

  useEffect(() => {
    if (sessionToken) {
      const _user = localStorage.getItem('user');
      setUser(_user ? JSON.parse(_user) : null);
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
  return (
    <>
      <div className="form-wrap box--shadow mb-30">
        <h4 className="title-25 mb-20">Billing Details</h4>
        <form>
          <div className="row">
            <div className="col-lg-12">
              <div className="form-inner">
                <label>Chào mừng:</label>
                <span style={{fontSize:"1.25rem", fontWeight:"600"}} className="ms-3 text-dark" >{user?.name ?? 'Khách ẩn danh'}</span>
              </div>
            </div>
            <div className="col-12">
              <div className="form-inner">
                <label>Địa chỉ hiện tại của bạn:</label>
                <input
                  type="text"
                  name="fname"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div className="col-12">
              <div className="form-inner">
                <label>Hãy chọn thú cưng cho dịch vụ này:</label>
                {(pets.length>0) ? (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    {pets?.map((option, index) => (
                      <option
                        key={index}
                      // value={option.value}
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

            <div className="col-12">
              <div className="form-inner">
                <label>Thông tin kèm theo:</label>
                <input
                  type="text"
                  name="fname"
                  placeholder="Your Phone Number"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-inner">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                />
              </div>
            </div>

            <div className="col-12">
              <div className="form-inner">
                <textarea
                  name="message"
                  placeholder="Order Notes (Optional)"
                  rows={6}
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default BillingDetails;
