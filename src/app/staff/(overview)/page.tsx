import React from "react";

import Link from 'next/link';
import StatRightTopIcon from "./StatRightTopIcon";
import ActiveProjects from "./ActiveProjects";

const ProjectsStats = [
    {
        id: 1,
        title: "Projects",
        value: 18,
        icon: <i className="bi bi-briefcase" ></i>,
        statInfo: '<span className="text-dark me-2">2</span> Completed'
    },
    {
        id: 2,
        title: "Active Task",
        value: 132,
        icon: <i className="bi bi-list-task"></i>,
        statInfo: '<span className="text-dark me-2">28</span> Completed'
    },
    {
        id: 3,
        title: "Teams",
        value: 12,
        icon: <i className="bi bi-people" ></i>,
        statInfo: '<span className="text-dark me-2">1</span> Completed'
    },
    {
        id: 4,
        title: "Productivity",
        value: '76%',
        icon: <i className="bi bi-bullseye"></i>,
        statInfo: '<span className="text-dark me-2">5%</span> Completed'
    }
];

export default function StaffDashboard() {
    return (
        <>
            <div className="bg-primary pt-10 pb-21"></div>
            <div className="container-fluid mt-n22 px-6">
                <div className="row">
                    <div className="col-12">
                        {/* Page header */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    <h3 className="mb-0  text-white">Staff Overview Dashboard</h3>
                                </div>
                                <div>
                                    <Link href="#" className="btn btn-white">Today List</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {ProjectsStats.map((item, index) => {
                        return (
                            <div className="col-xl-3 col-lg-6 col-md-12 col-xs-12 mt-6" key={index}>
                                <StatRightTopIcon info={item} />
                            </div>
                        )
                    })}
                </div>
                <ActiveProjects />
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-3 col-sm-6 my-4">
                    <Link className="card" href="/admin">

                        <div className="card-body text-center">
                            <h5 className="mb-0">ADMIN</h5>
                        </div>
                    </Link>
                </div>
            </div>


        </>
    );
}

