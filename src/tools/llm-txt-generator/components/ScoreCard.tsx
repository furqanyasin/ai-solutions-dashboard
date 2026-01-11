import React from 'react';
import type { ScoringMetrics } from '../types';
import { CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

interface ScoreCardProps {
    scores: ScoringMetrics;
    groundingUrls?: string[];
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ scores, groundingUrls }) => {
    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-emerald';
        if (score >= 70) return 'text-yellow';
        return 'text-red';
    };

    const getProgressColor = (score: number) => {
        if (score >= 90) return 'bg-emerald';
        if (score >= 70) return 'bg-yellow';
        return 'bg-red';
    };

    return (
        <div className="llm-score-card">
            <div className="llm-score-header">
                <ShieldCheck style={{ width: '20px', height: '20px', color: '#34d399' }} />
                <div>
                    <h2 className="llm-score-title mb-0">Validation Scorecard</h2>
                    <p className="llm-score-subtitle mb-0">Reference-locked compliance & quality audit.</p>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-6">
                    <div className="llm-overall-score">
                        <span className="llm-score-label">Overall</span>
                        <span className={`llm-score-value ${getScoreColor(scores.overall)}`}>
                            {scores.overall}
                        </span>
                        <div className="llm-score-bar">
                            <div
                                className={`llm-score-bar-fill ${getProgressColor(scores.overall)}`}
                                style={{ width: `${scores.overall}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-6">
                    <ScoreRow
                        label="Completeness"
                        score={scores.completeness}
                        color={getScoreColor(scores.completeness)}
                        progress={getProgressColor(scores.completeness)}
                    />
                    <ScoreRow
                        label="Accuracy"
                        score={scores.accuracy}
                        color={getScoreColor(scores.accuracy)}
                        progress={getProgressColor(scores.accuracy)}
                    />
                    <ScoreRow
                        label="Machine Readability"
                        score={scores.machineReadability}
                        color={getScoreColor(scores.machineReadability)}
                        progress={getProgressColor(scores.machineReadability)}
                    />
                </div>
            </div>

            <div className="llm-analysis-box">
                <h3 className="llm-analysis-title">
                    <Cpu style={{ width: '16px', height: '16px' }} />
                    AI Analysis
                </h3>
                <p className="llm-analysis-text mb-0">
                    {scores.analysis}
                </p>
            </div>

            {groundingUrls && groundingUrls.length > 0 && (
                <div>
                    <h3 className="llm-sources-title">Crawled Sources</h3>
                    <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
                        {groundingUrls.map((url, idx) => (
                            <div key={idx} className="llm-source-item">
                                <CheckCircle2 style={{ width: '12px', height: '12px', color: '#6366f1', flexShrink: 0 }} />
                                <a href={url} target="_blank" rel="noreferrer" className="llm-source-link">
                                    {url}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const ScoreRow = ({ label, score, color, progress }: { label: string, score: number, color: string, progress: string }) => (
    <div className="llm-score-row">
        <div className="llm-score-row-header">
            <span className="llm-score-row-label">{label}</span>
            <span className={`llm-score-row-value ${color}`}>{score}%</span>
        </div>
        <div className="llm-score-progress">
            <div className={`llm-score-progress-fill ${progress}`} style={{ width: `${score}%` }} />
        </div>
    </div>
);
