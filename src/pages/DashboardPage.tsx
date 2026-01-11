import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import MasterLayout from "../layouts/MasterLayout";

const DashboardPage: React.FC = () => {
    return (
        <MasterLayout>
            {/* Breadcrumb */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">Dashboard</h6>
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
                    <li className="fw-medium">Home</li>
                </ul>
            </div>

            {/* Welcome Banner */}
            <div className="card bg-gradient-primary-600 rounded-16 border-0 position-relative mb-24 overflow-hidden">
                <div className="card-body p-24">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="pe-lg-5">
                                <h3 className="text-white fw-bold mb-16">
                                    Welcome to AI Solutions Dashboard! 👋
                                </h3>
                                <p className="text-white mb-24 text-lg">
                                    Your all-in-one SEO toolkit powered by AI. Generate LLM.txt files,
                                    optimize your content, and boost your search rankings with our
                                    cutting-edge tools.
                                </p>
                                <Link
                                    to="/tools/llm-txt-generator"
                                    className="btn btn-white text-primary-600 fw-semibold d-inline-flex align-items-center gap-2"
                                >
                                    <Icon icon="mdi:robot-outline" className="text-xl" />
                                    Try LLM.txt Generator
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-5 d-none d-lg-block">
                            <div className="text-center">
                                <Icon
                                    icon="mdi:robot-happy-outline"
                                    className="text-white"
                                    style={{ fontSize: "150px", opacity: 0.3 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row gy-4 mb-24">
                {/* GEO Tools Card */}
                <div className="col-xxl-3 col-sm-6">
                    <div className="card h-100 radius-8 border-0 overflow-hidden">
                        <div className="card-body p-24">
                            <div className="d-flex align-items-center gap-2 mb-16">
                                <span className="w-48-px h-48-px bg-primary-100 text-primary-600 d-flex justify-content-center align-items-center rounded-circle">
                                    <Icon icon="mdi:robot-outline" className="text-2xl" />
                                </span>
                                <div>
                                    <span className="mb-2 fw-medium text-secondary-light text-sm">
                                        GEO Tools
                                    </span>
                                    <h6 className="fw-semibold text-primary-600 mb-0">1 Active</h6>
                                </div>
                            </div>
                            <p className="text-secondary-light mb-0 text-sm">
                                Generative Engine Optimization tools for AI-ready content
                            </p>
                        </div>
                    </div>
                </div>

                {/* On-Page SEO Card */}
                <div className="col-xxl-3 col-sm-6">
                    <div className="card h-100 radius-8 border-0 overflow-hidden">
                        <div className="card-body p-24">
                            <div className="d-flex align-items-center gap-2 mb-16">
                                <span className="w-48-px h-48-px bg-warning-100 text-warning-600 d-flex justify-content-center align-items-center rounded-circle">
                                    <Icon icon="mdi:file-document-edit-outline" className="text-2xl" />
                                </span>
                                <div>
                                    <span className="mb-2 fw-medium text-secondary-light text-sm">
                                        On-Page SEO
                                    </span>
                                    <h6 className="fw-semibold text-warning-600 mb-0">Coming Soon</h6>
                                </div>
                            </div>
                            <p className="text-secondary-light mb-0 text-sm">
                                Content optimization and on-page ranking tools
                            </p>
                        </div>
                    </div>
                </div>

                {/* Off-Page SEO Card */}
                <div className="col-xxl-3 col-sm-6">
                    <div className="card h-100 radius-8 border-0 overflow-hidden">
                        <div className="card-body p-24">
                            <div className="d-flex align-items-center gap-2 mb-16">
                                <span className="w-48-px h-48-px bg-info-100 text-info-600 d-flex justify-content-center align-items-center rounded-circle">
                                    <Icon icon="mdi:link-variant" className="text-2xl" />
                                </span>
                                <div>
                                    <span className="mb-2 fw-medium text-secondary-light text-sm">
                                        Off-Page SEO
                                    </span>
                                    <h6 className="fw-semibold text-info-600 mb-0">Coming Soon</h6>
                                </div>
                            </div>
                            <p className="text-secondary-light mb-0 text-sm">
                                Backlink analysis and off-page optimization tools
                            </p>
                        </div>
                    </div>
                </div>

                {/* Local SEO Card */}
                <div className="col-xxl-3 col-sm-6">
                    <div className="card h-100 radius-8 border-0 overflow-hidden">
                        <div className="card-body p-24">
                            <div className="d-flex align-items-center gap-2 mb-16">
                                <span className="w-48-px h-48-px bg-success-100 text-success-600 d-flex justify-content-center align-items-center rounded-circle">
                                    <Icon icon="mdi:map-marker-outline" className="text-2xl" />
                                </span>
                                <div>
                                    <span className="mb-2 fw-medium text-secondary-light text-sm">
                                        Local SEO
                                    </span>
                                    <h6 className="fw-semibold text-success-600 mb-0">Coming Soon</h6>
                                </div>
                            </div>
                            <p className="text-secondary-light mb-0 text-sm">
                                Local business optimization and GBP management tools
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Tools Section */}
            <div className="card radius-8 border-0 mb-24">
                <div className="card-body p-24">
                    <h6 className="fw-semibold mb-16">Available Tools</h6>
                    <div className="row gy-4">
                        {/* LLM.txt Generator Tool Card */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card h-100 radius-8 border hover-border-primary-600 transition-all">
                                <div className="card-body p-20">
                                    <div className="d-flex align-items-center gap-3 mb-16">
                                        <span className="w-56-px h-56-px bg-gradient-primary-600 text-white d-flex justify-content-center align-items-center rounded-12">
                                            <Icon icon="mdi:file-code-outline" className="text-2xl" />
                                        </span>
                                        <div>
                                            <h6 className="fw-semibold mb-1">LLM.txt Generator</h6>
                                            <span className="badge bg-success-100 text-success-600 px-8 py-4 radius-4 text-xs">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-secondary-light mb-16 text-sm">
                                        Generate comprehensive llms.txt files for AI crawlers.
                                        Powered by Google Gemini AI with recursive sitemap analysis.
                                    </p>
                                    <Link
                                        to="/tools/llm-txt-generator"
                                        className="btn btn-primary-600 w-100 d-flex align-items-center justify-content-center gap-2"
                                    >
                                        <Icon icon="mdi:arrow-right" className="text-lg" />
                                        Open Tool
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Placeholder Tool 1 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card h-100 radius-8 border border-dashed">
                                <div className="card-body p-20 d-flex flex-column justify-content-center align-items-center text-center">
                                    <span className="w-56-px h-56-px bg-neutral-100 text-neutral-500 d-flex justify-content-center align-items-center rounded-12 mb-16">
                                        <Icon icon="mdi:plus" className="text-2xl" />
                                    </span>
                                    <h6 className="fw-semibold mb-2 text-neutral-500">New Tool</h6>
                                    <p className="text-secondary-light mb-0 text-sm">
                                        More SEO tools coming soon...
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Placeholder Tool 2 */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card h-100 radius-8 border border-dashed">
                                <div className="card-body p-20 d-flex flex-column justify-content-center align-items-center text-center">
                                    <span className="w-56-px h-56-px bg-neutral-100 text-neutral-500 d-flex justify-content-center align-items-center rounded-12 mb-16">
                                        <Icon icon="mdi:plus" className="text-2xl" />
                                    </span>
                                    <h6 className="fw-semibold mb-2 text-neutral-500">New Tool</h6>
                                    <p className="text-secondary-light mb-0 text-sm">
                                        More SEO tools coming soon...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="row gy-4">
                <div className="col-lg-8">
                    <div className="card h-100 radius-8 border-0">
                        <div className="card-body p-24">
                            <h6 className="fw-semibold mb-16">Getting Started</h6>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex align-items-center gap-3 p-16 bg-neutral-50 radius-8">
                                    <span className="w-32-px h-32-px bg-primary-600 text-white d-flex justify-content-center align-items-center rounded-circle text-sm fw-bold">
                                        1
                                    </span>
                                    <p className="mb-0 text-secondary-light">
                                        Navigate to <strong>GEO → LLM.txt Generator</strong> to create your first AI-optimized file
                                    </p>
                                </div>
                                <div className="d-flex align-items-center gap-3 p-16 bg-neutral-50 radius-8">
                                    <span className="w-32-px h-32-px bg-primary-600 text-white d-flex justify-content-center align-items-center rounded-circle text-sm fw-bold">
                                        2
                                    </span>
                                    <p className="mb-0 text-secondary-light">
                                        Enter your business details and website URL for comprehensive analysis
                                    </p>
                                </div>
                                <div className="d-flex align-items-center gap-3 p-16 bg-neutral-50 radius-8">
                                    <span className="w-32-px h-32-px bg-primary-600 text-white d-flex justify-content-center align-items-center rounded-circle text-sm fw-bold">
                                        3
                                    </span>
                                    <p className="mb-0 text-secondary-light">
                                        Download and deploy your generated files to make your site AI-crawler friendly
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card h-100 radius-8 border-0 bg-gradient-primary-600">
                        <div className="card-body p-24 d-flex flex-column justify-content-between">
                            <div>
                                <h6 className="fw-semibold mb-8 text-white">Need Help?</h6>
                                <p className="text-white mb-0 opacity-75">
                                    Check out our documentation or reach out to support for
                                    assistance with any of our tools.
                                </p>
                            </div>
                            <Link
                                to="/settings"
                                className="btn btn-white text-primary-600 fw-semibold mt-16"
                            >
                                View Documentation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default DashboardPage;
