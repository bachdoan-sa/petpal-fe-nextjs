import React, { useRef, useState } from 'react';

const FormStep1 = ({ onNext, formData, onInputChange }) => {


  const [errors, setErrors] = useState({});

  const inputRef = useRef(null);
  const [carecenter_image, setCarecenter_image] = useState(null);
  const validate = () => {
    let tempErrors = {};
    if (!formData.careCenterName) tempErrors.careCenterName = 'Tên center là bắt buộc';
    if (!formData.hotline) tempErrors.hotline = 'Số điện thoại là bắt buộc';
    if (!formData.city) tempErrors.city = 'Thành phố là bắt buộc';
    if (!formData.district) tempErrors.district = 'Quận là bắt buộc';
    if (!formData.ward) tempErrors.ward = 'Phường là bắt buộc';
    if (!formData.street) tempErrors.street = 'Số nhà và Đường/Phố là bắt buộc';
    if (!formData.carecenter_image) tempErrors.carecenter_image = 'Hình ảnh đại diện là bắt buộc';
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
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    onInputChange(name, files[0]);
    console.log('ok khong' - name);
  };
  const handleImageRemove = (name) => {
    onInputChange(name, null);
  }
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
      <div className="form-group">
        <label>* Ảnh chụp CMND/CCCD/Hộ chiếu</label>
        <div className="d-flex">
          <div className="me-3">
            <label>Mặt trước</label>
            <input
              type="file"
              name="carecenter_image"
              accept='image/*'
              ref={carecenter_image}
              className={`form-control ${errors.carecenter_image ? 'is-invalid' : ''}`}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  handleFileChange(e)
                  setCarecenter_image(file)
                }
              }}
            />
            {errors.carecenter_image && <div className="invalid-feedback">{errors.carecenter_image}</div>}
            {(carecenter_image) && (
              <div>
                <img
                  src={URL.createObjectURL(carecenter_image)}
                  width={128}
                  height={128}
                  alt='preview'
                  className='w-32 h-32 object-cover'
                />
                <button type='button'
                  className={'btn btn-danger shadow-sm d-inline-block rounded p-2 fs-6'}
                  style={{ opacity: 0.9 }}
                  onClick={() => {
                    setCarecenter_image(null)
                    handleImageRemove('carecenter_image')
                    if (inputFrontRef.current) {
                      inputFrontRef.current.value = ''
                    }
                  }}
                >
                  Xóa hình ảnh
                </button>
              </div>
            )}
          </div>

        </div>
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