export interface GeneratorState {
    isGenerating: boolean;
    isAnalyzed: boolean;
    error: string | null;
    result: GenerationResult | null;
}

export interface GenerationResult {
    fileContent: string;
    jsonContent: string;
    scores: ScoringMetrics;
    groundingUrls?: string[];
}

export interface ScoringMetrics {
    completeness: number;
    accuracy: number;
    machineReadability: number;
    overall: number;
    analysis: string;
}

export interface GeneratorConfig {
    businessName: string;
    websiteUrl: string;
    businessEmail: string;
    phoneNumber: string;
    businessCategory: string;
    coreServicesInput: string;
    targetLocations: string;
    gbpUrl: string;
    socialUrls: string;
    additionalNotes: string;
}

export enum Step {
    IDLE,
    CRAWLING,
    PROCESSING,
    GENERATING,
    COMPLETE
}
