import React, { useState } from 'react';
import type { GeneratorConfig } from '../types';
import { Globe, Building2, Phone, FileText, Loader2, Sparkles, MapPin, Share2, Briefcase, Star } from 'lucide-react';

interface InputFormProps {
    onGenerate: (config: GeneratorConfig) => void;
    isGenerating: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isGenerating }) => {
    const [config, setConfig] = useState<GeneratorConfig>({
        businessName: '',
        websiteUrl: '',
        businessEmail: '',
        phoneNumber: '',
        businessCategory: 'Service Business',
        coreServicesInput: '',
        targetLocations: '',
        gbpUrl: '',
        socialUrls: '',
        additionalNotes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(config);
    };

    const handleChange = (field: keyof GeneratorConfig, value: string) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="llm-input-card">
            <div className="mb-4 pb-3" style={{ borderBottom: '1px solid rgba(71, 85, 105, 0.5)' }}>
                <h2 className="text-lg fw-semibold text-white d-flex align-items-center gap-2">
                    <Sparkles className="text-primary-600" style={{ width: '20px', height: '20px' }} />
                    Business Intelligence
                </h2>
                <p className="text-secondary-light text-sm mt-1 mb-0">
                    Configure the crawler with business facts and industry type.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="llm-input-group">
                            <label className="llm-input-label">Website URL *</label>
                            <div className="llm-input-wrapper">
                                <Globe className="llm-input-icon" />
                                <input
                                    type="url"
                                    required
                                    placeholder="https://example.com"
                                    className="llm-input"
                                    value={config.websiteUrl}
                                    onChange={(e) => handleChange('websiteUrl', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="llm-input-group">
                            <label className="llm-input-label">Business Name *</label>
                            <div className="llm-input-wrapper">
                                <Building2 className="llm-input-icon" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Acme Corp"
                                    className="llm-input"
                                    value={config.businessName}
                                    onChange={(e) => handleChange('businessName', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="llm-input-group">
                            <label className="llm-input-label">Email (Optional)</label>
                            <div className="llm-input-wrapper">
                                <FileText className="llm-input-icon" />
                                <input
                                    type="email"
                                    placeholder="contact@acme.com"
                                    className="llm-input"
                                    value={config.businessEmail}
                                    onChange={(e) => handleChange('businessEmail', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="llm-input-group">
                            <label className="llm-input-label">Phone (Optional)</label>
                            <div className="llm-input-wrapper">
                                <Phone className="llm-input-icon" />
                                <input
                                    type="tel"
                                    placeholder="+1-555-0100"
                                    className="llm-input"
                                    value={config.phoneNumber}
                                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="llm-input-group">
                    <label className="llm-input-label">Select Your Industry / Business Category *</label>
                    <div className="llm-input-wrapper">
                        <Briefcase className="llm-input-icon" />
                        <select
                            required
                            className="llm-input llm-select"
                            value={config.businessCategory}
                            onChange={(e) => handleChange('businessCategory', e.target.value)}
                        >
                            <option value="Service Business">Service Business (Local/National)</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="Digital Marketing Agency">Digital Marketing Agency</option>
                            <option value="Tools / SaaS">Tools / SaaS</option>
                            <option value="Blogging / Content Publisher">Blogging / Content Publisher</option>
                            <option value="Affiliate Marketing">Affiliate Marketing</option>
                            <option value="Other / General">Other / General</option>
                        </select>
                    </div>
                </div>

                <div className="llm-input-group">
                    <label className="llm-input-label">Priority Core Services / Products (Optional)</label>
                    <div className="llm-input-wrapper">
                        <Star className="llm-input-icon llm-input-icon-textarea" />
                        <textarea
                            rows={3}
                            placeholder="List specific URLs or Product Names to guarantee in 'Core Services'.&#10;e.g., Foundation Repair, /structural-engineering"
                            className="llm-input llm-textarea"
                            value={config.coreServicesInput}
                            onChange={(e) => handleChange('coreServicesInput', e.target.value)}
                        />
                    </div>
                </div>

                <div className="llm-input-group">
                    <label className="llm-input-label">Target Locations (One per line)</label>
                    <div className="llm-input-wrapper">
                        <MapPin className="llm-input-icon llm-input-icon-textarea" />
                        <textarea
                            rows={2}
                            placeholder="New York, NY&#10;San Francisco, CA"
                            className="llm-input llm-textarea"
                            value={config.targetLocations}
                            onChange={(e) => handleChange('targetLocations', e.target.value)}
                        />
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="llm-input-group">
                            <label className="llm-input-label">Google Business Profile URL</label>
                            <div className="llm-input-wrapper">
                                <MapPin className="llm-input-icon" />
                                <input
                                    type="url"
                                    placeholder="https://maps.google.com/..."
                                    className="llm-input"
                                    value={config.gbpUrl}
                                    onChange={(e) => handleChange('gbpUrl', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="llm-input-group">
                            <label className="llm-input-label">Social Profiles (Comma sep)</label>
                            <div className="llm-input-wrapper">
                                <Share2 className="llm-input-icon" />
                                <input
                                    type="text"
                                    placeholder="twitter.com/acme, linkedin.com/company/acme"
                                    className="llm-input"
                                    value={config.socialUrls}
                                    onChange={(e) => handleChange('socialUrls', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="llm-input-group">
                    <label className="llm-input-label">Additional Intelligence Notes</label>
                    <div className="llm-input-wrapper">
                        <FileText className="llm-input-icon llm-input-icon-textarea" />
                        <textarea
                            rows={3}
                            placeholder="Competitors, specific certifications to highlight, tools used..."
                            className="llm-input llm-textarea"
                            value={config.additionalNotes}
                            onChange={(e) => handleChange('additionalNotes', e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isGenerating || !config.websiteUrl || !config.businessName}
                    className="llm-btn-primary mt-3"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="animate-spin" style={{ width: '20px', height: '20px' }} />
                            Crawling & Generating...
                        </>
                    ) : (
                        <>
                            Start Recursive Crawl & Generate
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};
