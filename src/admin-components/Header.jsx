import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useRef } from "react";
/*---------Using reducer mange the active or inactive menu----------*/
const initialState = {
    activeMenu: "",
    mobileMenuState: false,
    navState: false,
    scrollY: 0,
};

function Header() {
    return (
        <>
            {/* header header  */}
            <header className="header-area style-2">

                <div className="d-flex justify-content-between container-fluid">

                    {/* Logo */}
                    <div className="header-logo align-items-center d-flex">
                        <Link legacyBehavior href="/">
                            <a>
                                <img
                                    alt="image"
                                    className="img-fluid"
                                    src="assets/images/header2-logo.svg"

                                />
                            </a>
                        </Link>
                    </div>
                    {/* End Logo */}
                    <div className="nav-right d-flex jsutify-content-end align-items-center">
                        <ul>
                            <li className="search-btn">
                                <Link legacyBehavior href="/">
                                    <a>
                                        <svg width={15} height={15} viewBox="0 0 15 15">
                                            <path d="M13.8914 12.3212L11.3164 9.74312C11.1877 9.63999 11.0332 9.56265 10.8787 9.56265H10.4667C11.1619 8.6603 11.5997 7.52593 11.5997 6.26265C11.5997 3.32358 9.1792 0.900146 6.2437 0.900146C3.28245 0.900146 0.887695 3.32358 0.887695 6.26265C0.887695 9.22749 3.28245 11.6251 6.2437 11.6251C7.4797 11.6251 8.6127 11.2126 9.5397 10.4908V10.9291C9.5397 11.0837 9.5912 11.2384 9.71995 11.3673L12.2692 13.9197C12.5267 14.1775 12.9129 14.1775 13.1447 13.9197L13.8657 13.1978C14.1232 12.9658 14.1232 12.5791 13.8914 12.3212ZM6.2437 9.56265C4.41545 9.56265 2.9477 8.09312 2.9477 6.26265C2.9477 4.45796 4.41545 2.96265 6.2437 2.96265C8.0462 2.96265 9.5397 4.45796 9.5397 6.26265C9.5397 8.09312 8.0462 9.56265 6.2437 9.56265Z" />
                                        </svg>
                                    </a>
                                </Link>
                                <form className="nav__search-form">
                                    <input type="text" placeholder="Search keyword" />
                                    <button type="submit">
                                        <svg width={15} height={15} viewBox="0 0 15 15">
                                            <path d="M13.8914 12.3212L11.3164 9.74312C11.1877 9.63999 11.0332 9.56265 10.8787 9.56265H10.4667C11.1619 8.6603 11.5997 7.52593 11.5997 6.26265C11.5997 3.32358 9.1792 0.900146 6.2437 0.900146C3.28245 0.900146 0.887695 3.32358 0.887695 6.26265C0.887695 9.22749 3.28245 11.6251 6.2437 11.6251C7.4797 11.6251 8.6127 11.2126 9.5397 10.4908V10.9291C9.5397 11.0837 9.5912 11.2384 9.71995 11.3673L12.2692 13.9197C12.5267 14.1775 12.9129 14.1775 13.1447 13.9197L13.8657 13.1978C14.1232 12.9658 14.1232 12.5791 13.8914 12.3212ZM6.2437 9.56265C4.41545 9.56265 2.9477 8.09312 2.9477 6.26265C2.9477 4.45796 4.41545 2.96265 6.2437 2.96265C8.0462 2.96265 9.5397 4.45796 9.5397 6.26265C9.5397 8.09312 8.0462 9.56265 6.2437 9.56265Z" />
                                        </svg>
                                    </button>
                                </form>
                            </li>
                            <li>
                                <Link legacyBehavior href="/">
                                    <a>
                                        <svg
                                            width={14}
                                            height={13}
                                            viewBox="0 0 14 13"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12.4147 1.51371C11.0037 0.302997 8.92573 0.534835 7.61736 1.87434L7.12993 2.38954L6.61684 1.87434C5.33413 0.534835 3.23047 0.302997 1.81948 1.51371C0.203258 2.90473 0.126295 5.37767 1.56294 6.87174L6.53988 12.0237C6.84773 12.3586 7.38647 12.3586 7.69433 12.0237L12.6713 6.87174C14.1079 5.37767 14.0309 2.90473 12.4147 1.51371Z" />
                                        </svg>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="/">
                                    <a>
                                        <svg height={15} width={16}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 611.999 611.999">
                                            <path d="M570 500c-65-29-67-155-67-158v-85c0-81-50-151-121-181a76 76 0 0 0-152 0 197 197 0 0 0-121 181v85c0 3-2 129-67 158a17 17 0 0 0 7 33h165c3 19 12 36 25 50a92 92 0 0 0 134 0c13-14 22-31 25-50h165a17 17 0 0 0 7-33zm-86-60c7 21 17 41 31 59H97c14-18 24-38 31-59h356zM306 35c19 0 35 12 40 30a197 197 0 0 0-80 0c5-18 21-30 40-30zM144 342v-85a162 162 0 0 1 324 0v85c0 2 0 30 7 63H137c7-33 7-61 7-63zm162 235c-26 0-49-19-57-44h114c-8 25-31 44-57 44z" />
                                            <path d="M306 119c-74 0-135 61-135 135a17 17 0 0 0 35 0c0-55 45-100 100-100a17 17 0 1 0 0-35z" />
                                        </svg>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <a class="dropdown-toggle text-muted" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="images/users/5.jpg" alt="user" class="profile-pic" /></a>
                                <div class="dropdown-menu dropdown-menu-right animated zoomIn">
                                    <ul class="dropdown-user">
                                        <li><a href="#"><i class="ti-user"></i> Profile</a></li>
                                        <li><a href="#"><i class="ti-wallet"></i> Balance</a></li>
                                        <li><a href="#"><i class="ti-email"></i> Inbox</a></li>
                                        <li><a href="#"><i class="ti-settings"></i> Setting</a></li>
                                        <li><a href="#"><i class="fa fa-power-off"></i> Logout</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        {/* mobile dropdown */}
                        <div className="sidebar-button mobile-menu-btn">
                            <i
                                className="bi bi-list"
                                onClick={() =>
                                    dispatch({ type: "mobileMenu", isMobileMenu: true })
                                }
                            />
                        </div>
                        {/* end mobile dropdown */}
                    </div>

                </div>

            </header>
            {/* End header header */}
        </>
    );
}
export default Header;