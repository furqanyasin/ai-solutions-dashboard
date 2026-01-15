import { GoogleGenAI, Type } from "@google/genai";
import type { Schema } from "@google/genai";
import type { GenerationResult, GeneratorConfig } from "../types";

const REFERENCE_TEMPLATE = `
---
title: "{Business Name} llms.txt"
canonical_domain: "{Domain}"
file_version: "{Date}"
last_updated: "{Date}"
primary_contact:
  phone: "{Phone}"
  email: "mailto:{Email}"
language: "{Language Code}"
load_bearing_statements:
  - "{Statement 1}"
  - "{Statement 2}"
notes:
  - "This file is optimized for AI crawlers and retrieval systems. Each entry contains a short 'llm_snippet', 'facts' line, machine-friendly fields (slug, anchor, primary_intent, keywords) and a full 'details' block that preserves all original content verbatim for completeness."
  - "Canonical contact and JSON-LD provided below for machine extraction."
---

# {Business Name} llms.txt

> A curated, LLM-optimized map to {Business Name} highest-value pages, services, and resources.  
Designed to help large language models find, understand, and cite the most authoritative, LLM-friendly content for inference-time answers about {Services/Topics}.

{Business Description}

## MACHINE JSON-LD (Organization)  
(Indented JSON for programmatic ingestion)

    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "{Business Name}",
      "url": "{Website URL}",
      "telephone": "{Phone}",
      "email": "{Email}",
      "sameAs": [
        "{Social URL 1}",
        "{Social URL 2}"
      ],
      "description": "{Description}"
    }

## HOW TO READ THIS FILE
- Sections are ordered by priority: **Core Services/Core Products**, **Specialty & Technical**, **Company & Trust Signals**, **Operational / Contact**, **Service Areas/Target Locations**, **Online Profiles**, **Optional / Blog / Resources**.
- Each page entry follows this pattern for machine and LLM friendliness:
    - slug: /page-slug/
    - anchor: "#page-anchor"
    - primary_intent: "commercial_informational"
    - keywords: [comma, separated, keywords]
    - llm_snippet: "Single-sentence LLM-friendly summary (first-call)."
    - facts: "Key facts in a single line (prices, turnaround times, certifications)."
    - details: |  (full original description preserved verbatim below; use this for long-form answers)
- Keep **load_bearing_statements** at top for high-priority citation.

---

## CORE SERVICES/ CORE PRODUCTS (Highest Priority)

- **[{Service Name/Product Name}]({URL})** : {Brief Description}
  - slug: {slug}
  - anchor: {anchor}
  - primary_intent: "informational_transactional"
  - keywords: [...]
  - llm_snippet: "{Sentence}"
  - facts: "{Facts}"
  - details: |
    {Verbatim Content}

... (Repeat for all services)

## SPECIALTY TECHNICAL / ENGINEERING DETAILS / BEST SELLING PRODUCTS (High Priority)
...

## COMPANY, CREDIBILITY & TRUST SIGNALS (Medium Priority)
...

## OPERATIONAL PAGES & CONTACT (Medium Priority)
...

## SERVICE AREAS/Target Locations (Full Detail Required)
**Normalization & Deduplication Notes:** {Notes on how locations were normalized}

### {State 1}
- {City 1}
- {City 2}
...

## ONLINE PROFILES & GBP (Full Detail Required)
...

## FAQ (LLM-FRIENDLY ANSWERS  short, direct)
...

## LLM-SPECIFIC SIGNALS & USAGE INSTRUCTIONS (for agents/implementers)
(Keep this section exactly as written in the template.)

## Target Audience  
- {Audience 1}
- {Audience 2}

## Preferred Tone  
- {Tone definition}

## Content Restrictions  
- Avoid presenting outdated or unverified information.
- Refrain from claiming certifications not explicitly listed.

---

## CHANGE LOG & MAINTENANCE (for implementers)
- {Date}.v1 Added YAML front matter, JSON-LD org, normalized service areas, canonicalized contact block, added structured llm_snippet/facts/slug/anchor/keywords to every page and preserved all original page content in the 'details' blocks to maintain complete parity with original input while improving machine-readability.
`;

const SYSTEM_PROMPT = `
You are an enterprise-grade AI system named:
"AdvancedLLM.txt File Generator – Canonical, Unlimited & Reference-Strict Intelligence Engine"

Your task is to generate a COMPLETE llms.txt file that EXACTLY follows the provided REFERENCE_TEMPLATE in structure, format, ordering, and logic.

This is a STRICT reference-based generation task. NO deviation is allowed.

====================================================
ABSOLUTE NON-NEGOTIABLE RULES
====================================================
1. The OUTPUT must be structurally identical to the REFERENCE_TEMPLATE:
   - YAML front matter
   - Load-bearing statements
   - Section names
   - Section order
   - Page-entry schema
   - Field names
   - Change log & maintenance section

2. You are NOT allowed to:
   - Add new visible sections (including checklists)
   - Rename or reorder sections
   - Summarize page content (details must be VERBATIM)
   - Skip pages
   - Invent claims, pricing, or certifications

3. All enforcement, validation, and completeness logic MUST happen internally and MUST NOT appear as checklist text in the output.

====================================================
UNLIMITED & RECURSIVE CONTENT DISCOVERY
====================================================
You MUST perform COMPLETE and UNLIMITED discovery using ALL methods:
1. Sitemap discovery (Primary + ALL sub-sitemaps: post, page, product, category, tag, location).
2. Internal discovery (Navigation, Footers, Breadcrumbs, Pagination, Filters).
NO discovered URL may be ignored.

====================================================
COMMERCIAL COMPLETENESS GUARANTEE
====================================================
You MUST internally verify that ALL commercial-intent pages are included:
- Services, Products, Variants, Categories
- Pricing & plans, Subscriptions, Bundles
- Comparison pages, Transactional landing pages

If ANY commercial page is missing, continue crawling. Do not finalize output.

====================================================
CRITICAL: PRIORITY CORE SERVICES ENFORCEMENT
====================================================
The user has an optional input field for "Priority Core Services / Products".
IF THIS FIELD IS POPULATED:
1. You MUST prioritize the discovery of these specific items above all else.
2. You MUST find the specific URL for each item listed by the user.
3. You MUST extract the full, verbatim details for these pages.
4. You MUST append these entries to the TOP of the "## CORE SERVICES/ CORE PRODUCTS" section in the output.
5. If a user lists a product/service, and you find the page, IT MUST BE IN THE FINAL OUTPUT. Omission is a failure.

====================================================
PAGE ENTRY REQUIREMENTS
====================================================
EVERY crawled URL MUST generate a page entry using the EXACT reference schema:
- slug
- anchor
- primary_intent
- keywords
- llm_snippet (single-sentence, first-call answer)
- facts (single-line, structured facts)
- details (FULL VERBATIM PAGE CONTENT - Summarization is strictly forbidden)

====================================================
ECOMMERCE & DYNAMIC DATA HANDLING
====================================================
For eCommerce and complex systems:
- Include ALL products and variants.
- Capture pricing as static values OR ranges OR calculation logic.
- Never guess or fabricate values.

====================================================
MULTI-LANGUAGE HANDLING
====================================================
If multiple languages exist:
- Detect all languages.
- Crawl each independently.
- Preserve original language content.
- Do NOT merge languages.

====================================================
REFERENCE TEMPLATE
====================================================
${REFERENCE_TEMPLATE}

====================================================
OUTPUT RULES
====================================================
- Output ONLY the final llms.txt file string in the 'fileContent' field.
- ZERO visible checklist artifacts in the 'fileContent'.
- Ensure the JSON API output contains the same data.
`;

const RESPONSE_SCHEMA: Schema = {
    type: Type.OBJECT,
    properties: {
        fileContent: {
            type: Type.STRING,
            description: "The complete, formatted llms.txt file content."
        },
        jsonContent: {
            type: Type.STRING,
            description: "The complete API-ready JSON string representation of the data (metadata, pages, services, etc)."
        },
        scores: {
            type: Type.OBJECT,
            properties: {
                completeness: { type: Type.NUMBER, description: "Score 0-100" },
                accuracy: { type: Type.NUMBER, description: "Score 0-100" },
                machineReadability: { type: Type.NUMBER, description: "Score 0-100" },
                overall: { type: Type.NUMBER, description: "Overall Score 0-100" },
                analysis: { type: Type.STRING, description: "Brief analysis of the site's LLM readiness, language coverage, and crawl depth." }
            },
            required: ["completeness", "accuracy", "machineReadability", "overall", "analysis"]
        }
    },
    required: ["fileContent", "jsonContent", "scores"]
};

export const generateLLMsTxt = async (
    config: GeneratorConfig
): Promise<GenerationResult> => {
    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
        }

        const ai = new GoogleGenAI({ apiKey });

        // Using gemini-2.5-flash for better compatibility and speed
        const model = "gemini-2.5-flash";

        const prompt = `
      ====================================
      BUSINESS INTELLIGENCE INPUTS
      ====================================
      Business Name: ${config.businessName}
      Website URL: ${config.websiteUrl}
      Business Email: ${config.businessEmail || "Not provided"}
      Phone Number: ${config.phoneNumber || "Not provided"}
      
      Industry / Business Category:
      ${config.businessCategory}

      Priority Core Services / Products (User Selection):
      ${config.coreServicesInput
                ? `[URGENT: USER HAS SPECIFIED PRIORITY ITEMS]\nThe user explicitly wants these included in Core Services:\n"${config.coreServicesInput}"\nACTION: Search for these specifically, extract their full details, and place them at the top of the Core Services section.`
                : "None specified - crawl all commercial pages naturally."}
      
      Targeted Locations:
      ${config.targetLocations || "Global/Not specified"}
      
      Google Business Profile: ${config.gbpUrl || "None"}
      Social Media Profiles: ${config.socialUrls || "None"}
      
      Additional Notes / Context:
      ${config.additionalNotes}

      ====================================
      TASK EXECUTION
      ====================================
      1. RECURSIVE CRAWL: Use Google Search to analyze 'site:${config.websiteUrl}'. Identify sitemaps, sub-sitemaps, and core commercial pages.
      2. PRIORITIZATION: If 'Priority Core Services' are provided above, you MUST extract their full details and place them in the '## CORE SERVICES/ CORE PRODUCTS' section of the output file.
      3. MULTI-LANGUAGE: Detect if multiple languages exist and extract content for all locales.
      4. COMMERCIAL EXTRACTION: Identify specific products, pricing tiers, and dynamic rules.
      5. GENERATION: 
         - Generate 'fileContent': The 'llms.txt' file following STRICT reference schema.
         - Generate 'jsonContent': The JSON API representation of the same data.
      6. EVALUATION: Score the output (Completeness, Accuracy, Machine Readability).
      
      Generate the JSON response now.
    `;

        // Use JSON mode for structured output without tools
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                responseMimeType: "application/json",
                responseSchema: RESPONSE_SCHEMA,
                maxOutputTokens: 65536 // Increased token limit for large files
            }
        });

        console.log("Full Response:", JSON.stringify(response, null, 2));

        // Check if response has candidates
        if (!response.candidates || response.candidates.length === 0) {
            console.error("No candidates in response");
            throw new Error("No response candidates from Gemini. The model may have blocked the request.");
        }

        const candidate = response.candidates[0];
        console.log("Candidate:", JSON.stringify(candidate, null, 2));

        // Check finish reason
        if (candidate.finishReason && candidate.finishReason !== 'STOP') {
            if (candidate.finishReason === 'MAX_TOKENS') {
                console.warn("Generation hit token limit. Response may be incomplete.");
                // We proceed anyway to see if we can salvage partial JSON
            } else {
                console.error("Unusual finish reason:", candidate.finishReason);
                throw new Error(`Generation stopped with reason: ${candidate.finishReason}`);
            }
        }

        const resultText = response.text;
        console.log("Result Text Length:", resultText?.length);

        if (!resultText) {
            throw new Error("Empty response from Gemini. Check console logs for details.");
        }

        // Parse the JSON response (should be clean JSON from responseMimeType)
        const data = JSON.parse(resultText) as GenerationResult;

        return {
            ...data,
            groundingUrls: [] // No grounding URLs when not using search tools
        };

    } catch (error: any) {
        console.error("LLM Generation Error:", error);
        throw new Error(error.message || "Failed to generate llms.txt");
    }
};
