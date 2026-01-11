import React, { useState } from 'react';
import { Copy, Download, Check, FileText, Code, FileJson } from 'lucide-react';

interface OutputViewerProps {
    content: string;
    jsonContent?: string;
}

type Tab = 'text' | 'json';

export const OutputViewer: React.FC<OutputViewerProps> = ({ content, jsonContent }) => {
    const [activeTab, setActiveTab] = useState<Tab>('text');
    const [copied, setCopied] = useState(false);

    const activeContent = activeTab === 'text' ? content : jsonContent || '';

    const handleCopy = () => {
        navigator.clipboard.writeText(activeContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const extension = activeTab === 'text' ? 'txt' : 'json';
        const mimeType = activeTab === 'text' ? 'text/plain' : 'application/json';
        const blob = new Blob([activeContent], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `llms.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="llm-output-card d-flex flex-column" style={{ height: '100%', minHeight: '500px' }}>
            <div className="llm-output-header">
                {/* Tabs */}
                <div className="llm-tab-group">
                    <button
                        onClick={() => setActiveTab('text')}
                        className={`llm-tab ${activeTab === 'text' ? 'active' : ''}`}
                    >
                        <FileText style={{ width: '14px', height: '14px' }} />
                        llms.txt
                    </button>
                    <button
                        onClick={() => setActiveTab('json')}
                        className={`llm-tab ${activeTab === 'json' ? 'active' : ''}`}
                    >
                        <FileJson style={{ width: '14px', height: '14px' }} />
                        API JSON
                    </button>
                </div>

                {/* Actions */}
                <div className="d-flex align-items-center gap-2">
                    <span className="d-none d-md-inline-flex text-uppercase text-secondary-light" style={{ fontSize: '10px', letterSpacing: '0.05em', fontWeight: 600 }}>
                        {activeTab === 'text' ? 'Canonical Format' : 'Machine API Format'}
                    </span>
                    <button
                        onClick={handleCopy}
                        disabled={!activeContent}
                        className="llm-action-btn llm-action-btn-secondary"
                    >
                        {copied ? <Check style={{ width: '14px', height: '14px', color: '#34d399' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={!activeContent}
                        className="llm-action-btn llm-action-btn-primary"
                    >
                        <Download style={{ width: '14px', height: '14px' }} />
                        Download
                    </button>
                </div>
            </div>

            <div className="llm-output-content position-relative flex-grow-1">
                {!content && !jsonContent && (
                    <div className="llm-output-placeholder">
                        <Code style={{ width: '48px', height: '48px', opacity: 0.2, marginBottom: '16px' }} />
                        <p className="fst-italic text-sm mb-0">Waiting for generation...<br />Configure the intelligence engine to start.</p>
                    </div>
                )}
                <pre className={`llm-output-pre ${activeTab === 'json' ? 'llm-output-json' : 'llm-output-text'}`}>
                    {activeContent}
                </pre>
            </div>
        </div>
    );
};
