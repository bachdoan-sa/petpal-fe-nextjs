import React, { useState } from 'react';

const FormStep2 = ({ onNext, onBack, formData, onInputChange }) => {
 

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = 'Tên đầy đủ là bắt buộc';
    if (!formData.email) tempErrors.email = 'Email là bắt buộc';
    if (!formData.phoneNumber) tempErrors.phoneNumber = 'Số điện thoại là bắt buộc';
    if (!formData.idNumber) tempErrors.idNumber = 'Số CMND/CCCD/Hộ chiếu là bắt buộc';
    if (!formData.issueDate) tempErrors.issueDate = 'Ngày cấp là bắt buộc';
    if (!formData.issuePlace) tempErrors.issuePlace = 'Nơi cấp là bắt buộc';
    if (!formData.frontImage) tempErrors.frontImage = 'Ảnh mặt trước là bắt buộc';
    if (!formData.backImage) tempErrors.backImage = 'Ảnh mặt sau là bắt buộc';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
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
        <label>* Tên đầy đủ người đại diện</label>
        <input
          type="text"
          name="fullName"
          className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
      </div>
      <div className="form-group">
        <label>* Email</label>
        <input
          type="email"
          name="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label>* Số điện thoại</label>
        <input
          type="text"
          name="phoneNumber"
          className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
      </div>
      <div className="form-group">
        <label>Số điện thoại khác</label>
        <input
          type="text"
          name="alternatePhoneNumber"
          className="form-control"
          value={formData.alternatePhoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>* Số CMND/CCCD/Hộ chiếu</label>
        <input
          type="text"
          name="idNumber"
          className={`form-control ${errors.idNumber ? 'is-invalid' : ''}`}
          value={formData.idNumber}
          onChange={handleChange}
        />
        {errors.idNumber && <div className="invalid-feedback">{errors.idNumber}</div>}
      </div>
      <div className="form-group">
        <label>* Ngày cấp</label>
        <input
          type="date"
          name="issueDate"
          className={`form-control ${errors.issueDate ? 'is-invalid' : ''}`}
          value={formData.issueDate}
          onChange={handleChange}
        />
        {errors.issueDate && <div className="invalid-feedback">{errors.issueDate}</div>}
      </div>
      <div className="form-group">
        <label>* Nơi cấp</label>
        <input
          type="text"
          name="issuePlace"
          className={`form-control ${errors.issuePlace ? 'is-invalid' : ''}`}
          value={formData.issuePlace}
          onChange={handleChange}
        />
        {errors.issuePlace && <div className="invalid-feedback">{errors.issuePlace}</div>}
      </div>
      <div className="form-group">
        <label>* Ảnh chụp CMND/CCCD/Hộ chiếu</label>
        <div className="d-flex">
          <div className="me-3">
            <label>Mặt trước</label>
            <input
              type="file"
              name="frontImage"
              className={`form-control ${errors.frontImage ? 'is-invalid' : ''}`}
              onChange={handleFileChange}
            />
            {errors.frontImage && <div className="invalid-feedback">{errors.frontImage}</div>}
          </div>
          <div>
            <label>Mặt sau</label>
            <input
              type="file"
              name="backImage"
              className={`form-control ${errors.backImage ? 'is-invalid' : ''}`}
              onChange={handleFileChange}
            />
            {errors.backImage && <div className="invalid-feedback">{errors.backImage}</div>}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          Quay lại
        </button>
        <button type="submit" className="btn btn-success">
          Tiếp tục
        </button>
      </div>
    </form>
  );
};

export default FormStep2;
