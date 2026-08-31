import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { Resend } from 'resend';
import { sendDiscordAlert } from '../utils/notifications';

const resend = new Resend(process.env.RESEND_API_KEY);

export const onContactInquiry = onDocumentCreated(
  'contact_inquiries/{inquiryId}',
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    const {
      senderName = 'Anonymous',
      senderEmail = '',
      institution = 'N/A',
      inquiryType = 'General Query',
      message = '',
      transmissionCode = 'DIPLOMATIC-CABLE',
    } = data;

    const secretariatEmail = process.env.SECRETARIAT_EMAIL || 'secretariat@illuminatimun.org';

    // 1. Forward inquiry to Secretariat inbox
    if (process.env.RESEND_API_KEY && secretariatEmail) {
      try {
        await resend.emails.send({
          from: 'Diplomatic Desk <no-reply@illuminatimun.org>',
          to: secretariatEmail,
          replyTo: senderEmail,
          subject: `[DIPLOMATIC CABLE] ${inquiryType} from ${senderName}`,
          html: `
            <div style="font-family: Georgia, serif; background: #F8F4E6; padding: 24px; color: #0B192C; border: 2px solid #0B192C;">
              <h3 style="color: #0B192C; margin-top: 0; text-transform: uppercase;">Incoming Diplomatic Cable</h3>
              <p><strong>Code:</strong> ${transmissionCode}</p>
              <p><strong>Sender:</strong> ${senderName} (${senderEmail})</p>
              <p><strong>Institution:</strong> ${institution}</p>
              <p><strong>Category:</strong> ${inquiryType}</p>
              <hr style="border: 0; border-top: 1px solid #0B192C;" />
              <p><strong>Message:</strong></p>
              <blockquote style="background: #E6D5B8; padding: 12px; margin: 0; font-family: sans-serif;">
                ${message.replace(/\n/g, '<br/>')}
              </blockquote>
            </div>
          `,
        });
      } catch (err) {
        console.error('Failed to forward diplomatic inquiry email:', err);
      }
    }

    // 2. Alert Secretariat Discord
    await sendDiscordAlert(`📨 **New Diplomatic Cable Received!**`, {
      title: `Code: ${transmissionCode}`,
      color: 0x0b192c, // Ink black
      fields: [
        { name: 'From', value: `${senderName} (${senderEmail})`, inline: true },
        { name: 'Category', value: inquiryType, inline: true },
        { name: 'Institution', value: institution, inline: true },
        { name: 'Message', value: message.length > 300 ? message.slice(0, 300) + '...' : message, inline: false },
      ],
      timestamp: new Date().toISOString(),
    });
  }
);
