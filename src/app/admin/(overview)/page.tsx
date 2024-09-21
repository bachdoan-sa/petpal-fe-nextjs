import React from "react";
import Link from 'next/link';
import CardWrapper from "@/src/components/admin/dashboard/Cards";
import Breadcrumbs from "@/src/components/admin/breadcrumbs";
import OrderChart from "./components/OrderChart"
export default function admin() {
    return (
        <>
            <div className="bg-primary pt-5 pb-21"></div>
            <div className="container-fluid px-6 py-4">


                <div className="mt-n22 container-fluid">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <Breadcrumbs
                            breadcrumbs={[
                                { label: 'Bảng thống kê trung tâm', href: '/admin', active: true, color: 'white' }
                            ]}
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gx-4">
                        <CardWrapper />
                    </div>
                </div>

                <div className="pt-5 container-fluid">
                    <div className="row">
                        <div className="col-8">
                            <OrderChart />
                        </div>
                        <div className="col-4 d-flex flex-columns">
                            <div className="card flex-1">
                                ab
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

