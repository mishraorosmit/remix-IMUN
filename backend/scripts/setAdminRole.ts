import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp();
}

const auth = admin.auth();
const db = admin.firestore();

async function setRole() {
  const args = process.argv.slice(2);
  const email = args[0];
  const role = args[1] || 'admin';

  if (!email) {
    console.error('Usage: tsx setAdminRole.ts <user-email> [admin|eb]');
    process.exit(1);
  }

  if (!['admin', 'eb', 'delegate'].includes(role)) {
    console.error('Invalid role. Allowed roles: admin, eb, delegate');
    process.exit(1);
  }

  try {
    const user = await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(user.uid, { role });

    // Also update/sync user record in Firestore
    await db.collection('users').doc(user.uid).set(
      {
        email,
        role,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    console.log(`✅ Successfully assigned role "${role}" to ${email} (UID: ${user.uid})`);
    process.exit(0);
  } catch (error: any) {
    console.error(`❌ Failed to set role for ${email}:`, error.message);
    process.exit(1);
  }
}

setRole();
