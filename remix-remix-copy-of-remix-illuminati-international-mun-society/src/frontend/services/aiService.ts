import { httpsCallable } from 'firebase/functions';
import { functions, isFirebaseConfigured } from './firebase';

export interface SpeechAnalysisRequest {
  speechText: string;
  country: string;
  committee: string;
  agenda: string;
  speechDurationSeconds?: number;
}

export interface ResolutionReviewRequest {
  committee: string;
  topic: string;
  sponsors: string[];
  preambles: string[];
  operatives: string[];
}

/**
 * Submits an opening speech draft to the Gemini 2.0 AI Dais Coach backend.
 */
export async function requestSpeechAnalysis(payload: SpeechAnalysisRequest): Promise<string> {
  if (isFirebaseConfigured) {
    try {
      const analyzeFn = httpsCallable<SpeechAnalysisRequest, { success: boolean; analysis: string }>(
        functions,
        'analyzeOpeningSpeech'
      );
      const result = await analyzeFn(payload);
      if (result.data.success) {
        return result.data.analysis;
      }
    } catch (err: any) {
      console.warn('Backend AI function call failed:', err);
    }
  }

  // Fallback simulated critique for development without live Cloud Function
  return `### Diplomatic Analysis (Simulated Dais Feedback)
**Policy Alignment & Rhetoric Score:** 8.5/10
- **Strengths:** Clear reference to sovereign rights and opening hook captures Dais attention.
- **Recommendations:** Ensure specific references to multilateral treaties during the second half of the speech.
- **Bloc Suggestion:** Align early with regional delegations during the initial unmoderated caucus.`;
}

/**
 * Submits a draft resolution for UN clause validation and grammar critique.
 */
export async function requestResolutionReview(payload: ResolutionReviewRequest): Promise<string> {
  if (isFirebaseConfigured) {
    try {
      const reviewFn = httpsCallable<ResolutionReviewRequest, { success: boolean; review: string }>(
        functions,
        'reviewResolutionClauses'
      );
      const result = await reviewFn(payload);
      if (result.data.success) {
        return result.data.review;
      }
    } catch (err: any) {
      console.warn('Backend AI resolution review call failed:', err);
    }
  }

  return `### Resolution Review (Simulated Legal Dais Report)
**Status:** Formatting Verified
- Pre-ambulatory phrasing adheres to standard UN guidelines.
- Operative verbs are properly sequential.`;
}
