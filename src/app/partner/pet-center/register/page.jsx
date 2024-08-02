"use client";
import React, { useState } from "react";
import ProgressSteps from "../../../../components/partner/ProgressSteps";
import FormStep1 from "../../../../components/partner/steps/FormStep1";
import FormStep2 from "../../../../components/partner/steps/FormStep2";
import { toast } from "sonner";
import { boolean } from "zod";
import petCenterApiRequest from "@/src/apiRequests/pet-center";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {
      careCenterName: "",
      address: "",
      hotline: "",

      city: "",
      district: "",
      ward: "",
      street: ""
    },
    step2: {
      username: "",
      password: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      email: "",

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

  const handleSubmit = async () => {
    toast.warning("Đang xử lí lưu trữ");
    setLoading(true);
    const data = new FormData();
    data.append('CareCenter.CareCenterName', formData.step1.careCenterName);
    data.append('CareCenter.Address', formData.step1.street);
    data.append('CareCenter.Hotline', formData.step1.hotline);
    data.append('Manager.Username', formData.step2.username);
    data.append('Manager.Password', formData.step2.password);
    data.append('Manager.FullName', formData.step2.fullName);
    data.append('Manager.Address', formData.step2.address);
    data.append('Manager.PhoneNumber', formData.step2.phoneNumber);
    data.append('Manager.Email', formData.step2.email);
    data.append('ManagerIdentity.Number', formData.step2.idNumber);
    data.append('ManagerIdentity.CreatedAt', formData.step2.issueDate);
    data.append('ManagerIdentity.CreatedLocation', formData.step2.issuePlace);
    data.append('front_identity', formData.step2.frontImage);
    data.append('back_identity', formData.step2.backImage);
    const response = await petCenterApiRequest.createPetCenterWithManagerd(data);

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
      <button className="btn btn-primary" type="button" onClick={handleSubmit}> submit </button>
    </div>

  );
}
