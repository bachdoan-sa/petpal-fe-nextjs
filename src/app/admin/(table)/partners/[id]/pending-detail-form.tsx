'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import UserApiRequest from '@/src/apiRequests/user';
import { UserType } from '@/src/schemaValidations/user.schema';
import { useRouter } from 'next/navigation';

export default function PendingDetailForm({ partnerId, sessionToken }: { partnerId: string; sessionToken: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [partner, setPartner] = useState<UserType>();

    useEffect(() => {
        if (partnerId) {
            const fetchPartnerById = async () => {
                try {
                    const response = await UserApiRequest.getPendingPartnerById({ userId: partnerId, sessionToken });
                    setPartner(response.payload.data)
                    // console.log("Package data: hahaha", packageDetail);
                } catch (error) {
                    console.error("Error fetching package:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchPartnerById();

        }

    }, [partnerId]);
    const handleApprove = async (e) => {
        try {
            await UserApiRequest.approvePartnerRegistration({ body: { partnerId }, sessionToken });
            toast.success("Chấp thuận đối tác thành công!");
            router.push('/admin/partners/pending-partners');
            router.refresh();
        } catch (error: any) {
            toast.error("Lỗi máy chủ! Vui lòng thử lại  sau ít phút.");
        }
    };
    const handleReject = async (e) => {
        try {
            await UserApiRequest.rejectPartnerRegistration({ body: { partnerId }, sessionToken });
            toast.success("Từ chối đối tác thành công!");
            router.push('/admin/partners/pending-partners');
            router.refresh();
        } catch (error: any) {
            toast.error("Lỗi máy chủ! Vui lòng thử lại sau ít phút.");
        }
    };
    return (
        <div className='row'>
            {(loading) ? (
                <>
                    <h1>Đây là màn hình chờ... Đang truy vấn dữ liệu</h1>
                </>
            ) : (
                partner ? (
                    <>
                        <div className='col'>
                            <div className="rounded bg-gray-100 p-4">
                                {/* User Name */}
                                <div className="mb-4">
                                    <label htmlFor="username" className="mb-2 d-block text-sm font-medium">
                                        Tên người dùng:
                                    </label>
                                    <div className="relative">
                                        <p> {partner.fullName} </p>
                                    </div>
                                </div>

                                {/* fullName */}
                                <div className="mb-4">
                                    <label htmlFor="fullname" className="mb-2 d-block text-sm font-medium">
                                        Địa chỉ Email:
                                    </label>
                                    <div className="relative mt-2 rounded-md">
                                        <div className="relative">
                                            <p> {partner.email} </p>
                                        </div>
                                    </div>
                                </div>

                                {/* address */}
                                <div className="mb-4">
                                    <label htmlFor="address" className="mb-2 d-block text-sm font-medium">
                                        Địa chỉ thường trú:
                                    </label>
                                    <div className="relative mt-2 rounded-md">
                                        <div className="relative">
                                            <p> {partner.address} </p>
                                        </div>
                                    </div>
                                </div>

                                {/* phone Number */}
                                <div className="mb-4">
                                    <label htmlFor="phonenumber" className="mb-2 d-block text-sm font-medium">
                                        Số điện thoại:
                                    </label>
                                    <div className="relative mt-2 rounded-md">
                                        <div className="relative">
                                            <p> {partner.phoneNumber} </p>
                                        </div>
                                    </div>
                                </div>
                                {/* email */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="mb-2 d-block text-sm font-medium">
                                        Status
                                    </label>
                                    <div className="relative mt-2 rounded-md">
                                        <div className="relative">
                                            <p> {partner.status} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 d-flex justify-content-end gap-4 col-12">
                            <Link
                                href="/admin/partners/pending-partners"
                                className="d-flex h-10 align-items-center rounded-pill bg-gray-300 hover-for-bg-gray px-4 text-gray-600"
                            >
                                Trở về danh sách
                            </Link>
                            {(partner.status == "PENDING") ? (
                                <>
                                    <button className='btn btn-primary btn-sm d-flex align-items-center rounded-pill px-4' type="button" onClick={handleApprove}> Cho phép đối tác</button>
                                    <button className='btn btn-danger btn-sm d-flex align-items-center rounded-pill px-4' type="button" onClick={handleReject}> Từ chối đối tác</button>
                                </>
                            ) : (
                                <>
                                </>
                            )
                            }


                        </div>
                    </>
                ) : (
                    <div className='col d-flex justify-content-center' >
                        <h3>Có lỗi diễn ra trong lúc truy vấn dữ liệu, vui lòng thoát ra</h3>
                    </div>
                )
            )
            }

        </div>
    );

}

