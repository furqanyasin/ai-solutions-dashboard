import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, NavLink, useLocation } from "react-router-dom";

interface MasterLayoutProps {
    children: React.ReactNode;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
    const [sidebarActive, setSidebarActive] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleDropdownClick = (event: Event) => {
            event.preventDefault();
            const clickedLink = event.currentTarget as HTMLElement;
            const clickedDropdown = clickedLink.closest(".dropdown");

            if (!clickedDropdown) return;

            const isActive = clickedDropdown.classList.contains("open");

            // Close all dropdowns
            const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
            allDropdowns.forEach((dropdown) => {
                dropdown.classList.remove("open");
                const submenu = dropdown.querySelector(".sidebar-submenu") as HTMLElement;
                if (submenu) {
                    submenu.style.maxHeight = "0px";
                }
            });

            // Toggle the clicked dropdown
            if (!isActive) {
                clickedDropdown.classList.add("open");
                const submenu = clickedDropdown.querySelector(".sidebar-submenu") as HTMLElement;
                if (submenu) {
                    submenu.style.maxHeight = `${submenu.scrollHeight}px`;
                }
            }
        };

        // Attach click event listeners to all dropdown triggers
        const dropdownTriggers = document.querySelectorAll(
            ".sidebar-menu .dropdown > a"
        );

        dropdownTriggers.forEach((trigger) => {
            trigger.addEventListener("click", handleDropdownClick);
        });

        const openActiveDropdown = () => {
            const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
            allDropdowns.forEach((dropdown) => {
                const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
                submenuLinks.forEach((link) => {
                    if (
                        link.getAttribute("href") === location.pathname ||
                        link.getAttribute("to") === location.pathname
                    ) {
                        dropdown.classList.add("open");
                        const submenu = dropdown.querySelector(".sidebar-submenu") as HTMLElement;
                        if (submenu) {
                            submenu.style.maxHeight = `${submenu.scrollHeight}px`;
                        }
                    }
                });
            });
        };

        openActiveDropdown();

        return () => {
            dropdownTriggers.forEach((trigger) => {
                trigger.removeEventListener("click", handleDropdownClick);
            });
        };
    }, [location.pathname]);

    const sidebarControl = () => {
        setSidebarActive(!sidebarActive);
    };

    const mobileMenuControl = () => {
        setMobileMenu(!mobileMenu);
    };

    return (
        <section className={mobileMenu ? "overlay active" : "overlay"}>
            {/* Sidebar */}
            <aside
                className={
                    sidebarActive
                        ? "sidebar active"
                        : mobileMenu
                            ? "sidebar sidebar-open"
                            : "sidebar"
                }
            >
                <button
                    onClick={mobileMenuControl}
                    type="button"
                    className="sidebar-close-btn"
                >
                    <Icon icon="radix-icons:cross-2" />
                </button>
                <div>
                    <Link to="/" className="sidebar-logo">
                        <img
                            src="/assets/images/logo.png"
                            alt="AI Solutions"
                            className="light-logo"
                        />
                        <img
                            src="/assets/images/logo-light.png"
                            alt="AI Solutions"
                            className="dark-logo"
                        />
                        <img
                            src="/assets/images/logo-icon.png"
                            alt="AI Solutions"
                            className="logo-icon"
                        />
                    </Link>
                </div>
                <div className="sidebar-menu-area">
                    <ul className="sidebar-menu" id="sidebar-menu">
                        {/* Dashboard */}
                        <li>
                            <NavLink
                                to="/"
                                className={(navData) => (navData.isActive ? "active-page" : "")}
                            >
                                <Icon
                                    icon="solar:home-smile-angle-outline"
                                    className="menu-icon"
                                />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>

                        <li className="sidebar-menu-group-title">SEO Tools</li>

                        {/* GEO - Generative Engine Optimization */}
                        <li className="dropdown">
                            <Link to="#">
                                <Icon icon="mdi:robot-outline" className="menu-icon" />
                                <span>GEO</span>
                            </Link>
                            <ul className="sidebar-submenu">
                                <li>
                                    <NavLink
                                        to="/tools/llm-txt-generator"
                                        className={(navData) =>
                                            navData.isActive ? "active-page" : ""
                                        }
                                    >
                                        <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />
                                        LLM.txt Generator
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        {/* On-Page SEO */}
                        <li className="dropdown">
                            <Link to="#">
                                <Icon icon="mdi:file-document-edit-outline" className="menu-icon" />
                                <span>On-Page SEO</span>
                            </Link>
                            <ul className="sidebar-submenu">
                                <li>
                                    <NavLink
                                        to="/tools/on-page/coming-soon"
                                        className={(navData) =>
                                            navData.isActive ? "active-page" : ""
                                        }
                                    >
                                        <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                                        Coming Soon
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        {/* Off-Page SEO */}
                        <li className="dropdown">
                            <Link to="#">
                                <Icon icon="mdi:link-variant" className="menu-icon" />
                                <span>Off-Page SEO</span>
                            </Link>
                            <ul className="sidebar-submenu">
                                <li>
                                    <NavLink
                                        to="/tools/off-page/coming-soon"
                                        className={(navData) =>
                                            navData.isActive ? "active-page" : ""
                                        }
                                    >
                                        <i className="ri-circle-fill circle-icon text-info-main w-auto" />
                                        Coming Soon
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        {/* Local SEO */}
                        <li className="dropdown">
                            <Link to="#">
                                <Icon icon="mdi:map-marker-outline" className="menu-icon" />
                                <span>Local SEO</span>
                            </Link>
                            <ul className="sidebar-submenu">
                                <li>
                                    <NavLink
                                        to="/tools/local-seo/coming-soon"
                                        className={(navData) =>
                                            navData.isActive ? "active-page" : ""
                                        }
                                    >
                                        <i className="ri-circle-fill circle-icon text-success-main w-auto" />
                                        Coming Soon
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        {/* Technical SEO */}
                        <li className="dropdown">
                            <Link to="#">
                                <Icon icon="mdi:cog-outline" className="menu-icon" />
                                <span>Technical SEO</span>
                            </Link>
                            <ul className="sidebar-submenu">
                                <li>
                                    <NavLink
                                        to="/tools/technical/coming-soon"
                                        className={(navData) =>
                                            navData.isActive ? "active-page" : ""
                                        }
                                    >
                                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />
                                        Coming Soon
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-menu-group-title">Settings</li>

                        <li>
                            <NavLink
                                to="/settings"
                                className={(navData) => (navData.isActive ? "active-page" : "")}
                            >
                                <Icon icon="solar:settings-outline" className="menu-icon" />
                                <span>Settings</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
            >
                <div className="navbar-header">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-auto">
                            <div className="d-flex flex-wrap align-items-center gap-4">
                                <button
                                    type="button"
                                    className="sidebar-toggle"
                                    onClick={sidebarControl}
                                >
                                    {sidebarActive ? (
                                        <Icon
                                            icon="iconoir:arrow-right"
                                            className="icon text-2xl non-active"
                                        />
                                    ) : (
                                        <Icon
                                            icon="heroicons:bars-3-solid"
                                            className="icon text-2xl non-active"
                                        />
                                    )}
                                </button>
                                <button
                                    onClick={mobileMenuControl}
                                    type="button"
                                    className="sidebar-mobile-toggle"
                                >
                                    <Icon icon="heroicons:bars-3-solid" className="icon" />
                                </button>
                                <form className="navbar-search">
                                    <input type="text" name="search" placeholder="Search" />
                                    <Icon icon="ion:search-outline" className="icon" />
                                </form>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="d-flex flex-wrap align-items-center gap-3">
                                {/* Theme Toggle */}
                                <button
                                    type="button"
                                    data-theme-toggle
                                    className="w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                                    onClick={() => {
                                        document.documentElement.classList.toggle("dark");
                                    }}
                                >
                                    <Icon
                                        icon="mdi:theme-light-dark"
                                        className="text-primary-light text-xl"
                                    />
                                </button>

                                {/* User Profile */}
                                <div className="dropdown">
                                    <button
                                        className="d-flex justify-content-center align-items-center rounded-circle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        <img
                                            src="/assets/images/user.png"
                                            alt="user"
                                            className="w-40-px h-40-px object-fit-cover rounded-circle"
                                        />
                                    </button>
                                    <div className="dropdown-menu to-top dropdown-menu-sm">
                                        <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                                            <div>
                                                <h6 className="text-lg text-primary-light fw-semibold mb-2">
                                                    Admin User
                                                </h6>
                                                <span className="text-secondary-light fw-medium text-sm">
                                                    Administrator
                                                </span>
                                            </div>
                                            <button type="button" className="hover-text-danger">
                                                <Icon icon="radix-icons:cross-1" className="icon text-xl" />
                                            </button>
                                        </div>
                                        <ul className="to-top-list">
                                            <li>
                                                <Link
                                                    className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                                                    to="/settings"
                                                >
                                                    <Icon icon="solar:user-linear" className="icon text-xl" />
                                                    My Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                                                    to="/settings"
                                                >
                                                    <Icon
                                                        icon="icon-park-outline:setting-two"
                                                        className="icon text-xl"
                                                    />
                                                    Settings
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Main Body */}
                <div className="dashboard-main-body">{children}</div>

                {/* Footer */}
                <footer className="d-footer">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-auto">
                            <p className="mb-0">© 2026 AI Solutions. All Rights Reserved.</p>
                        </div>
                        <div className="col-auto">
                            <p className="mb-0">
                                Powered by <span className="text-primary-600">AI Solutions</span>
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </section>
    );
};

export default MasterLayout;
