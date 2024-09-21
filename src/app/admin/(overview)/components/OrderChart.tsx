'use client'
import React, { forwardRef, Ref } from 'react';
import Link from 'next/link';
import { MoreVertical } from 'react-feather';
import dynamic from 'next/dynamic';
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const Charts = () => {
    const perfomanceChartSeries = [{
        name: "Orders",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 200, 40, 600]
    }];
    const perfomanceChartOptions: ApexOptions = {
        dataLabels: { enabled: !1 },
        labels: ['Direct', 'Referral', 'Organic'],
        colors: ['#28a745', '#ffc107', '#dc3545'],
        chart: {
            type: 'line',
            zoom: { enabled: false }
        },
        stroke: { curve: 'straight' },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        height: 300
                    }
                }
            },
            {
                breakpoint: 5000,
                options: {
                    chart: {
                        height: 320
                    }
                }
            }
        ]
    };

    // const CustomToggle = forwardRef<HTMLAnchorElement, CustomToggleProps>(
    //     ({ children, onClick }, ref) => (
    //         <Link
    //             href=""
    //             ref={ref}
    //             onClick={(e) => {
    //                 e.preventDefault();
    //                 onClick(e);
    //             }}
    //             className="text-muted text-primary-hover"
    //         >
    //             {children}
    //         </Link>

    //     )
    // );

    // CustomToggle.displayName = 'CustomToggle';

    const ActionMenu = () => {
        return (
            <></>
            // <Dropdown>
            //     <Dropdown.Toggle as={CustomToggle}>
            //         <MoreVertical size="15px" className="text-muted" />
            //     </Dropdown.Toggle>
            //     <Dropdown.Menu align={'end'}>
            //         <Dropdown.Item eventKey="1">
            //             Action
            //         </Dropdown.Item>
            //         <Dropdown.Item eventKey="2">
            //             Another action
            //         </Dropdown.Item>
            //         <Dropdown.Item eventKey="3">
            //             Something else here
            //         </Dropdown.Item>
            //     </Dropdown.Menu>
            // </Dropdown>
        );
    };

    return (
        <div className="h-100 card">
            <div className="card-body">
                {/* <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h4 className="mb-0">Tasks Performance </h4>
                    </div>
                    <ActionMenu />
                </div> */}
                <div className="mb-8">
                    <Chart
                        options={perfomanceChartOptions}
                        series={perfomanceChartSeries}
                        type="line"
                        width="100%"
                    />
                </div>
                {/* icon with content  */}
                {/* <div className="d-flex align-items-center justify-content-around">
                    <div className="text-center">
                        <i className="fe fe-check-circle text-success fs-3"></i>
                        <h1 className="mt-3  mb-1 fw-bold">76%</h1>
                        <p>Completed</p>
                    </div>
                    <div className="text-center">
                        <i className="fe fe-trending-up text-warning fs-3"></i>
                        <h1 className="mt-3  mb-1 fw-bold">32%</h1>
                        <p>In-Progress</p>
                    </div>
                    <div className="text-center">
                        <i className="fe fe-trending-down text-danger fs-3"></i>
                        <h1 className="mt-3  mb-1 fw-bold">13%</h1>
                        <p>Behind</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Charts