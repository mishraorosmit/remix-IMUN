import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { Resend } from 'resend';
import { generateRegistrationEmailHtml } from '../utils/emailTemplates';
import { sendDiscordAlert } from '../utils/notifications';

const resend = new Resend(process.env.RESEND_API_KEY);

export const onDelegateRegistered = onDocumentCreated(
  'delegate_registrations/{regId}',
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    const {
      fullName = 'Delegate',
      email,
      institution = 'N/A',
      preferredCommittee = 'General Assembly',
      delegationType = 'Single Delegate',
      countryPreferences = [],
      clearanceCode = 'IMUN-PENDING',
    } = data;

    // 1. Send confirmation email to delegate if Resend API key is provided
    if (process.env.RESEND_API_KEY && email) {
      try {
        const html = generateRegistrationEmailHtml({
          fullName,
          clearanceCode,
          preferredCommittee,
          delegationType,
          countryPreferences,
          institution,
        });

        await resend.emails.send({
          from: 'Secretariat <secretariat@illuminatimun.org>',
          to: email,
          subject: `[CLEARANCE VERIFIED] Application Receipt: ${clearanceCode}`,
          html,
        });
      } catch (err) {
        console.error('Failed to send registration confirmation email:', err);
      }
    }

    // 2. Dispatch alert to Secretariat Discord channel
    await sendDiscordAlert(`🏛️ **New Delegate Application Received!**`, {
      title: `Clearance Code: ${clearanceCode}`,
      color: 0xc5a059, // Ember gold
      fields: [
        { name: 'Delegate Name', value: fullName, inline: true },
        { name: 'Institution', value: institution, inline: true },
        { name: 'Committee', value: preferredCommittee, inline: true },
        { name: 'Delegation Type', value: delegationType, inline: true },
        {
          name: 'Country Preferences',
          value: countryPreferences.filter(Boolean).join(' > ') || 'None specified',
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
    });
  }
);
