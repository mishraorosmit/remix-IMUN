# Backend Architecture & Implementation Guide (Firebase)
## Illuminati International MUN Society

This document serves as the complete technical blueprint for integrating a scalable, production-grade **Firebase** backend into the **Illuminati International MUN Society** platform. It outlines all frontend features that require persistence and server-side workflows, details the Firestore database schemas, presents production security rules, and provides step-by-step implementation code.

---

## 1. System Architecture Overview

```mermaid
flowchart TD
    subgraph Client [React 19 + TypeScript Frontend]
        UI[UI Components & Modals]
        FService[Firebase Client SDK v11+]
    end

    subgraph FirebaseCloud [Firebase Cloud Ecosystem]
        Auth[Firebase Authentication\n(Admin & EB Custom Claims)]
        Firestore[(Cloud Firestore\nNoSQL Database)]
        Storage[Firebase Storage\n(Position Papers & Media)]
        Functions[Cloud Functions for Firebase\n(Node.js / TypeScript)]
    end

    subgraph External [External Services]
        Email[Email Service\n(SendGrid / Resend / Postmark)]
        Gemini[Google Gemini 2.0 API\n(@google/genai)]
        Calendar[Google Calendar API\n(Session Bookings)]
        Discord[Secretariat Webhook\n(Discord / Slack / Telegram)]
    end

    UI --> FService
    FService -->|JWT / ID Token| Auth
    FService -->|CRUD Operations| Firestore
    FService -->|Direct File Uploads| Storage
    Firestore -->|Document Triggers (onCreate)| Functions
    Functions -->|Transactional Dispatch| Email
    Functions -->|Executive Alerts| Discord
    Functions -->|Rhetorical Analysis| Gemini
    Functions -->|Meeting Links| Calendar
```

---

## 2. Inventory of Features Requiring Backend

| Feature Area | Component | Current State | Backend Requirements |
| :--- | :--- | :--- | :--- |
| **Delegate Registration** | `DelegateRegistrationModal.tsx` | Local mock state + simulated timeout | • Firestore collection `delegate_registrations`<br>• Automated clearance code generation<br>• Confirmation email dispatch via Cloud Functions<br>• Secretariat webhook alert<br>• Country portfolio allotment tracking |
| **Session Booking System** | `BookSessionSection.tsx` | Local mock state + sound triggers | • Firestore collection `session_bookings`<br>• Date/Time slot collision validation<br>• Calendar event scheduling & Google Meet generation<br>• Status workflow (`pending`, `confirmed`, `completed`) |
| **Diplomatic Desk Inquiries** | `ContactsSection.tsx` | Local state + random cable code | • Firestore collection `contact_inquiries`<br>• Rate limiting / anti-spam validation<br>• Auto-forwarding to official Secretariat inbox |
| **Dynamic CMS & Ticker** | `BroadsheetHero.tsx`<br>`MarqueeTicker.tsx`<br>`conferenceData.ts` | Hardcoded static TypeScript arrays | • Dynamic breaking dispatches (`marquee_dispatches`)<br>• Real-time updates without redeploying code<br>• Active conference editions & seat capacity tracking |
| **Archival Media Gallery** | `GallerySection.tsx`<br>`PartnerCarousel.tsx` | Static images in `/public` | • Firebase Cloud Storage for high-res conference photos<br>• Metadata documents in `gallery_media` collection<br>• Admin upload and categorization interface |
| **Draft Resolution Builder** | `WarRoomMap.tsx` | Local clause selection and copy-to-clipboard | • Persisting draft resolutions to `draft_resolutions`<br>• Real-time collaborative drafting between co-sponsors<br>• Exportable PDF / Doc links |
| **Administrative Access & EB Portal** | New Admin Dashboard | None (Direct code modification) | • Firebase Auth with Custom Claims (`role: 'admin' \| 'eb'`)<br>• Delegate approval & allotment management<br>• Exporting attendee sheets to CSV / Excel |
| **AI Speech & Resolution Coach** | AI Studio integration ready (`@google/genai`) | Configuration in `package.json` | • Secure server-side Cloud Function calling Gemini 2.0<br>• Opening speech feedback, clause grammar review, and crisis directive analysis |

---

## 3. Firestore Data Schema Design

### 3.1. Collection: `delegate_registrations`
Stores all applicant submissions for Model UN conferences.

```typescript
interface DelegateRegistrationDoc {
  id: string;                         // Auto-generated Firestore ID
  clearanceCode: string;              // E.g., "IMUN-2026-ALPHA-8492"
  fullName: string;
  institution: string;
  email: string;
  phone: string;
  delegationType: 'Single Delegate' | 'Double Delegation' | 'School Delegation';
  preferredCommittee: string;         // E.g., "UN Security Council"
  countryPreferences: [string, string, string]; // Top 3 country preferences
  experienceLevel: 'Beginner (0-1)' | '1-3 Conferences' | '4-7 Conferences' | 'Veteran (8+)';
  crisisRoleInterest: boolean;
  priorAwardsAndNotes?: string;
  paymentProofUrl?: string;           // Optional Storage URL
  status: 'submitted' | 'under_review' | 'allotted' | 'waitlisted' | 'rejected';
  allotment?: {
    committee: string;
    allottedCountry: string;
    allottedAt: FirebaseFirestore.Timestamp;
    ebNotes?: string;
  };
  submittedAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}
```

### 3.2. Collection: `session_bookings`
Manages 1-on-1 coaching, institutional training, and secretariat advisory sessions.

```typescript
interface SessionBookingDoc {
  id: string;
  bookingRef: string;                 // E.g., "BOOK-2026-STRAT-1029"
  category: 'delegate-mastery' | 'institutional-delegation' | 'secretariat-advisory';
  sessionFormat: 'virtual' | 'in-person';
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  experienceLevel: string;
  preferredDate: string;              // "YYYY-MM-DD"
  preferredTimeSlot: string;          // E.g., "Evening (6:00 PM – 9:00 PM IST)"
  goals: string;
  meetingLink?: string;               // Generated Google Meet / Zoom link
  status: 'pending' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  createdAt: FirebaseFirestore.Timestamp;
  confirmedAt?: FirebaseFirestore.Timestamp;
}
```

### 3.3. Collection: `contact_inquiries`
Logs messages received through the Secretariat Diplomatic Desk.

```typescript
interface ContactInquiryDoc {
  id: string;
  transmissionCode: string;          // E.g., "DIPLOMATIC-CABLE-492019"
  senderName: string;
  senderEmail: string;
  institution?: string;
  inquiryType: 
    | 'Delegate Registration & Query'
    | 'Institutional Partnership / School MUN Support'
    | 'Masterclass & Mentorship Enrollment'
    | 'International Exchange & Collaboration'
    | 'Executive Board & Chair Applications'
    | 'Press & Media Inquiries';
  message: string;
  status: 'unread' | 'in_progress' | 'responded' | 'archived';
  receivedAt: FirebaseFirestore.Timestamp;
}
```

### 3.4. Collection: `marquee_dispatches`
Real-time news ticker dispatches displayed on the broadsheet home page.

```typescript
interface MarqueeDispatchDoc {
  id: string;
  headline: string;
  category: 'BREAKING' | 'DISPATCH' | 'ALLOTMENT' | 'DEADLINE' | 'PARTNERSHIP';
  priority: number;                   // 1 (Highest) to 10
  isActive: boolean;
  expiresAt?: FirebaseFirestore.Timestamp;
  createdAt: FirebaseFirestore.Timestamp;
}
```

### 3.5. Collection: `draft_resolutions`
Allows delegates to store, collaborate on, and export working papers and draft resolutions.

```typescript
interface DraftResolutionDoc {
  id: string;
  committeeId: string;                // E.g., "unsc"
  topic: string;
  mainSponsors: string[];             // E.g., ["United States", "France"]
  coSponsors: string[];
  signatories: string[];
  preambulatoryClauses: string[];
  operativeClauses: {
    number: number;
    text: string;
    subClauses?: string[];
  }[];
  isPublished: boolean;
  createdBy: string;                  // Delegate User UID or Anonymous Token
  updatedAt: FirebaseFirestore.Timestamp;
}
```

---

## 4. Firebase Security Rules

### 4.1. Firestore Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && request.auth.token.role == 'admin';
    }

    function isExecutiveBoard() {
      return isAuthenticated() && (request.auth.token.role == 'admin' || request.auth.token.role == 'eb');
    }

    // 1. Delegate Registrations
    match /delegate_registrations/{regId} {
      // Anyone can submit a registration
      allow create: if request.resource.data.fullName is string
                    && request.resource.data.email is string
                    && request.resource.data.preferredCommittee is string
                    && request.resource.data.status == 'submitted';
      
      // Public / Anonymous user can read their own registration with clearanceCode matching
      allow get: if true; 
      
      // Only Admin or Executive Board can list all registrations and update statuses / allotments
      allow list, update, delete: if isExecutiveBoard();
    }

    // 2. Session Bookings
    match /session_bookings/{bookingId} {
      allow create: if request.resource.data.fullName is string
                    && request.resource.data.email is string
                    && request.resource.data.status == 'pending';
      allow get: if true;
      allow list, update, delete: if isAdmin();
    }

    // 3. Contact Inquiries
    match /contact_inquiries/{inquiryId} {
      allow create: if request.resource.data.senderName is string
                    && request.resource.data.senderEmail is string
                    && request.resource.data.message is string;
      allow read, update, delete: if isAdmin();
    }

    // 4. Marquee Dispatches & CMS Content
    match /marquee_dispatches/{dispatchId} {
      allow read: if true; // Public read
      allow write: if isExecutiveBoard();
    }

    // 5. Draft Resolutions
    match /draft_resolutions/{resolutionId} {
      allow read: if true;
      allow create: if true;
      allow update: if resource.data.createdBy == request.auth.uid || isExecutiveBoard();
      allow delete: if isAdmin();
    }
  }
}
```

### 4.2. Storage Security Rules (`storage.rules`)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Position Papers and Payment Receipts
    match /delegates/{regId}/{fileName} {
      allow write: if request.resource.size < 10 * 1024 * 1024 // Max 10MB
                   && (request.resource.contentType.matches('application/pdf')
                       || request.resource.contentType.matches('image/.*'));
      allow read: if request.auth != null;
    }

    // Archival Gallery Media
    match /gallery/{allImages=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
  }
}
```

---

## 5. Cloud Functions (Serverless Backend)

Create a `functions/` folder using Firebase Functions v2 (`Node.js 20+ / TypeScript`).

### 5.1. Initialization & Configuration (`functions/src/index.ts`)

```typescript
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { Resend } from "resend";
import { GoogleGenAI } from "@google/genai";

admin.initializeApp();
const db = admin.firestore();
const resend = new Resend(process.env.RESEND_API_KEY);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * 1. Trigger: Delegate Registration Created
 * Action: Sends automated confirmation email with clearance code and alerts Secretariat.
 */
export const onDelegateRegistered = onDocumentCreated(
  "delegate_registrations/{regId}",
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const data = snap.data();

    // 1. Send confirmation email to delegate
    await resend.emails.send({
      from: "Secretariat <secretariat@illuminatimun.org>",
      to: data.email,
      subject: `[CONFIRMED] Dossier Registration Receipt: ${data.clearanceCode}`,
      html: `
        <div style="font-family: Georgia, serif; background: #F8F4E6; padding: 24px; color: #0B192C; border: 2px solid #0B192C;">
          <h2 style="color: #C5A059; text-transform: uppercase;">Illuminati International MUN Society</h2>
          <p>Dear <strong>${data.fullName}</strong>,</p>
          <p>Your delegate registration for <strong>${data.preferredCommittee}</strong> has been logged in the Secretariat Dossier.</p>
          <div style="background: #E6D5B8; padding: 12px; border: 1px solid #0B192C; font-family: monospace;">
            <strong>CLEARANCE CODE:</strong> ${data.clearanceCode}<br/>
            <strong>DELEGATION TYPE:</strong> ${data.delegationType}<br/>
            <strong>1ST PREFERENCE:</strong> ${data.countryPreferences?.[0] || 'N/A'}
          </div>
          <p>Executive Board portfolio allotments will be notified via this channel shortly.</p>
          <p><em>In Diplomacy & Leadership,<br/>The Secretariat Directorate</em></p>
        </div>
      `,
    });

    // 2. Dispatch alert to Secretariat Discord / Slack Webhook
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🚨 **New Delegate Dossier Filed!**\n**Name:** ${data.fullName} (${data.institution})\n**Committee:** ${data.preferredCommittee}\n**Code:** \`${data.clearanceCode}\``,
        }),
      });
    }
  }
);

/**
 * 2. Trigger: Session Booking Created
 * Action: Sends calendar booking acknowledgment.
 */
export const onSessionBooked = onDocumentCreated(
  "session_bookings/{bookingId}",
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const data = snap.data();

    await resend.emails.send({
      from: "Subhrakant Biswal Mentorship <sessions@illuminatimun.org>",
      to: data.email,
      subject: `Session Scheduled: ${data.bookingRef}`,
      html: `
        <div style="font-family: Georgia, serif; background: #F8F4E6; padding: 24px; color: #0B192C;">
          <h2>Session Consultation Logged</h2>
          <p>Hello <strong>${data.fullName}</strong>,</p>
          <p>Your session request for <strong>${data.category}</strong> on <strong>${data.preferredDate} (${data.preferredTimeSlot})</strong> has been received.</p>
          <p>A calendar invitation and virtual meeting room link will be transmitted within 24 hours.</p>
        </div>
      `,
    });
  }
);

/**
 * 3. Callable Function: AI Opening Speech & Strategy Coach
 * Action: Evaluates opening speech draft using Google Gemini 2.0.
 */
export const analyzeOpeningSpeech = onCall(async (request) => {
  const { speechText, country, committee, agenda } = request.data;
  if (!speechText || !country || !committee) {
    throw new HttpsError("invalid-argument", "Missing speech parameters.");
  }

  const prompt = `
    You are a veteran Model United Nations Chief Dais Chair & Strategic Advisor for ${committee}.
    Evaluate the following 90-second opening speech for the delegate of ${country} on the topic "${agenda}".
    
    Speech:
    """
    ${speechText}
    """

    Provide a concise, high-impact diplomatic critique covering:
    1. Rhetorical Hook & Policy Alignment (Score 1-10)
    2. Operative Substance & Diplomatic Solutions
    3. Caucus Bloc Strategy (Recommended alliances)
    4. Improved 90-second version retaining the delegate's core points.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return { critique: response.text };
});
```

---

## 6. Frontend Integration Steps

### Step 1: Install Firebase Client SDK
Run inside the project root:
```bash
npm install firebase
```

### Step 2: Initialize Firebase Config
Create a new file at `src/frontend/services/firebase.ts`:

```typescript
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
```

### Step 3: Create Service Helpers

#### `src/frontend/services/registrationService.ts`
```typescript
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { DelegateApplication } from "../types";

export async function submitDelegateRegistration(formData: Partial<DelegateApplication>) {
  const serial = Math.floor(1000 + Math.random() * 9000);
  const clearanceCode = `IMUN-2026-ALPHA-${serial}`;

  const docRef = await addDoc(collection(db, "delegate_registrations"), {
    fullName: formData.fullName,
    institution: formData.institution,
    email: formData.email,
    phone: formData.phone,
    delegationType: formData.delegationType || "Single Delegate",
    preferredCommittee: formData.preferredCommittee || "UN Security Council",
    countryPreferences: [
      formData.countryPreference1 || "United States",
      formData.countryPreference2 || "United Kingdom",
      formData.countryPreference3 || "France",
    ],
    experienceLevel: formData.experienceLevel || "1-3 Conferences",
    crisisRoleInterest: formData.crisisRoleInterest ?? true,
    priorAwardsAndNotes: formData.priorAwards || "",
    clearanceCode,
    status: "submitted",
    submittedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return { id: docRef.id, clearanceCode };
}
```

#### `src/frontend/services/bookingService.ts`
```typescript
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface BookingPayload {
  category: string;
  sessionFormat: "virtual" | "in-person";
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  experienceLevel: string;
  preferredDate: string;
  preferredTimeSlot: string;
  goals: string;
}

export async function createSessionBooking(payload: BookingPayload) {
  const refCode = `BOOK-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const docRef = await addDoc(collection(db, "session_bookings"), {
    ...payload,
    bookingRef: refCode,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  return { id: docRef.id, bookingRef: refCode };
}
```

#### `src/frontend/services/contactService.ts`
```typescript
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function transmitDiplomaticCable(data: {
  senderName: string;
  senderEmail: string;
  institution?: string;
  inquiryType: string;
  message: string;
}) {
  const cableCode = `DIPLOMATIC-CABLE-${Math.floor(100000 + Math.random() * 900000)}`;

  const docRef = await addDoc(collection(db, "contact_inquiries"), {
    ...data,
    transmissionCode: cableCode,
    status: "unread",
    receivedAt: serverTimestamp(),
  });

  return { id: docRef.id, transmissionCode: cableCode };
}
```

---

## 7. Connecting React Components to Firebase

### Example: Updating `DelegateRegistrationModal.tsx`

```tsx
import React, { useState } from 'react';
import { submitDelegateRegistration } from '../../services/registrationService';
import { useToast } from '../../context/ToastContext';
import { playStampSound } from '../../utils/audio';
import confetti from 'canvas-confetti';

// Inside handleSubmit:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.fullName || !formData.institution || !formData.email) {
    setErrorMsg('All mandatory dossier credentials must be filed.');
    return;
  }

  setIsSubmitting(true);
  try {
    const { clearanceCode } = await submitDelegateRegistration(formData);
    
    playStampSound();
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });

    setSubmittedDossier({
      ...formData,
      clearanceCode,
      registrationTimestamp: new Date().toISOString(),
    } as any);

    showSuccess(
      'Clearance Granted // Dossier Sealed',
      `Accreditation registered for ${formData.fullName}`,
      clearanceCode
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    setErrorMsg(error.message || 'Failed to submit registration. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 8. Environment Variables Setup

Create `.env.local` in the project root:

```ini
# Firebase Client Configuration (Frontend)
VITE_FIREBASE_API_KEY=AIzaSyA...
VITE_FIREBASE_AUTH_DOMAIN=illuminati-mun.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=illuminati-mun
VITE_FIREBASE_STORAGE_BUCKET=illuminati-mun.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Cloud Functions Configuration (functions/.env)
RESEND_API_KEY=re_123456789...
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
GEMINI_API_KEY=AIzaSy...
```

---

## 9. Deployment & Verification Checklist

1. **Initialize Firebase in Project**:
   ```bash
   firebase login
   firebase init firestore storage functions
   ```
2. **Deploy Security Rules**:
   ```bash
   firebase deploy --only firestore:rules,storage
   ```
3. **Deploy Serverless Functions**:
   ```bash
   cd functions && npm install && cd ..
   firebase deploy --only functions
   ```
4. **Build & Host Frontend**:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```
5. **Verify Live Endpoints**:
   - [ ] Submit a test delegate registration in `DelegateRegistrationModal` and verify document entry in Firestore.
   - [ ] Verify automatic receipt email in delegate inbox.
   - [ ] Submit a session request in `BookSessionSection` and confirm record creation.
   - [ ] Send a diplomatic inquiry in `ContactsSection` and verify receipt code.
   - [ ] Test Firestore security rules with unauthenticated and administrative roles.
