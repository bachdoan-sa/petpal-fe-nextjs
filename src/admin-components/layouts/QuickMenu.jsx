// import node module libraries
import Link from 'next/link';
import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';

// // simple bar scrolling used for notification item scrolling
// import SimpleBar from 'simplebar-react';
// import 'simplebar/dist/simplebar.min.css';

// // import data files
// import NotificationList from 'data/Notification';

// import hooks
import useMounted from '../../hooks/useMounted';

function QuickMenu() {

    const hasMounted = useMounted();

    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    // function Notifications () {
    //     return (
    //         <SimpleBar style={{ maxHeight: '300px' }}>
    //             <ListGroup variant="flush">
    //                 {NotificationList.map(function (item, index) {
    //                     return (
    //                         <ListGroup.Item className={index === 0 ? 'bg-light' : ''} key={index}>
    //                             <Row>
    //                                 <Col>
    //                                     <Link href="#" className="text-muted">
    //                                         <h5 className=" mb-1">{item.sender}</h5>
    //                                         <p className="mb-0"> {item.message}</p>
    //                                     </Link>
    //                                 </Col>
    //                             </Row>
    //                         </ListGroup.Item>
    //                     );
    //                 })}
    //             </ListGroup>
    //         </SimpleBar>
    //     );
    // }

    function QuickMenuDesktop() {
        return (
            <ul className=" navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap" >
                <li className=" stopevent" role="presentation">
                    <div className="dropdown">
                        <button id="dropdownNotification" className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fe fe-bell"></i>
                        </button>
                        <ul className="dashboard-dropdown notifications-dropdown dropdown-menu dropdown-menu-lg dropdown-menu-end py-0 show" aria-labelledby="dropdownNotification">
                            <li className="dropdown-item mt-3" role="presentation">
                                <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                                    <span className="h4 mb-0">Notifications</span>
                                    <Link href="/" className="text-muted">
                                        <span className="align-middle">
                                            <i className="fe fe-settings me-1"></i>
                                        </span>
                                    </Link>
                                </div>
                                <div className="border-top px-3 pt-3 pb-3">
                                    <a href="/dashboard/notification-history" className="text-link fw-semi-bold">See all Notifications</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="ms-2" role="presentation">
                    <div className="dropdown" >
                        <button id="dropdownUser" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{borderRadius:"50%"}}>
                            <img alt="avatar" src='/images/avatar/avatar-1.jpg' className="rounded-circle avatar avatar-md avatar-indicators avatar-online" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser" show>
                            <li className="dropdown-item px-4 pb-0 pt-2" role="presentation">
                                <div className="lh-1">
                                    <h5 className="mb-1"> John E. Grainger</h5>
                                    <Link href="#" className="text-inherit fs-6">View my profile</Link>
                                </div>
                                <div className="dropdown-divider mt-3 mb-2"></div>
                            </li>
                            <li className="dropdown-item"><i className="fe fe-user me-2"></i> Edit Profile</li>
                            <li className="dropdown-item"><i className="fe fe-activity me-2"></i> Activity Log</li>
                            <li className="dropdown-item text-primary"><i className="fe fe-star me-2"></i> Go Pro</li>
                            <li className="dropdown-item"><i className="fe fe-settings me-2"></i> Account Settings</li>
                            <li className="dropdown-item"><i className="fe fe-power me-2"></i>Sign Out</li>
                        </ul>
                    </div>
                </li>
            </ul>
        )
    }

    function QuickMenuMobile() {
        return (
            <>
                {/* unsupport */}
            </>
        )
    }

    return (

        <Fragment>
            {hasMounted && isDesktop ? <QuickMenuDesktop /> : <QuickMenuMobile />}
        </Fragment>
    );
    // return (
    //     <Fragment>
    //         { hasMounted && isDesktop ? <QuickMenuDesktop /> : <QuickMenuMobile />}
    //     </Fragment>
    // )
}

export default QuickMenu;