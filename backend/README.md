# Illuminati MUN Society - Firebase Backend

This directory contains the complete Firebase backend infrastructure for the **Illuminati International MUN Society** application, including Cloud Functions v2, Firestore Security Rules, Storage Rules, and Seed Scripts.

## 1. Directory Structure

```
backend/
├── firebase.json              # Firebase CLI service & emulator config
├── firestore.rules            # Firestore security rules with RBAC
├── firestore.indexes.json     # Query indexing configuration
├── storage.rules              # Storage bucket permissions
├── .firebaserc                # Active Firebase project alias
├── .env.example               # Backend environment variables template
├── functions/                 # TypeScript Cloud Functions (Serverless Backend)
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts           # Master function export
│   │   ├── config/            # Firebase Admin SDK initialization
│   │   ├── triggers/          # Firestore document triggers (Emails, Webhooks)
│   │   ├── callable/          # Client-callable functions (AI Coach, Allotments)
│   │   └── utils/             # Email templates & alert dispatchers
└── scripts/                   # Database seeding & Admin CLI tools
    ├── package.json
    ├── seedDatabase.ts        # Populates default committees & conferences
    └── setAdminRole.ts        # Assigns 'admin' or 'eb' custom claims to users
```

---

## 2. Quick Start & Local Development

### Prerequisites
- Node.js 20+
- Firebase CLI installed globally: `npm install -g firebase-tools`

### 1. Install Functions & Scripts Dependencies
```bash
# In backend/functions
cd functions
npm install

# In backend/scripts
cd ../scripts
npm install
cd ..
```

### 2. Configure Environment Variables
Copy `.env.example` into `functions/.env`:
```bash
cp .env.example functions/.env
```

### 3. Run Firebase Local Emulator Suite
Test Firestore, Functions, Storage, and Auth locally on `http://localhost:4000`:
```bash
firebase emulators:start
```

---

## 3. Production Deployment

```bash
# Log in to Firebase
firebase login

# Set your target project
firebase use <your-project-id>

# Deploy all services (Firestore Rules, Indexes, Storage, Cloud Functions)
firebase deploy

# Or deploy specific parts:
firebase deploy --only firestore:rules
firebase deploy --only storage
firebase deploy --only functions
```

---

## 4. Admin Management Scripts

### Seed Default Database Content
Populate initial committees (UNSC, UNHRC, AIPPM, UNODC, SOCHUM) and live marquee items:
```bash
cd scripts
npm run seed
```

### Grant Admin or EB Roles
Grant Secretariat permissions to an authorized email:
```bash
cd scripts
npm run set-admin -- user@illuminatimun.org admin
```
