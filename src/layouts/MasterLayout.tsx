import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

interface MasterLayoutProps {
    children: React.ReactNode;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    const [sidebarActive, setSidebarActive] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
                                    className="w-40-px h-40-px bg-neutral-200 dark:bg-neutral-700 rounded-circle d-flex justify-content-center align-items-center"
                                    onClick={toggleTheme}
                                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                                >
                                    <Icon
                                        icon={theme === 'light' ? "solar:moon-outline" : "solar:sun-2-outline"}
                                        className="text-primary-light text-xl"
                                    />
                                </button>

                                {/* User Profile */}
                                <div className={`dropdown ${activeDropdown === 'profile' ? 'open' : ''}`}>
                                    <button
                                        className="d-flex justify-content-center align-items-center rounded-circle border-0 bg-transparent"
                                        type="button"
                                        onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
                                    >
                                        <img
                                            src={user.avatar}
                                            alt="user"
                                            className="w-40-px h-40-px object-fit-cover rounded-circle border border-primary-600"
                                        />
                                    </button>
                                    <div className={`dropdown-menu to-top dropdown-menu-sm ${activeDropdown === 'profile' ? 'show' : ''}`}
                                        style={{ display: activeDropdown === 'profile' ? 'block' : 'none', right: 0, left: 'auto' }}>
                                        <div className="py-12 px-16 radius-8 bg-primary-50 dark:bg-primary-900/20 mb-16 d-flex align-items-center justify-content-between gap-2">
                                            <div>
                                                <h6 className="text-lg text-primary-light fw-semibold mb-2">
                                                    {user.name}
                                                </h6>
                                                <span className="text-secondary-light fw-medium text-sm">
                                                    {user.role}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                className="hover-text-danger border-0 bg-transparent"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                <Icon icon="radix-icons:cross-1" className="icon text-xl" />
                                            </button>
                                        </div>
                                        <ul className="to-top-list p-0 m-0 list-unstyled">
                                            <li>
                                                <Link
                                                    className="dropdown-item text-black dark:text-white px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                                                    to="/settings"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    <Icon icon="solar:user-linear" className="icon text-xl" />
                                                    My Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className="dropdown-item text-black dark:text-white px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                                                    to="/settings"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    <Icon
                                                        icon="icon-park-outline:setting-two"
                                                        className="icon text-xl"
                                                    />
                                                    Settings
                                                </Link>
                                            </li>
                                            <li className="pt-8 mt-8 border-top">
                                                <Link
                                                    className="dropdown-item text-danger px-0 py-8 hover-bg-transparent d-flex align-items-center gap-3"
                                                    to="#"
                                                    onClick={() => {
                                                        setActiveDropdown(null);
                                                        alert("Sign out clicked (Demo Only)");
                                                    }}
                                                >
                                                    <Icon icon="solar:logout-3-outline" className="icon text-xl" />
                                                    Log Out
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
