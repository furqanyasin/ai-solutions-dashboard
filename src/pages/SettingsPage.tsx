import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import MasterLayout from "../layouts/MasterLayout";

const SettingsPage: React.FC = () => {
    return (
        <MasterLayout>
            {/* Breadcrumb */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">Settings</h6>
                <ul className="d-flex align-items-center gap-2">
                    <li className="fw-medium">
                        <Link
                            to="/"
                            className="d-flex align-items-center gap-1 hover-text-primary"
                        >
                            <Icon icon="solar:home-smile-angle-outline" className="icon text-lg" />
                            Dashboard
                        </Link>
                    </li>
                    <li>-</li>
                    <li className="fw-medium">Settings</li>
                </ul>
            </div>

            <div className="row gy-4">
                {/* API Configuration */}
                <div className="col-lg-6">
                    <div className="card radius-16 border-0 h-100">
                        <div className="card-body p-24">
                            <h6 className="fw-semibold mb-16 d-flex align-items-center gap-2">
                                <Icon icon="mdi:key-outline" className="text-primary-600 text-xl" />
                                API Configuration
                            </h6>

                            <div className="mb-16">
                                <label className="form-label text-secondary-light fw-medium text-sm">
                                    Gemini API Key
                                </label>
                                <div className="input-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your Gemini API key"
                                        defaultValue="••••••••••••••••••••"
                                    />
                                    <button className="btn btn-outline-primary-600" type="button">
                                        <Icon icon="mdi:eye-outline" />
                                    </button>
                                </div>
                                <p className="text-secondary-light text-xs mt-2">
                                    Get your API key from{" "}
                                    <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-primary-600">
                                        Google AI Studio
                                    </a>
                                </p>
                            </div>

                            <button className="btn btn-primary-600 d-flex align-items-center gap-2">
                                <Icon icon="mdi:content-save-outline" />
                                Save API Key
                            </button>
                        </div>
                    </div>
                </div>

                {/* General Settings */}
                <div className="col-lg-6">
                    <div className="card radius-16 border-0 h-100">
                        <div className="card-body p-24">
                            <h6 className="fw-semibold mb-16 d-flex align-items-center gap-2">
                                <Icon icon="mdi:cog-outline" className="text-primary-600 text-xl" />
                                General Settings
                            </h6>

                            <div className="mb-16">
                                <label className="form-label text-secondary-light fw-medium text-sm">
                                    Dashboard Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="AI Solutions"
                                    defaultValue="AI Solutions"
                                />
                                <p className="text-secondary-light text-xs mt-2">
                                    This name appears in the header and browser tab
                                </p>
                            </div>

                            <div className="mb-16">
                                <label className="form-label text-secondary-light fw-medium text-sm">
                                    Default Theme
                                </label>
                                <select className="form-select">
                                    <option value="light">Light Mode</option>
                                    <option value="dark">Dark Mode</option>
                                    <option value="system">System Default</option>
                                </select>
                            </div>

                            <button className="btn btn-primary-600 d-flex align-items-center gap-2">
                                <Icon icon="mdi:content-save-outline" />
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="col-12">
                    <div className="card radius-16 border-0">
                        <div className="card-body p-24">
                            <h6 className="fw-semibold mb-16 d-flex align-items-center gap-2">
                                <Icon icon="mdi:information-outline" className="text-primary-600 text-xl" />
                                About AI Solutions Dashboard
                            </h6>

                            <div className="row gy-3">
                                <div className="col-md-4">
                                    <div className="p-16 radius-8 bg-neutral-50">
                                        <p className="text-secondary-light text-sm mb-1">Version</p>
                                        <p className="fw-semibold mb-0">1.0.0</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-16 radius-8 bg-neutral-50">
                                        <p className="text-secondary-light text-sm mb-1">Build Date</p>
                                        <p className="fw-semibold mb-0">January 11, 2026</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-16 radius-8 bg-neutral-50">
                                        <p className="text-secondary-light text-sm mb-1">Active Tools</p>
                                        <p className="fw-semibold mb-0">1 (LLM.txt Generator)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default SettingsPage;
