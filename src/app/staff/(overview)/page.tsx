import React from "react";

import Link from 'next/link';
import StatRightTopIcon from "./StatRightTopIcon";
import ActiveProjects from "./ActiveProjects";

const ProjectsStats = [
    {
        id: 1,
        title: "Check Attendance",
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
                    {/* {ProjectsStats.map((item, index) => {
                        return (
                            <div className="col-xl-3 col-lg-6 col-md-12 col-xs-12 mt-6" key={index}>
                                <StatRightTopIcon info={item} />
                            </div>
                        )
                    })} */}
                </div>
                <ActiveProjects />
            </div>
        </>
    );
}

