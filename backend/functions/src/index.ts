/**
 * Illuminati International MUN Society - Serverless Cloud Functions Entrypoint
 */

// Firestore Document Triggers
export { onDelegateRegistered } from './triggers/onDelegateRegistered';
export { onSessionBooked } from './triggers/onSessionBooked';
export { onContactInquiry } from './triggers/onContactInquiry';

// Callable Endpoints (Client / AI / Admin)
export { analyzeOpeningSpeech } from './callable/analyzeSpeech';
export { reviewResolutionClauses } from './callable/reviewResolution';
export { setDelegateAllotment } from './callable/setDelegateAllotment';
