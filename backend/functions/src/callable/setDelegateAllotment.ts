import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { db } from '../config/firebase';
import { FieldValue } from 'firebase-admin/firestore';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface AllotmentPayload {
  registrationId: string;
  allottedCommittee: string;
  allottedCountry: string;
  ebNotes?: string;
  sendNotificationEmail?: boolean;
}

export const setDelegateAllotment = onCall(async (request) => {
  // Check RBAC custom claims
  if (!request.auth || (request.auth.token.role !== 'admin' && request.auth.token.role !== 'eb')) {
    throw new HttpsError('permission-denied', 'Only Secretariat and Executive Board members can allot portfolios.');
  }

  const {
    registrationId,
    allottedCommittee,
    allottedCountry,
    ebNotes = '',
    sendNotificationEmail = true,
  } = request.data as AllotmentPayload;

  if (!registrationId || !allottedCommittee || !allottedCountry) {
    throw new HttpsError('invalid-argument', 'Missing registrationId, allottedCommittee, or allottedCountry.');
  }

  const regRef = db.collection('delegate_registrations').doc(registrationId);
  const regSnap = await regRef.get();

  if (!regSnap.exists) {
    throw new HttpsError('not-found', 'Delegate registration record not found.');
  }

  const regData = regSnap.data()!;

  // Update status and allotment in Firestore
  await regRef.update({
    status: 'allotted',
    allotment: {
      committee: allottedCommittee,
      country: allottedCountry,
      ebNotes,
      allottedBy: request.auth.uid,
      allottedAt: FieldValue.serverTimestamp(),
    },
    updatedAt: FieldValue.serverTimestamp(),
  });

  // Optional: Send official country allotment letter
  if (sendNotificationEmail && process.env.RESEND_API_KEY && regData.email) {
    try {
      await resend.emails.send({
        from: 'Secretariat Executive Directorate <allotments@illuminatimun.org>',
        to: regData.email,
        subject: `[OFFICIAL ALLOTMENT] Portfolio Allocated: ${allottedCountry} in ${allottedCommittee}`,
        html: `
          <div style="font-family: 'Georgia', serif; background-color: #F8F4E6; border: 3px solid #0B192C; padding: 28px; color: #0B192C;">
            <h2 style="margin-top: 0; color: #C5A059; text-transform: uppercase;">Official Matrix Allotment Letter</h2>
            <p>Dear <strong>${regData.fullName}</strong>,</p>
            <p>The Executive Board of <strong>${allottedCommittee}</strong> has finalized committee matrices. You are formally accredited as the honorable delegate representing:</p>
            
            <div style="background-color: #E6D5B8; border: 2px solid #0B192C; padding: 16px; margin: 20px 0; font-family: monospace;">
              <div style="font-size: 16px; font-weight: bold; color: #0B192C;">PORTFOLIO: ${allottedCountry.toUpperCase()}</div>
              <div>COMMITTEE: ${allottedCommittee}</div>
              <div>CLEARANCE CODE: ${regData.clearanceCode}</div>
              ${ebNotes ? `<div style="margin-top: 8px; color: #1E3A8A;"><strong>DAIS NOTE:</strong> ${ebNotes}</div>` : ''}
            </div>

            <p>Please prepare your official Position Paper and review the Study Guide before unmoderated caucusing begins.</p>
            <p><em>In Leadership & Diplomacy,<br/>The Executive Board</em></p>
          </div>
        `,
      });
    } catch (err) {
      console.error('Failed to send allotment email:', err);
    }
  }

  return {
    success: true,
    message: `Successfully allotted ${allottedCountry} in ${allottedCommittee} to ${regData.fullName}`,
  };
});
