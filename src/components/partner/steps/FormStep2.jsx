import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

const FormStep2 = ({ onNext, onBack, formData, onInputChange }) => {

  const [errors, setErrors] = useState({});

  const inputFrontRef = useRef(null);
  const inputBackRef = useRef(null);

  const [fileFront, setFileFront] = useState(null);
  const [fileBack, setFileBack] = useState(null);
  const validate = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = 'Tên đăng nhập là bắt buộc';
    if (!formData.password) tempErrors.password = 'Mật khẩu tài khoản là bắt buộc';
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
    // setFormData({
    //   ...formData,
    //   [name]: files[0]
    // });
    onInputChange(name, files[0]);
    console.log('ok khong' - name);
  };
  const handleImageRemove = (name) => {
    onInputChange(name, null);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=' row'>
          <div className="form-group col">
            <label>* Tên đăng nhập cho tài khoản quản lý</label>
            <input
              type="text"
              name="username"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="form-group col">
            <label>* Mật khẩu cho tài khoản quản lý</label>
            <input
              type="text"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
        </div>
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
                accept='image/*'
                ref={inputFrontRef}
                className={`form-control ${errors.frontImage ? 'is-invalid' : ''}`}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleFileChange(e)
                    setFileFront(file)
                  }
                }}
              />
              {errors.frontImage && <div className="invalid-feedback">{errors.frontImage}</div>}
              {(fileFront) && (
                <div>
                  <img
                    src={URL.createObjectURL(fileFront)}
                    width={128}
                    height={128}
                    alt='preview'
                    className='w-32 h-32 object-cover'
                  />
                  <button type='button'
                    className={'btn btn-danger shadow-sm d-inline-block rounded p-2 fs-6'}
                    style={{ opacity: 0.9 }}
                    onClick={() => {
                      setFileFront(null)
                      handleImageRemove('frontImage')
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
            <div>
              <label>Mặt sau</label>
              <input
                type="file"
                name="backImage"
                accept='image/*'
                ref={inputBackRef} //??? wtf sao cái remove méo chạy vậy
                className={`form-control ${errors.backImage ? 'is-invalid' : ''}`}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileChange(e)
                    setFileBack(file)
                  }
                }}
              />
              {errors.backImage && <div className="invalid-feedback">{errors.backImage}</div>}
              {(fileBack) && (
                <div>
                  <img
                    src={URL.createObjectURL(fileBack)}
                    width={128}
                    height={128}
                    alt='preview'
                    className='w-32 h-32 object-cover'
                  />
                  <button
                    type='button'
                    className={'btn btn-danger shadow-sm d-inline-block rounded p-2 fs-6'}
                    style={{ opacity: 0.9 }}
                    onClick={() => {
                      setFileBack(null)
                      handleImageRemove('backImage')
                      if (inputBackRef.current) {
                        inputBackRef.current.value = ''
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
        <div className="d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Quay lại
          </button>
          <button type="submit" className="btn btn-success">
            Tiếp tục
          </button>
        </div>

      </form>
    </>
  );
};

export default FormStep2;
