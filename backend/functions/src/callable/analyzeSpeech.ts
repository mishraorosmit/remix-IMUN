import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface SpeechAnalysisPayload {
  speechText: string;
  country: string;
  committee: string;
  agenda: string;
  speechDurationSeconds?: number;
}

export const analyzeOpeningSpeech = onCall(async (request) => {
  const data = request.data as SpeechAnalysisPayload;
  const { speechText, country, committee, agenda, speechDurationSeconds = 90 } = data;

  if (!speechText || !country || !committee) {
    throw new HttpsError('invalid-argument', 'Missing mandatory parameters (speechText, country, committee).');
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new HttpsError('failed-precondition', 'GEMINI_API_KEY is not configured on the backend server.');
  }

  const systemInstruction = `You are a veteran Model United Nations Chief Dais Chair, Diplomatic Strategist, and Speech Coach with 10+ years in international circuits (Harvard, BIMUN, Oxford, UNHQ).`;

  const userPrompt = `
Analyze this opening General Speakers List (GSL) speech for a delegate of ${country} in the committee "${committee}" on the agenda "${agenda}". The target speech duration is ${speechDurationSeconds} seconds.

Delegate's Speech Draft:
"""
${speechText}
"""

Please provide a structured diplomatic appraisal formatted in clean markdown:
1. **Diplomatic Impact & Policy Alignment Score (1-10)**: Grade rhetorical hooks, foreign policy adherence, and tone.
2. **Key Strengths**: 2-3 points on what works well.
3. **Strategic Vulnerabilities & Counter-Arguments**: What opposing nations/blocs will exploit.
4. **Caucus Bloc Recommendations**: Which natural ally countries should this delegate approach immediately during unmoderated caucus.
5. **Polished Masterclass Version**: Deliver an upgraded, punchy 90-second speech that preserves the delegate's core points while incorporating high-impact diplomatic language and clear operative calls to action.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }] }
      ],
    });

    return {
      success: true,
      analysis: response.text,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('Gemini API speech analysis error:', error);
    throw new HttpsError('internal', `Failed to generate speech analysis: ${error.message}`);
  }
});
