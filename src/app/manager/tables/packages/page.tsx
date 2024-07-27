"use client";
import React, { Suspense } from "react";
import { lusitana } from "@/src/fonts/fonts";
import data from "@/src/data/tabledatatest.json";
import {
  CreateButton,
  UpdateButton,
  DeleteButton,
} from "@/src/components/admin/table/button.jsx";
import SearchBar from "@/src/components/admin/search";
import Pagination from "@/src/components/admin/table/pagination";
import Package from '@/src/components/manager/test/Package';

export default function ManagerManagePackages() {


  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 1; // await fetchInvoicesPages(query);
  const users = data;
  return (
    <>
      <div className="d-flex w-100 align-items-center justify-content-between">
        <h2 className={`${lusitana.className}`}>Packages</h2>
      </div>
      <div className="mt-4 d-flex align-items-center justify-content-between gap-2 md:mt-8">
        <SearchBar placeholder="Search invoices..." />
        <CreateButton link={""} title={"Create Package"} />
      </div>
      <div className="pt-10">
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                        <tr>
                            <td>1</td>
                            <td>Package Description</td>
                            <td>30 days</td>
                            <td>Active</td>
                            <td>
                                {/* <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#packageDetailModal">View</button> */}
                                <button className="btn btn-warning btn-sm">Edit</button>
                                <button className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
        </div>
    
    
    
      <div className="mt-5 d-flex w-100 justify-content-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}

