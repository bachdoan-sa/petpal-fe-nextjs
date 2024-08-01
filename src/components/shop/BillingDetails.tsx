import React from "react";

import {PetListPageBodyType, PetType} from "@/src/schemaValidations/pet.schema";
import { cookies } from "next/headers";
import PetApiRequest from "@/src/apiRequests/pet";
const BillingDetails = async() => {
  
  const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
    const body:PetListPageBodyType = {
        page: 1,
        size: 20
    }
    let pets: PetType[] = [];
    let totalPages: number = 1;
    try {
        const response = await PetApiRequest.getListPetForUser({ body, sessionToken });
        totalPages = response.payload?.data?.paging?.maxPage;
        pets = response.payload?.data?.list;
    } catch (error: any) {
        console.log(error);
    }
    
  return (
    <>
      <div className="form-wrap box--shadow mb-30">
        <h4 className="title-25 mb-20">Billing Details</h4>
        <form>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-inner">
                <label>First Name</label>
                <input type="text" name="fname" placeholder="Your first name" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-inner">
                <label>Last Name</label>
                <input type="text" name="fname" placeholder="Your last name" />
              </div>
            </div>
            <div className="col-12">
              <div className="form-inner">
                <label>Country / Region</label>
                <input
                  type="text"
                  name="fname"
                  placeholder="Your country name"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-inner">
                <label>Street Address</label>
                <input
                  type="text"
                  name="fname"
                  placeholder="House and street name"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-inner">
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
                   {option.fullname}
                  </option>
                ))}
              </select>
              </div>
            </div>
            <div className="col-12">
              <div className="form-inner">
                <input type="text" name="fname" placeholder="Post Code" />
              </div>
            </div>
            <div className="col-12">
              <div className="form-inner">
                <label>Additional Information</label>
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
                <input type="text" name="postcode" placeholder="Post Code" />
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
