import React, { useState } from 'react';

const FormStep1 = ({ onNext, formData, onInputChange }) => {
 

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.careCenterName) tempErrors.careCenterName = 'Tên center là bắt buộc';
    if (!formData.hotline) tempErrors.hotline = 'Số điện thoại là bắt buộc';
    if (!formData.city) tempErrors.city = 'Thành phố là bắt buộc';
    if (!formData.district) tempErrors.district = 'Quận là bắt buộc';
    if (!formData.ward) tempErrors.ward = 'Phường là bắt buộc';
    if (!formData.street) tempErrors.street = 'Số nhà và Đường/Phố là bắt buộc';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>* Tên Center</label>
        <input
          type="text"
          name="careCenterName"
          className={`form-control ${errors.careCenterName ? 'is-invalid' : ''}`}
          value={formData.careCenterName}
          onChange={handleChange}
        />
        {errors.careCenterName && <div className="invalid-feedback">{errors.careCenterName}</div>}
      </div>
      <div className="form-group">
        <label>* Số điện thoại liên hệ</label>
        <input
          type="text"
          name="hotline"
          className={`form-control ${errors.hotline ? 'is-invalid' : ''}`}
          value={formData.hotline}
          onChange={handleChange}
        />
        {errors.hotline && <div className="invalid-feedback">{errors.hotline}</div>}
      </div>
      <div className="form-group">
        <label>* Thành phố</label>
        <input
          type="text"
          name="city"
          className={`form-control ${errors.city ? 'is-invalid' : ''}`}
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
      </div>
      <div className="form-group">
        <label>* Quận</label>
        <input
          type="text"
          name="district"
          className={`form-control ${errors.district ? 'is-invalid' : ''}`}
          value={formData.district}
          onChange={handleChange}
        />
        {errors.district && <div className="invalid-feedback">{errors.district}</div>}
      </div>
      <div className="form-group">
        <label>* Phường</label>
        <input
          type="text"
          name="ward"
          className={`form-control ${errors.ward ? 'is-invalid' : ''}`}
          value={formData.ward}
          onChange={handleChange}
        />
        {errors.ward && <div className="invalid-feedback">{errors.ward}</div>}
      </div>
      <div className="form-group">
        <label>* Số nhà và Đường/Phố</label>
        <input
          type="text"
          name="street"
          className={`form-control ${errors.street ? 'is-invalid' : ''}`}
          value={formData.street}
          onChange={handleChange}
        />
        {errors.street && <div className="invalid-feedback">{errors.street}</div>}
      </div>
      <div className="d-flex justify-content-end mt-4">
        {/* <button type="button" className="btn btn-secondary">
          Quay lại
        </button> */}
        <button type="submit" className="btn btn-danger">
          Tiếp tục
        </button>
      </div>
    </form>
  );
};

export default FormStep1;