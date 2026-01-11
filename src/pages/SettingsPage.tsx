import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import MasterLayout from "../layouts/MasterLayout";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const SettingsPage: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const { user, updateProfile } = useAuth();

    const [profileData, setProfileData] = useState({
        name: user.name,
        email: user.email,
        role: user.role
    });

    const [apiKey, setApiKey] = useState("••••••••••••••••••••");
    const [showApiKey, setShowApiKey] = useState(false);
    const [dashboardName, setDashboardName] = useState("AI Solutions");
    const [saveStatus, setSaveStatus] = useState<string | null>(null);

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(profileData);
        showFeedback("Profile updated successfully!");
    };

    const handleGeneralSave = (e: React.FormEvent) => {
        e.preventDefault();
        showFeedback("General settings saved!");
    };

    const showFeedback = (msg: string) => {
        setSaveStatus(msg);
        setTimeout(() => setSaveStatus(null), 3000);
    };

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

            {saveStatus && (
                <div className="alert alert-success bg-success-100 text-success-600 border-success-600 mb-24 radius-8 border-0">
                    <div className="d-flex align-items-center gap-3">
                        <Icon icon="solar:check-circle-bold" className="text-xl" />
                        <p className="mb-0">{saveStatus}</p>
                    </div>
                </div>
            )}

            <div className="row gy-4">
                {/* Profile Information */}
                <div className="col-lg-6">
                    <div className="card radius-16 border-0 h-100">
                        <div className="card-body p-24">
                            <h6 className="fw-semibold mb-16 d-flex align-items-center gap-2">
                                <Icon icon="solar:user-linear" className="text-primary-600 text-xl" />
                                Profile Information
                            </h6>
                            <form onSubmit={handleProfileSave}>
                                <div className="mb-16">
                                    <label className="form-label text-secondary-light fw-medium text-sm">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-16">
                                    <label className="form-label text-secondary-light fw-medium text-sm">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    />
                                </div>
                                <div className="mb-16">
                                    <label className="form-label text-secondary-light fw-medium text-sm">Designation / Role</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={profileData.role}
                                        onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary-600 d-flex align-items-center gap-2">
                                    <Icon icon="solar:diskette-bold" />
                                    Update Profile
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

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
                                        type={showApiKey ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Enter your Gemini API key"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-outline-primary-600 border-start-0"
                                        type="button"
                                        onClick={() => setShowApiKey(!showApiKey)}
                                    >
                                        <Icon icon={showApiKey ? "mdi:eye-off-outline" : "mdi:eye-outline"} />
                                    </button>
                                </div>
                                <p className="text-secondary-light text-xs mt-2">
                                    Get your API key from{" "}
                                    <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-primary-600">
                                        Google AI Studio
                                    </a>
                                </p>
                            </div>

                            <button className="btn btn-primary-600 d-flex align-items-center gap-2" onClick={() => showFeedback("API Key saved securely!")}>
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

                            <form onSubmit={handleGeneralSave}>
                                <div className="mb-16">
                                    <label className="form-label text-secondary-light fw-medium text-sm">
                                        Dashboard Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={dashboardName}
                                        onChange={(e) => setDashboardName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-16">
                                    <label className="form-label text-secondary-light fw-medium text-sm">
                                        Appearance Mode
                                    </label>
                                    <select
                                        className="form-select"
                                        value={theme}
                                        onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                                    >
                                        <option value="light">Light Mode</option>
                                        <option value="dark">Dark Mode</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary-600 d-flex align-items-center gap-2">
                                    <Icon icon="mdi:content-save-outline" />
                                    Save Settings
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="col-lg-6">
                    <div className="card radius-16 border-0 h-100">
                        <div className="card-body p-24">
                            <h6 className="fw-semibold mb-16 d-flex align-items-center gap-2">
                                <Icon icon="mdi:information-outline" className="text-primary-600 text-xl" />
                                App Info
                            </h6>

                            <div className="row gy-3">
                                <div className="col-6">
                                    <div className="p-16 radius-8 bg-neutral-50 dark:bg-neutral-800">
                                        <p className="text-secondary-light text-xs mb-1">Version</p>
                                        <p className="fw-semibold mb-0 text-sm">1.1.0-stable</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="p-16 radius-8 bg-neutral-50 dark:bg-neutral-800">
                                        <p className="text-secondary-light text-xs mb-1">Last Updated</p>
                                        <p className="fw-semibold mb-0 text-sm">Jan 11, 2026</p>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="p-12 radius-8 border border-primary-100 dark:border-primary-900/30">
                                        <p className="text-secondary-light text-xs mb-1">Current Intelligence Engine</p>
                                        <p className="fw-medium mb-0 text-sm d-flex align-items-center gap-2">
                                            <Icon icon="mdi:flash" className="text-warning-main" />
                                            Gemini 1.5 Flash
                                        </p>
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
