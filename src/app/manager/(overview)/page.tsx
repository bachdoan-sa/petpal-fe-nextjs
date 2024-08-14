import React from "react";

import Link from 'next/link';


export default function manager() {
    return (
        <>

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
            {/* <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Accordion Item #3
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <button type="button" data-bs-toggle="modal" data-bs-target="#myModal">Launch modal</button>
            <div
                className="modal modal-alert bg-secondary py-5"
                tabIndex={-1}
                role="dialog"
                id="myModal"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-body p-4 text-center">
                            <h5 className="mb-0">Enable this setting?</h5>
                            <p className="mb-0">
                                You can always change your mind in your account settings.
                            </p>
                        </div>
                        <div className="modal-footer flex-nowrap p-0">
                            <button
                                type="button"
                                className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
                            >
                                <strong>Yes, enable</strong>
                            </button>
                            <button
                                type="button"
                                className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
                                data-bs-dismiss="modal"
                            >
                                No thanks
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>     
            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

