"use client";
import { lusitana } from "@/src/fonts/fonts";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useRef } from "react";
/*---------Using reducer mange the active or inactive menu----------*/
const initialState = {
  activeMenu: "",
  mobileMenuState: false,
  navState: false,
  scrollY: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "home":
      return { ...state, activeMenu: "home" };
    case "blog":
      return { ...state, activeMenu: "blog" };
    case "shop":
      return { ...state, activeMenu: "shop" };
    case "services":
      return { ...state, activeMenu: "services" };
    case "pages":
      return { ...state, activeMenu: "pages" };
    case "mobileMenu":
      return { ...state, mobileMenuState: action.isMobileMenu };
    case "setScrollY":
      return { ...state, scrollY: action.payload };
    default:
      throw new Error();
  }
}

function Header2() {
  const currentRoute = useRouter().pathname;
  const [state, dispatch] = useReducer(reducer, initialState);
  const headerRef = useRef(null);
  const handleScroll = () => {
    const { scrollY } = window;
    dispatch({ type: "setScrollY", payload: scrollY });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={
        state.scrollY > 150
          ? "header-area style-2 sticky"
          : "header-area style-2"
      }
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="header-logo">
          <Link legacyBehavior href="/">
            {/* <a>
              <img
                alt="image"
                className="img-fluid"
                src="assets/images/header2-logo.svg"
              />
            </a> */}
            <p className={clsx(
              'btn text-xxl font-black m-0',
              lusitana,
            )}>Petpal</p>
          </Link>
        </div>
        <div
          className={
            state.mobileMenuState === true ? "main-menu show-menu" : "main-menu"
          }
        >
          <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
            <div className="mobile-logo-wrap">
              <Link legacyBehavior href="/">
                {/* <a>
                  <img alt="image" src="assets/images/header2-logo.svg" />
                </a> */}
                <p className={lusitana}>Petpal</p>
              </Link>
            </div>
            <div className="menu-close-btn">
              <i
                className="bi bi-x-lg"
                onClick={() =>
                  dispatch({ type: "mobileMenu", isMobileMenu: false })
                }
              />
            </div>
          </div>
          <ul className="menu-list">
            <li>
              <Link legacyBehavior href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/about">
                <a>About</a>
              </Link>
            </li>
            {/* <li className="menu-item-has-children">
              <Link legacyBehavior href="#">
                <a>Services</a>
              </Link>
              <i
                className="bi bi-plus dropdown-icon"
                onClick={() => dispatch({ type: "services" })}
              />
              <ul
                className={
                  state.activeMenu === "services"
                    ? "sub-menu  d-block"                                                                           
                    : "sub-menu d-xl-block d-none"
                }
              >
                <li>
                  <Link legacyBehavior href="/service-details">
                    <a>Daycare</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/service-details">
                    <a>Grooming</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/service-details">
                    <a>Boarding</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/service-details">
                    <a>Veterinary</a>
                  </Link>
                </li>
              </ul>
            </li> */}
            <li>
              <Link legacyBehavior href="/blog">
                <a>Blog</a>
              </Link>
            </li>
            {/* <li className="menu-item-has-children">
              <Link legacyBehavior href="#">
                <a>Blog</a>
              </Link>
              <i
                className="bi bi-plus dropdown-icon"
                onClick={() => dispatch({ type: "blog" })}
              />
              <ul
                className={
                  state.activeMenu === "blog"
                    ? "sub-menu  d-block"
                    : "sub-menu d-xl-block d-none"
                }
              >
                <li>
                  <Link legacyBehavior href="/blog-grid">
                    <a>Blog Grid</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/blog-grid-sidebar">
                    <a>blog-grid-sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/blog-standard">
                    <a>Blog Standard</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/blog-details">
                    <a>Blog Details</a>
                  </Link>
                </li>
              </ul>
            </li> */}
            <li>
              <Link legacyBehavior href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
          <div className="for-mobile-menu d-lg-none d-block">
            <ul className="social-link mb-5">
              <li>
                <Link legacyBehavior href="/">
                  <a>
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 15 15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1585_341)">
                        <path d="M6.98716 0.938832C6.28609 1.04711 5.65949 1.38227 5.169 1.90563C4.62972 2.48055 4.3498 3.14571 4.31128 3.94235C4.25735 5.0561 4.80177 6.12086 5.74167 6.73703C6.20391 7.04125 6.64818 7.19594 7.18747 7.23977C8.18643 7.31711 9.03901 7.00258 9.72724 6.29875C10.2742 5.74188 10.5516 5.13344 10.6183 4.35743C10.7108 3.32102 10.3205 2.3568 9.54234 1.68133C9.03901 1.24821 8.57676 1.03164 7.93733 0.938832C7.62916 0.895004 7.26964 0.892426 6.98716 0.938832Z" />
                        <path d="M4.65531 7.29655C3.49456 7.4203 2.68821 8.25561 2.31327 9.7303C2.06418 10.7126 1.99998 11.8933 2.15919 12.5405C2.29016 13.0587 2.71902 13.5846 3.21465 13.8373C3.43807 13.9507 3.75907 14.0435 4.02871 14.0744C4.18793 14.0951 5.40004 14.1002 7.71896 14.0951L11.1729 14.0873L11.3912 14.0255C12.2027 13.8037 12.7574 13.2572 12.9603 12.4889C13.0656 12.0893 13.0527 11.1354 12.9295 10.3826C12.6598 8.70678 11.9767 7.70131 10.8956 7.38678C10.6491 7.31459 10.2074 7.26045 10.0764 7.28623C9.95057 7.30944 9.77594 7.40225 9.38047 7.65749C8.95931 7.93077 8.90025 7.9617 8.58438 8.0803C8.21972 8.21694 7.91926 8.27624 7.56745 8.27624C7.20792 8.27624 6.93058 8.22467 6.56592 8.09577C6.2218 7.97202 6.20639 7.96428 5.66711 7.62139C5.38463 7.44092 5.17405 7.32491 5.09187 7.3017C4.94806 7.26561 4.94806 7.26561 4.65531 7.29655Z" />
                      </g>
                    </svg>
                  </a>
                </Link>
              </li>
            </ul>
            <form className="mobile-menu-form">
              <div className="input-with-btn d-flex flex-column">
                <input type="text" placeholder="Search here..." />
                <button className="primary-btn1" type="submit">
                  Search
                </button>
              </div>
            </form>

          </div>
        </div>
        <div className="nav-right d-flex jsutify-content-end align-items-center">
          <ul>
            {/* biểu tượng login */}
            <li>
              <Link legacyBehavior href="/login">
                <a>
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1585_341)">
                      <path d="M6.98716 0.938832C6.28609 1.04711 5.65949 1.38227 5.169 1.90563C4.62972 2.48055 4.3498 3.14571 4.31128 3.94235C4.25735 5.0561 4.80177 6.12086 5.74167 6.73703C6.20391 7.04125 6.64818 7.19594 7.18747 7.23977C8.18643 7.31711 9.03901 7.00258 9.72724 6.29875C10.2742 5.74188 10.5516 5.13344 10.6183 4.35743C10.7108 3.32102 10.3205 2.3568 9.54234 1.68133C9.03901 1.24821 8.57676 1.03164 7.93733 0.938832C7.62916 0.895004 7.26964 0.892426 6.98716 0.938832Z" />
                      <path d="M4.65531 7.29655C3.49456 7.4203 2.68821 8.25561 2.31327 9.7303C2.06418 10.7126 1.99998 11.8933 2.15919 12.5405C2.29016 13.0587 2.71902 13.5846 3.21465 13.8373C3.43807 13.9507 3.75907 14.0435 4.02871 14.0744C4.18793 14.0951 5.40004 14.1002 7.71896 14.0951L11.1729 14.0873L11.3912 14.0255C12.2027 13.8037 12.7574 13.2572 12.9603 12.4889C13.0656 12.0893 13.0527 11.1354 12.9295 10.3826C12.6598 8.70678 11.9767 7.70131 10.8956 7.38678C10.6491 7.31459 10.2074 7.26045 10.0764 7.28623C9.95057 7.30944 9.77594 7.40225 9.38047 7.65749C8.95931 7.93077 8.90025 7.9617 8.58438 8.0803C8.21972 8.21694 7.91926 8.27624 7.56745 8.27624C7.20792 8.27624 6.93058 8.22467 6.56592 8.09577C6.2218 7.97202 6.20639 7.96428 5.66711 7.62139C5.38463 7.44092 5.17405 7.32491 5.09187 7.3017C4.94806 7.26561 4.94806 7.26561 4.65531 7.29655Z" />
                    </g>
                  </svg>
                </a>
              </Link>
            </li>
          </ul>
          <div className="sidebar-button mobile-menu-btn">
            <i
              className="bi bi-list"
              onClick={() =>
                dispatch({ type: "mobileMenu", isMobileMenu: true })
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header2;
