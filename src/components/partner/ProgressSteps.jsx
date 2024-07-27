import React from 'react';

const ProgressSteps = ({ currentStep }) => {
    const steps = [
        "Thông tin center",
        "Thông tin người đại diện",
        "Hoàn tất",
      ];
      return (
        <div className="container my-4 ">
          <div className="row justify-content-center">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="col-auto">
                  <div
                    className={`d-flex align-items-center ${
                      currentStep === index + 1 ? "text-danger" : "text-muted"
                    }`}
                  >
                    <div
                      className={`step-circle ${
                        currentStep === index + 1 ? "bg-danger" : "bg-dark"
                      }`}
                    >
                      <span className="text-white">{index + 1}</span>
                    </div>
                    <span
                      className={`ms-2 ${
                        currentStep === index + 1 ? "fw-bold" : ""
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="col-auto">
                    <span
                      className={`mx-2 ${
                        currentStep > index + 1 ? "text-dark" : "text-muted"
                      }`}
                    >
                      —
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
};

export default ProgressSteps;
