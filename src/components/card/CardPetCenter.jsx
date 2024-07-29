import Link from "next/link";
import React from "react";

const PetCareCard = ({ imgSrc, title, description, address }) => {
  return (
    <div className="card mb-3" style={{ width: "860px" }}>
      <div className="row g-0">
        <div className="col-md-4 position-relative">
          <img
            src={imgSrc}
            className="img-fluid rounded-start"
            
            style={{ height: "100%", objectFit: "cover" }}
          />
          <Link legacyBehavior href={'/'}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="position-absolute top-0 end-0 p-2"
            >
              <i
                className="bi bi-geo-alt-fill text-white"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </a>
          </Link>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">{address}</p>
          </div>
        </div>
      </div>
      {/* <Link legacyBehavior href="/careCenterDetail">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={imgSrc}
              style={{ objectFit: "cover", width: "287px", height: "187px" }}
              className="img-fluid rounded-start"
              alt={title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{text}</p>
            </div>
          </div>
        </div>
      </Link> */}
    </div>
  );
};

export default PetCareCard;
