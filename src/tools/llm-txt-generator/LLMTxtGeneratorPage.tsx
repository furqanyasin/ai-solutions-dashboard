import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import MasterLayout from '../../layouts/MasterLayout';
import { InputForm } from './components/InputForm';
import { OutputViewer } from './components/OutputViewer';
import { ScoreCard } from './components/ScoreCard';
import { generateLLMsTxt } from './services/gemini';
import type { GeneratorState, GeneratorConfig } from './types';
import { AlertCircle, Network, Bot, Terminal } from 'lucide-react';
import './styles.css';

const LLMTxtGeneratorPage: React.FC = () => {
    const [state, setState] = useState<GeneratorState>({
        isGenerating: false,
        isAnalyzed: false,
        error: null,
        result: null
    });

    const handleGenerate = async (config: GeneratorConfig) => {
        setState(prev => ({ ...prev, isGenerating: true, error: null }));
        try {
            const result = await generateLLMsTxt(config);
            setState({
                isGenerating: false,
                isAnalyzed: true,
                error: null,
                result
            });
        } catch (err: any) {
            setState(prev => ({
                ...prev,
                isGenerating: false,
                error: err.message || "An unexpected error occurred."
            }));
        }
    };

    return (
        <MasterLayout>
            {/* Breadcrumb */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                <h6 className="fw-semibold mb-0">LLM.txt Generator</h6>
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
                    <li className="fw-medium">
                        <Link to="#" className="hover-text-primary">GEO</Link>
                    </li>
                    <li>-</li>
                    <li className="fw-medium">LLM.txt Generator</li>
                </ul>
            </div>

            {/* Tool Header */}
            <div className="card radius-16 border-0 mb-24" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)' }}>
                <div className="card-body p-24">
                    <div className="d-flex flex-wrap align-items-start justify-content-between gap-3">
                        <div>
                            <h1 className="text-white fw-bold mb-2 d-flex align-items-center gap-3" style={{ fontSize: '28px' }}>
                                <Network style={{ width: '32px', height: '32px', color: '#818cf8' }} />
                                Advanced<span style={{ color: '#818cf8' }}>LLM.txt</span> Generator
                            </h1>
                            <p className="text-white mb-0" style={{ opacity: 0.7, fontSize: '16px' }}>
                                Canonical • Unlimited • Reference-Strict Intelligence Engine
                            </p>
                        </div>
                        <div className="d-none d-md-flex align-items-center gap-2 px-3 py-2 radius-8" style={{ background: 'rgba(255,255,255,0.1)' }}>
                            <Bot style={{ width: '16px', height: '16px', color: '#34d399' }} />
                            <span className="text-white" style={{ fontSize: '12px', fontFamily: 'monospace' }}>System: ONLINE</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Alert */}
            {state.error && (
                <div className="llm-error-alert">
                    <AlertCircle style={{ width: '20px', height: '20px', color: '#f87171', flexShrink: 0 }} />
                    <p className="mb-0 fw-medium text-sm">{state.error}</p>
                </div>
            )}

            {/* Main Content */}
            <div className="row g-4">
                {/* Left Column: Input & Scores */}
                <div className="col-lg-4">
                    <div className="d-flex flex-column gap-4">
                        <InputForm onGenerate={handleGenerate} isGenerating={state.isGenerating} />

                        {state.result && (
                            <div className="animate__animated animate__fadeInUp">
                                <ScoreCard
                                    scores={state.result.scores}
                                    groundingUrls={state.result.groundingUrls}
                                />
                            </div>
                        )}

                        {!state.result && !state.isGenerating && (
                            <div className="llm-input-card text-center" style={{ border: '1px dashed rgba(71, 85, 105, 0.5)' }}>
                                <Terminal style={{ width: '32px', height: '32px', opacity: 0.2, marginBottom: '12px' }} />
                                <p className="text-secondary-light text-sm mb-0">
                                    Recursive crawl scores and validation metrics will appear here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Output Viewer */}
                <div className="col-lg-8">
                    <OutputViewer
                        content={state.result?.fileContent || ''}
                        jsonContent={state.result?.jsonContent || ''}
                    />
                </div>
            </div>

            {/* Footer Info */}
            <div className="mt-24 pt-24 text-center" style={{ borderTop: '1px solid rgba(71, 85, 105, 0.3)' }}>
                <p className="text-secondary-light text-xs mb-0" style={{ fontFamily: 'monospace' }}>
                    Powered by Gemini 1.5 Flash • Recursive Sitemap Intelligence • Reference v2.0
                </p>
            </div>
        </MasterLayout>
    );
};

export default LLMTxtGeneratorPage;
