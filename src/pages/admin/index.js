'use client'
import React from "react";
import Layout from "../../admin-components/Layout";
import Link from 'next/link';
import { Col, Row, Container, Image } from 'react-bootstrap';

export default function admin() {
    return (
        <Layout>
            <div className="container-fluid px-6 py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center mb-7">
                            <h1 className="display-4">Layouts</h1>
                            <p>Customize your overview page layout. Choose the one that best fits your needs.</p>
                        </div>
                        <span className="divider fw-bold my-3">Demo layouts</span>
                    </div>
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
            </div>
        </Layout>
    );
}

