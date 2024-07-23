
import React from "react";

const districtOptions = [
    { value: "", label: "Quận/Huyện" },
    { value: "1", label: "Quận 1" },
    { value: "2", label: "Quận 2" },
    { value: "4", label: "Quận 5" },
    { value: "5", label: "Quận 10" },
    { value: "6", label: "Quận 12" },
    { value: "7", label: "Quận Tân Bình" },
    { value: "8", label: "Quận Gò Vấp" },
    { value: "9", label: "Quận Bình Thạnh" },
    { value: "10", label: "Quận Phú Nhuận" },
    { value: "11", label: "Tp. Thủ Đức" },
    // Thêm các option khác nếu cần
];

const careCenterLocation = [
    {
        value: "",
        label:
            "Vinhomes Grand Park, 510 Nguyễn Xiển, Phường Long Thạnh Mỹ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
    },
    {
        value: "1",
        label:
            "Vinhomes Central Park, Khu Vinhomes Central Park, Phường 22, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
    },
    {
        value: "2",
        label:
            "Masteri Millennium, 132 Bến Vân Đồn, Phường 2, Quận 4, Thành phố Hồ Chí Minh",
    },
    {
        value: "3",
        label:
            "Flora Novia, Phạm Văn Đồng, Đào Trinh Nhất, Phường Linh Tây, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
    },
    {
        value: "4",
        label:
            "Masteri An Phú, 179 Xa lộ Hà Nội, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
    },
];

function Map() {
    return (
        <>
            <div className="container">
                <div className="row align-items-center g-lg-4 gy-5">
                    <div className="col-lg-4">
                        <div className="input-group">
                            <div className="col-lg-3">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModalCenter"
                                >
                                    Hổ Chí Minh
                                </button>
                            </div>
                            <div className="col-lg-9">
                                <select className="form-select" aria-label="Default select example">
                                    {districtOptions.map((option, index) => (
                                        <option
                                            key={index}
                                            value={option.value}
                                            selected={option.value === ""}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* modal */}
                            <div
                                className="modal fade"
                                id="exampleModalCenter"
                                tabIndex={-1}
                                role="dialog"
                                aria-labelledby="exampleModalCenterTitle"
                                aria-hidden="true"
                            >
                                <div
                                    className="modal-dialog modal-dialog-centered"
                                    role="document"
                                >
                                    <div className="modal-content">
                                        <div
                                            className="modal-header"
                                            style={{ backgroundColor: "red" }}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Nhập tên tỉnh thành"
                                                className="input-card-modal"
                                            />
                                            <button
                                                type="button"
                                                className="close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">Đóng &times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-10">
                            <select
                                className="form-select"
                                size={6}
                                aria-label="size 3 select example"
                            >
                                {careCenterLocation.map((option, index) => (
                                    <option
                                        key={index}
                                        value={option.value}
                                        selected={option.value === ""}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="care-center-location">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610010537023!2d106.80730807405442!3d10.841127589311577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1720031390460!5m2!1svi!2s"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Map;
