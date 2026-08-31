import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface ResolutionReviewPayload {
  committee: string;
  topic: string;
  sponsors: string[];
  preambles: string[];
  operatives: string[];
}

export const reviewResolutionClauses = onCall(async (request) => {
  const data = request.data as ResolutionReviewPayload;
  const { committee, topic, sponsors, preambles, operatives } = data;

  if (!committee || !operatives || operatives.length === 0) {
    throw new HttpsError('invalid-argument', 'Missing mandatory resolution data (committee, operatives).');
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new HttpsError('failed-precondition', 'GEMINI_API_KEY is not configured on the backend server.');
  }

  const prompt = `
You are the Rapporteur & Legal Dais Director for ${committee}.
Review the following Draft Resolution for UN formatting compliance, UN Charter validity, and diplomatic effectiveness.

**Topic:** ${topic}
**Sponsors:** ${sponsors.join(', ') || 'Various Member States'}

**Pre-ambulatory Clauses:**
${preambles.map((p) => `- ${p}`).join('\n')}

**Operative Clauses:**
${operatives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

Provide an analytical Dais report:
1. **UN Procedure Compliance (Pass / Needs Revision / Substantive Flaw)**
2. **Clause-by-Clause Phrasing Audit**: Check for correct verbs (e.g., *Emphasizing, Reaffirming* for preambles; *Calls upon, Encourages, Authorizes* for operatives). Note: General Assemblies cannot use binding verbs like *Demands* or *Orders* without Security Council authority.
3. **Funding & Oversight Verification**: Did the draft establish oversight mechanisms or budgetary appropriations where needed?
4. **Clean Consolidated Draft**: Provide the refined, professionally formatted text ready for committee floor submission.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    return {
      success: true,
      review: response.text,
      reviewedAt: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('Gemini resolution review error:', error);
    throw new HttpsError('internal', `Failed to review resolution: ${error.message}`);
  }
});
