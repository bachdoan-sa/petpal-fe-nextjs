"use client";
import React, { useState } from "react";
import ProgressSteps from "../../../../components/partner/ProgressSteps";
import FormStep1 from "../../../../components/partner/steps/FormStep1";
import FormStep2 from "../../../../components/partner/steps/FormStep2";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {
      restaurantName: "",
      phoneNumber: "",
      city: "",
      district: "",
      ward: "",
      streetAddress: "",
    },
    step2: {
      fullName: "",
      email: "",
      phoneNumber: "",
      alternatePhoneNumber: "",
      idNumber: "",
      issueDate: "",
      issuePlace: "",
      frontImage: File || null,
      backImage: File || null,
    },
    // Thêm các trạng thái cho các bước tiếp theo nếu có
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (step, name, value) => {
    setFormData({
      ...formData,
      [step]: {
        ...formData[step],
        [name]: value,
      },
    });
  };

  const handleSubmit = () => {
    console.log("Submitting all data:", formData);
    // Xử lý submit ở đây
  };

  return (
    <div className="container">
      <ProgressSteps currentStep={currentStep} />
      {currentStep === 1 && (
        <FormStep1
          onNext={handleNextStep}
          formData={formData.step1}
          onInputChange={(name, value) =>
            handleInputChange("step1", name, value)
          }
        />
      )}
      {currentStep === 2 && (
        <FormStep2
          onNext={handleNextStep}
          onBack={handlePreviousStep}
          formData={formData.step2}
          onInputChange={(name, value) =>
            handleInputChange("step2", name, value)
          }
        />
      )}
      {/* Bạn có thể thêm các form bước tiếp theo ở đây */}
      {currentStep === 3 && (
        <div className="text-center">
          <h2>Hoàn tất</h2>
          <p>Bạn đã hoàn thành tất cả các bước.</p>
          <p>Cảm ơn bạn đã điền thông tin.</p>
        </div>
      )}
    </div>
  );
}
