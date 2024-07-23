'use client'
import React from "react";
import Breadcrumb from "@/src/components/breadcrumb/Breadcrumb";
import ShopCard from "@/src/components/shop/ShopCard";

function Shop() {
  const [value, setValue] = React.useState(50);
  return (
    <> 
    {/* Layout component được chuyển ra ngoài layout của app */}
      {/* <Breadcrumb pageName="Shop" pageTitle="Shop" /> */}
      <div className="card bg-dark text-dark">
        <img
          src="assets/images/bg/h1-newsletter-bg.png"
          className="card-img"
          alt="..."
          style={{ height: "220px", objectFit: "cover" }}
        />
        <div className="card-img-overlay d-flex flex-column justify-content-end">
          <h3 className="card-title">Pet Care Center Vinhome</h3>
          <h5 className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.  {" "}
            <a
              href={"https://maps.app.goo.gl/bY8qLehwZyu2Tydi8"}
              target="_blank"
              rel="noopener noreferrer"
              className="map-icon"
              // style={{position: "absolute"}}
            >
              <i className="bi bi-map"></i>
            </a>
          </h5>
        </div>
      </div>
      <div className="shop-page pt-30 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop-sidebar">
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Category</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Dog
                        <input type="checkbox" defaultChecked={true} />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Cat
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Bird
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Flavor</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Beef
                        <input type="checkbox" defaultChecked={true} />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Chicken
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Fish
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Duck
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Other
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-lg-9">
              {/* <div className="row mb-50"> */}
              {/* <div className="col-lg-12">
                  <div className="multiselect-bar">
                    <h6>shop</h6>
                    <div className="multiselect-area">
                      <div className="single-select">
                        <span>Show</span>
                        <select
                          className="defult-select-drowpown"
                          id="color-dropdown"
                        >
                          <option>12</option>
                          <option>15</option>
                          <option>18</option>
                          <option>21</option>
                          <option>25</option>
                        </select>
                      </div>
                      <div className="single-select two">
                        <select
                          style={{ outline: "none" }}
                          className="defult-select-drowpown"
                          id="eyes-dropdown"
                        >
                          <option>Default</option>
                          <option>Grid</option>
                          <option>Closed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div> */}
              {/* </div> */}
              <div className="row g-4 justify-content-center">
                <ShopCard />
              </div>
              <div className="row pt-70">
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="paginations-area">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="bi bi-arrow-left-short" />
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            01
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            02
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            03
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="bi bi-arrow-right-short" />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
