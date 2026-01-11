import React from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import MasterLayout from "../layouts/MasterLayout";

const ComingSoonPage: React.FC = () => {
    const location = useLocation();

    // Extract the category from the URL
    const getCategory = () => {
        if (location.pathname.includes('on-page')) return 'On-Page SEO';
        if (location.pathname.includes('off-page')) return 'Off-Page SEO';
        if (location.pathname.includes('local-seo')) return 'Local SEO';
        if (location.pathname.includes('technical')) return 'Technical SEO';
        return 'SEO Tools';
    };

    return (
        <MasterLayout>
            {/* Breadcrumb */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">{getCategory()}</h6>
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
                    <li className="fw-medium">{getCategory()}</li>
                    <li>-</li>
                    <li className="fw-medium">Coming Soon</li>
                </ul>
            </div>

            {/* Coming Soon Content */}
            <div className="card radius-16 border-0">
                <div className="card-body p-40 text-center">
                    <div className="mb-24">
                        <Icon
                            icon="mdi:rocket-launch-outline"
                            className="text-primary-600"
                            style={{ fontSize: '80px', opacity: 0.6 }}
                        />
                    </div>
                    <h2 className="fw-bold mb-16 text-primary-light">Coming Soon!</h2>
                    <p className="text-secondary-light mb-24 mx-auto" style={{ maxWidth: '500px' }}>
                        We're working hard to bring you amazing <strong>{getCategory()}</strong> tools.
                        Stay tuned for exciting new features that will supercharge your SEO workflow!
                    </p>

                    <div className="d-flex flex-wrap justify-content-center gap-3 mb-32">
                        <div className="px-20 py-12 radius-8 bg-primary-50">
                            <Icon icon="mdi:chart-line" className="text-primary-600 text-xl mb-2" />
                            <p className="text-sm text-primary-600 mb-0 fw-medium">Analytics</p>
                        </div>
                        <div className="px-20 py-12 radius-8 bg-success-50">
                            <Icon icon="mdi:robot-outline" className="text-success-600 text-xl mb-2" />
                            <p className="text-sm text-success-600 mb-0 fw-medium">AI-Powered</p>
                        </div>
                        <div className="px-20 py-12 radius-8 bg-warning-50">
                            <Icon icon="mdi:lightning-bolt" className="text-warning-600 text-xl mb-2" />
                            <p className="text-sm text-warning-600 mb-0 fw-medium">Fast Results</p>
                        </div>
                    </div>

                    <Link to="/" className="btn btn-primary-600 d-inline-flex align-items-center gap-2">
                        <Icon icon="mdi:arrow-left" />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </MasterLayout>
    );
};

export default ComingSoonPage;
