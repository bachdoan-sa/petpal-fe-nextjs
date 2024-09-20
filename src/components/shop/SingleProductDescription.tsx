import { PackageType } from "@/src/schemaValidations/package/package.schema";
import React from "react";

function SingleProductDescription({
  packageDetail,
}: {
  packageDetail?: PackageType;
}) {
  console.log('data: ',packageDetail)
  return (
    <>
      <div className="row mb-120">
        <div className="col-lg-12">
          <div
            className="nav nav2 nav  nav-pills"
            id="v-pills-tab2"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              className="nav-link active"
              id="v-pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-home"
              type="button"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="false"
            >
              Description
            </button>
            <button
              className="nav-link"
              id="v-pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-profile"
              type="button"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="true"
            >
              Excessive Info
            </button>
            {/* <button
              className="nav-link"
              id="v-pills-common-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-common"
              type="button"
              role="tab"
              aria-controls="v-pills-common"
              aria-selected="true"
            >
              Review
            </button> */}
          </div>
          <div className="tab-content tab-content2" id="v-pills-tabContent2">
            <div
              className="tab-pane fade active show"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <div className="description">
                {packageDetail?.description || 'không có miêu tả chi tiết'}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <div className="addithonal-information">
                <table className="table total-table2">
                  <tbody>
                    {/* {packageDetail?.items?.map((item) => { 
                       <tr key={item.Id}>
                       <td>{item.}</td>
                       <td>{item.detail}</td>
                       <td>{item.price}</td>
                     </tr>
                    })} */}
                    <tr>
                      <td>Protein</td>
                      <td>
                        25%, to build and repair tissues, produce enzymes, and
                        maintain healthy organs.
                      </td>
                    </tr>
                    <tr>
                      <td>Fats</td>
                      <td>
                        0.5%, They also help keep the skin and coat healthy.
                      </td>
                    </tr>
                    <tr>
                      <td>Carbohydrates</td>
                      <td>
                        10%, provide energy and help pets maintain healthy
                        weight and keep good the digestive system.
                      </td>
                    </tr>
                    <tr>
                      <td>Minerals</td>
                      <td>
                        20%,Help building strong bones, maintaining healthy
                        muscles, and regulating the body's fluid balance.
                      </td>
                    </tr>
                    <tr>
                      <td>Vitamins</td>
                      <td>
                        15.5%, Essential for a variety of functions in the body,
                        including the immune system, metabolism, and growth.
                      </td>
                    </tr>
                    <tr>
                      <td>Animale</td>
                      <td> For Dog, Cat.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProductDescription;
